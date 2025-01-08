const axios = require('axios');

// Function to check if the website is reachable
async function checkWebsiteExists(url) {
    try {
        // Send a GET request to the website
        const response = await axios.get(url);
        
        // If the status code is in the 2xx range, the website is reachable
        if (response.status >= 200 && response.status < 300) {
            return `${url} is reachable`;
        } else {
            return `${url} is not reachable (status code: ${response.status})`;
        }
    } catch (error) {
        // If an error occurs (website is down or unreachable)
        return `${url} is not reachable (error: ${error.message})`;
    }
}

// Bulk check function to check a list of websites
async function bulkCheckWebsites(websites) {
    const websitePromises = websites.map(website => {
        const url = `https://${website}`; // Ensure URL starts with https
        return checkWebsiteExists(url);
    });

    // Run all website checks concurrently
    const results = await Promise.all(websitePromises);
    console.log(results);
}

// Example usage
const websites = ['cpa-gruppe.de', 'w3speedup.com', 'cpa-box.fr'];

bulkCheckWebsites(websites);
