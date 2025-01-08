const mysql = require('mysql2');
const ExcelJS = require('exceljs');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'srv1439.hstgr.io',
    user: 'u845439951_w3leads',
    password: 'aA@1w3leads',
    database: 'u845439951_w3leads',
});

// Pagination and Export Function
async function exportPaginatedDataToExcel() {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('WordPress Data');
        
        // Define columns
        worksheet.columns = [
            { header: 'Domain', key: 'domain', width: 30 },
            { header: 'Email', key: 'email', width: 30 },
        ];

        let offset = 0;
        const limit = 2000;
        let totalRowsFetched = 0;

        // while (true) {
            // Paginated SQL Query
            const query = `SELECT domain, email FROM speed_optimization_service WHERE email != '' AND email NOT LIKE '%/%' AND email LIKE '%@%' LENGTH(email) > 3 AND framework = 'wordpress' LIMIT ${limit} OFFSET ${offset}`;
            
            const results = await new Promise((resolve, reject) => {
                connection.query(query, (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                });
            });

            // if (results.length === 0) {
            //     // No more data to fetch
            //     break;
            // }

            // Add rows to the worksheet
            results.forEach(row => worksheet.addRow(row));
            totalRowsFetched += results.length;

            console.log(`Fetched ${results.length} rows, total: ${totalRowsFetched}`);
            
            // Increment offset for the next batch
            offset += limit;

            // Stop fetching if we fetch less than the limit, assuming no more data exists
            // if (results.length < limit) {
            //     break;
            // }
        // }

        // Save Excel File
        const filePath = './wordpress_data.xlsx';
        await workbook.xlsx.writeFile(filePath);

        console.log(`Data exported successfully to ${filePath}, total rows: ${totalRowsFetched}`);
    } catch (error) {
        console.error('Error exporting data:', error);
    } finally {
        connection.end();
    }
}

exportPaginatedDataToExcel();
