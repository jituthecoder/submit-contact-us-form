const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./conn");

const detectPlatform = async (url) => {
  try {
    // Fetch the website's HTML source
    const response = await axios.get(url);
    const html = response.data;
    const headers = response.headers;
    const $ = cheerio.load(html);

    // Keywords or patterns to detect platforms
    const platformChecks = [
      { name: "WordPress", slug: "wordpress", pattern: /wp-content|wp-includes/i },
      { name: "Shopify", slug: "shopify", pattern: /cdn\.shopify\.com|myshopify/i },
      { name: "Laravel", slug: "laravel", pattern: /laravel_session|X-Powered-By: Laravel/i },
      { name: "CodeIgniter", slug: "codeigniter", pattern: /ci_session|CodeIgniter/i },
      { name: "Wix", slug: "wix", pattern: /wix\.com|X-Wix-Request-Id/i },
      { name: "Magento", slug: "magento", pattern: /mage-cache|Magento/i },
      { name: "Drupal", slug: "drupal", pattern: /drupal\.settings|Drupal/i },
      { name: "Yii", slug: "yii", pattern: /yii.*framework|X-Powered-By: Yii/i },
      { name: "Symfony", slug: "symfony", pattern: /symfony|X-Debug-Token/i },
      { name: "Core PHP", slug: "core-php", pattern: /PHPSESSID|X-Powered-By: PHP/i },
      { name: "Smarty PHP", slug: "smarty-php", pattern: /Smarty|smarty_cache/i },
    ];

    // Check HTML and headers
    for (const { name, slug, pattern } of platformChecks) {
      if (pattern.test(html) || pattern.test(JSON.stringify(headers))) {
        return { slug };  // Return only the slug
      }
    }

    // Return "Other" if no platform matches
    return { slug: "other" };
  } catch (error) {
    return { slug: "error", message: error.message };  // Return slug with error if there's an issue
  }
};

const processBatch = async (offset = 0, limit = 100) => {
  try {
    // Get domains to process
    const [rows, fields] = await db.execute(
      `SELECT ID, domain FROM speed_optimization_service WHERE framework_curl=0 LIMIT ${limit} OFFSET ${offset}`
    );

    // If no rows are returned, stop the loop
    if (rows.length === 0) {
      console.log("No more rows to process.");
      return;
    }

    // Collect all the updates (IDs and their corresponding detected slugs)
    const updates = rows.map(({ ID, domain }, index) => {
      // Detect platform (slug)
      return detectPlatform(`https://${domain}`).then(result => ({
        ID,
        slug: result.slug  // Store slug instead of platform
      }));
    });

    // Wait for all slug detections
    const detectedSlugs = await Promise.all(updates);

    // Build a single SQL query to update all detected slugs at once
    const caseStatements = detectedSlugs.map(({ ID, slug }) => {
      return `WHEN ${ID} THEN '${slug}'`;
    }).join(' ');

    const ids = detectedSlugs.map(({ ID }) => ID).join(', ');

    const updateQuery = `
      UPDATE speed_optimization_service
      SET framework_curl = 1, framework = CASE ID
        ${caseStatements}
        ELSE framework END
      WHERE ID IN (${ids})
    `;

    // Execute the bulk update query
    const updateResult = await db.execute(updateQuery);
    console.log('Database updated successfully:', updateResult);

    // Process the next batch
    await processBatch(offset + limit, limit);  // Increase the offset for the next batch
  } catch (error) {
    console.error("Error processing batch:", error.message);
  }
};

// Start processing from the first batch
processBatch(0, 100);
