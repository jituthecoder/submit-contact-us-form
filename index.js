

const db = require('./conn');


(async () => { 
    console.log('----jjj---');
    const [rows] = await db.query("SELECT * FROM domain_list WHERE contact_us_url != '' LIMIT 30 offset 1060");
    for (const element of rows) {
        // ids = ids+","+element.ID;
        // domainList = await getUniqueDomains(element.domain);
        // finalSet = mergeSetFun(finalSet,domainList);
        console.log(element.contact_us_url);
    }
  })();