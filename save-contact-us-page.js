const axios = require("axios");
const mysql = require("mysql2");
const util = require("util");

const apiKeys = [
"AIzaSyBaekGLOcw_AxjhlfuGK7R80tGs-lJNiq8",
"AIzaSyCtBnFlLzvZpGD80yQD9X1gVysB3mMHTVE",
"AIzaSyBVzJsawCkqlJcqeDGOoLSN2S4ln8BKzcY",
"AIzaSyAM2n_hrS4dYN_ikFNRbQBabsjI7VRD9So",
"AIzaSyAp5SPq9f9vk--m4wB9g9TyPcma2qzcDNo",
"AIzaSyDQRYy-jeLOH4Tpl6xYy_f5XPTIJ8MFiFA",
"AIzaSyBnO5PEUdqbexlgtr_StjzklnQc93GdGHw",
"AIzaSyD9JWDP_Mx1jjzw5EMfWib1WMZKCRlT6p8",
"AIzaSyDaeL7e-smGR1s_8gdZOiQpkEGzcrwVzRQ",
"AIzaSyApDdIcSZ9TY0NNUoBRC4aqZzryPT0cG5g",
"AIzaSyDJzaAkgdXk5X_F6LNbNZuhWMR-5V7CxJs",
"AIzaSyCDPlbA8Istgwwdjfl4ua0tmJ8b7t-X0jY",
"AIzaSyAhR8wszQ1_dHhGxi5N8QvRgYxGUOD3mM4",
"AIzaSyDp7KId5fXO3-WvgiByejlc8Pq3rlnnccU",
"AIzaSyBaFDN1y_SMIDd_BuIUTgkxQo2dYkkhGAY",
"AIzaSyBn5QV4f5ym_4efJ3x4ym1oCemGVEiDS9g",
"AIzaSyBWpuaXoDOKIvW0qpHtsyq4oBQld2X_FN0",
"AIzaSyDFWHzuAhc8Kgcr8ji6JnXTYPWlFFepDes",
"AIzaSyBegNXb7Gl4IIr4TMWTRkqEOrX7tVbF_Kw",
"AIzaSyAnpQcwyZwwSjMfO2JgMc_E74Zfd3ClhwI",
"AIzaSyCr9g3BCEwpWlGOR0TRuE1njLx0RR1QBj4",
"AIzaSyBCF5P1N8xw_iDJtPf0qEbrfuk2aVQYuFo",
"AIzaSyB4stRmv9Y-iuHBxarTObmPblP7N41zLjc",
"AIzaSyDcadFkg_gELt-5HpyHqKJIJB3AvxReXW0",
"AIzaSyCvBNGOcN4ZwVVj0NZwI9yiRWpUes4KSKI",
"AIzaSyCiLVP8uk-xrkqIk5PDmYxNTNDMhTqSOKI",
"AIzaSyDlhk2s8ygVQJhd5zOQSvVM33yP2d0Hf5c",
"AIzaSyDufCU9B9lBQ24ToWnAqXPgHWbp4rgnUmM",
"AIzaSyDghyoPhupDR6B_YuNeW7g5Ny0XNZuQBY4",
"AIzaSyCJGhnk1-3GUzU9ouCcRjCvSTmklmeFNj0",
"AIzaSyC0zYnNkiVWgkKKoB3YRJncjjqKenmVVsQ",
"AIzaSyB_3TskWqR2RM8Y1aCl0wN_v8PtwhqJpTU",
"AIzaSyAhyop60cLLdtJ-aH_hXAKlAJME68goNiU",
"AIzaSyC85Vfn66w-Z7Zi8Zi69_DDOqXqn0Kh6vY",
"AIzaSyC5RVE8k9jxONLTJKNv6TjRCPBTrA2cXjA",
"AIzaSyCuv9_Dlh6YCIrhh8sSBZMkfdIBt5CvPW0",
"AIzaSyCMuQJ-Q2dmwAuRojE4E6N0wsXbq9vzhJE",
"AIzaSyC68sp9VIwCJL5CDocd33om0jEgxYIWRbo",
"AIzaSyBKe5DusYRrky8inQSMF7gZIMffkKYm460",
"AIzaSyDrlZr5hRMo_s_8lLIz7SYdS2uVt0rVPQY",
"AIzaSyBfY5Z6v_Aph4WwYDytZVXa1Bhzs1afqCY",
"AIzaSyB7PhjcddPTQYHRBhoGUdR10Bx5acwgCXQ",
"AIzaSyCR-oqDZI9Batlx0ptCPqnfva9Dro2HIgY",
"AIzaSyAXCR0hQLewqY_lyUItogFEM41pL2Hz8Ac",
"AIzaSyDJmceTwlp59KC6riL0hjC1smHx4uB2SVA",
"AIzaSyDY0cyTXgkTYT7SiraN2-y7La0z34BVOBk",
"AIzaSyCeM6zD6HVW6TH9TitFDTSmRO55t0mRgPs",
"AIzaSyBOOFr6ihZhkh15ChvrO_is6wXaNB4EZlQ",
"AIzaSyDlU0Dxo6WPl-OpOOXniL2xe31gCl8XZv0",
"AIzaSyDaNX3wfUFlnkmSdORDS_3UAgsxfRhsmhg",
"AIzaSyCd_f9W-MJJhg7cbHkqz51CCphqrXzWZm8",
"AIzaSyAZqhjT6XWWFEgg4iOx_xuo8_7gkt_RmNg",
"AIzaSyBjA5gYA-dfr8ket0sIbnyGIDGWO0a4OLo",
"AIzaSyCmOPF46YcunHRcXT7X0NSUBntNhnRBm4Y",
"AIzaSyCVXuik3Q5B6FAKOKtxYex2ZP0JRC78Rdk",
"AIzaSyCC8QUlJs09_NdfST3qwmr5Q3QCw_vALRY",
"AIzaSyCq8mPlZaAYfiXlQlC7I5bBkz9cdhqfEWQ",
"AIzaSyCsl2z_8tQPMihBhq8dkC0Zrowmf5V50Yk",
"AIzaSyD3h_Wv7imjpPgh8JZt8uuppMzurVYBzkk",
"AIzaSyDOYC6CczlVBndgzUEvUgO0-BDN4dT_UrI",
"AIzaSyDKjJNE5zc_ujXlDRwdDE_MouwhkoJmW-A",
"AIzaSyDmbjHaYYVp1eZ-kdp2M9jD6g59NwpGjgQ",
"AIzaSyAZrniDWJa66p77Qr-M_hsDCdl8P5C8Ez4",
"AIzaSyD-C-YN8cMNDtCdyBExVnGemVJFGYWdcXE",
"AIzaSyCWUv9TaeV8b4WVWFmqPVcUuohQU75QnrY",
"AIzaSyCtOruKbo83KIQpefnCGqfGzcUwEm5d3Rg",
"AIzaSyCliOD2Jb8nPlBrnPFPVFXMxW2PE_7zf7E",
"AIzaSyBggRYxHdaOwFt5bu9LYBIPqNUdc3JwjAk",
"AIzaSyBskJc5d9n0UStTfP1QmsS4cqkylUftqi0",
"AIzaSyAvpiC0iUlaijliluxmRAs9rucXzjAFi4Q",
"AIzaSyB4smQ2Tqkml07Og8c0IAHhm1NsOac458g",
"AIzaSyBmc8ldMK5XtdW6MBTERk4eb-WknGbm_7I",
"AIzaSyD2Ue-BYp2HLIgOHh1zUm2uJSAkCnpbFTk",
"AIzaSyCogyKswVPjELcXhtzMdzgk3Ae0c_oVswg",
"AIzaSyC8ChGyPu8gqXPq4mFGueFh0W_C0lGUDf8",
"AIzaSyBPfza2KMCoIizMs29QN0g64w3vAzL1ZnA",
"AIzaSyCLtXv28zOfvOcqD87hZVayzfzfOkrB4ww",
"AIzaSyCz-DaJkO822NirR7rjRxc2eegQi32H6HA",
"AIzaSyCHRm7kmtpbWjykHq3yRT2aBcw9jnMEh1o",
"AIzaSyD9E3zNJ1dQBo-7KBiX-lLzahG5m6ZY3Zg",
"AIzaSyB8D8yenq4ySViWqtOSWGHHlGMw5_p1GYQ",
"AIzaSyBUJv0Yqt2u5w4Tp2XeI1j2aScr-tJB2W4",
"AIzaSyA0kIw-OgWexbGy2khXUya6AyoYARFsQUY",
"AIzaSyAsXn5PN-j_VDkyKDzpMLXpfIeYA5SlxtU",
"AIzaSyAHqcdonN-hKbUDw9ey9eXGo2ehAc6Avxk",
"AIzaSyC290vlnDHRsUYnqQM10Kpd_BYynxJcwVg",
"AIzaSyAOllrzpOitm6m0iHy9stdaR7jU4hPo16c",
"AIzaSyBdp5yxupFZJpG90cZu6f_jEHbVSEKDuMA",
"AIzaSyBaJxpXk2yG4UR2qTze0GBH8brB5ETb1k8",
"AIzaSyAfROt1OwowoOLx7YF1Ec-u30PK9spd2KU",
"AIzaSyDHEgxrLLEmr3t_Xkxgbr-8jVRFPj-F_xQ",
"AIzaSyCmF22nv8d5ymXECqNVWl07sHrkiyJ77Rk",
"AIzaSyCjkWVv39e1e0VkVBXA1yk9X7egrQyJKl0",
"AIzaSyDGl6f8AkYnQnZLtMwHzO5tMzgIVsIwmaA",
"AIzaSyDEPHyQSdKdlV9tq5rklkCGbJouSsve7Vk",
"AIzaSyB1v11RCy1as5vzf4l8mS3FNnxjc7O3Hy8",
"AIzaSyCrEIcBHQIs4y0kAXE5ZWx-YtY4w33eP94",
"AIzaSyAqURJvB-Gofe3auHQLaeQUIycYPd0GArk",
"AIzaSyD53wZiLlClKzjfSjmO8HbYnQ6-3TN_zow",
"AIzaSyAhMdV_W4g7P4T6QhKsEtmHnl8d_dqMwcM",
"AIzaSyCqCqTTPNLwSIn_4ZsNkGfMWPU1GGlr18Y",
"AIzaSyC3Y0LGEFKSfSmRDNrARQk0d5omJnhdY_0",
"AIzaSyBUqy_5ZOdHASWOIFd35lSWpGbPIJcVPG8",
"AIzaSyBM2mRbzsi12jYR84l4R85LnXQKJNL0RLw",
"AIzaSyA3JpaU6JKOhX0lXel7XM0n_wjTHreRsyI",
"AIzaSyBz75pipsurCEip5bcLsjHXln6YLDprrI8",
"AIzaSyAkodMlPLvbMqe42HCCcI9dbmN4dGhH7Dc",
"AIzaSyBjGzg3a2AMGYwKslU2EJtMVTXE_BP6aGk",
"AIzaSyA6FstH-HkL4qZ8on1DCOOuw1LB2WSvo_k",
"AIzaSyDnjYn7nKLpYU6Yfl2MYqCUve4cCexQutY",
"AIzaSyBJdsCFb5bqRPpZK-DkRAmWIT1eAoEOq_o",
"AIzaSyBXgn76S8cAUtu3_ztf7I7wQ7R6lbrPdmk",
"AIzaSyApBrYhdVbvWzfRj-oJym3sXBnkXIwMz1c",
"AIzaSyBpnNA04dt-DOItK_BKCexZFet379UYg3c",
"AIzaSyAdE0dZHurVny9UKKkrb30t_gwbQnyZjFA",
"AIzaSyD8m7gGlvAL9Z-SJSQ877TFHgnuY14VXys",
"AIzaSyDp4PjoIP6OyfAzA51MUGFLyhl-aUM6IXk",
"AIzaSyBuVtQW3Z7qGaEuzqkyPYqg2LFgoKMKf8Y",
"AIzaSyAIcCnB5WDbe_cdJ-Kgt-fzuos9s9-Y0xA",
"AIzaSyDtLfXCg7nVX1WkF8fmX3n1HMGg7Goz4fY",
"AIzaSyADm3Dqt8jhQj-RKVTmC2AC6XIZ9GKi24o",
"AIzaSyB1mwSWmWya8PXovQIW7OWmHZdwZrZikIs",
"AIzaSyA3A7D5_6fzxDydbpFb_Q36XBXfP3qi1Nk",
"AIzaSyCvf42pQi5fQJlT-e9xuu-8Q5nr2nDdoLM",
"AIzaSyBzDcPah0tBCgf_SSKRHsUFBkF_5ibqnpA",
"AIzaSyDmaVifzn-EuTrcdNx98sBXD7IuLrLyaws",
"AIzaSyDBIKEfUYlhjneRArl8CeYP_Lt1aszVeuo",
"AIzaSyDXfOM1Kn2-w7LlH1Ut4qeyAL7knRVUeYg",
"AIzaSyCX3i_88R8x0Obf7GJFx82VU8CNWwMaoqk",
"AIzaSyDkIXmf8bsJpx9r-fcsxVXFQApn8eAkxi0",
  ];

const cx = "1523ebb7f4d824072";
let currentApiKeyIndex = 1;

function getCurrentApiKey() {
    return apiKeys[currentApiKeyIndex];
}

async function performGoogleSearch(domain) {
    const query = `contact us site:${domain}`;
    try {
        const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
            params: {
                q: query,
                cx: cx,
                key: getCurrentApiKey(),
                num: 3,
                fields: "items(link)",
            },
        });

        if (response && response.data && response.data.items && response.data.items[0] && response.data.items[0].link) {
            const link = response.data.items[0].link;
            if (link.includes(domain)) {
                return response.data.items[0].link;
            }
        }
        
    } catch (error) {
        if (error.response) {
            if (error.response.status === 429) {
                console.log("Rate limit exceeded. Switching to the next API key...");
                currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
                console.log('Current index',currentApiKeyIndex);
                return performGoogleSearch(domain);
            }
            console.error("Google search error:", error.response.status, error.response.statusText);
        } else {
            console.error("Network error:", error.message);
        }
    }
}

const con = mysql.createConnection({
    host: "srv1439.hstgr.io",
    user: "u845439951_w3leads",
    password: "aA@1w3leads",
    database: "u845439951_w3leads",
    connectionLimit: 10000, // Adjust this based on your needs
    waitForConnections: true,
    queueLimit: 0,
});

const conQuery = util.promisify(con.query).bind(con);

async function saveContactUsUrlInDatabase() {
    let urlsFound = 0;
    let urlsNotFound = 0;
    let errorsProcessingRow = 0;
    let databaseErrors = 0;

    try {
        const result = await conQuery("SELECT * FROM domain_list WHERE contact_us_searched = 0 AND contact_us_url = '' LIMIT 30 OFFSET 1000600");

        let idsWithNoContactUs = [];
        let idsWithContactUs = [];
        let contactUsUpdateValues = [];

        for (let row of result) {
            try {
                const contactUsUrl = await performGoogleSearch(row.domain);

                if (typeof contactUsUrl === "undefined") {
                    idsWithNoContactUs.push(row.ID); // Collect IDs of rows with no Contact Us page
                    console.log('-----');

                } else {
                    idsWithContactUs.push(row.ID); // Collect IDs of rows with a Contact Us page
                    contactUsUpdateValues.push({ id: row.ID, url: contactUsUrl }); // Collect URL for future update
                    console.log('rrrrr')
                }
            } catch (error) {
                console.error("Error processing row:", error);
                errorsProcessingRow++;
            }
        }

        // Batch update for rows with no Contact Us page
        if (idsWithNoContactUs.length > 0) {
            let notFoundRes = await conQuery("UPDATE domain_list SET contact_us_searched = 1 WHERE ID IN (?)", [idsWithNoContactUs]);
            console.log('Updated domains with no Contact Us page',notFoundRes.affectedRows);
        }

        // Batch update for rows with Contact Us pages using CASE statement
        if (contactUsUpdateValues.length > 0) {
            const caseQuery = contactUsUpdateValues
                .map(item => `WHEN ID = ${item.id} THEN '${item.url}'`)
                .join(' ');

            const updateQuery = `
                UPDATE domain_list
                SET contact_us_url = CASE ${caseQuery} END,
                    contact_us_searched = 1
                WHERE ID IN (${contactUsUpdateValues.map(item => item.id).join(', ')})
            `;
            let res = await conQuery(updateQuery);
            console.log('Updated domains with Contact Us pages', res.affectedRows);
        }



    } catch (err) {
        console.error("Database error:", err);
        databaseErrors++;
    } finally {
        // con.end(); // Close the MySQL connection
        saveContactUsUrlInDatabase();
    }
}


saveContactUsUrlInDatabase();


