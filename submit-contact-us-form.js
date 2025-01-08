/* 
1. It will fetch the contact us page from database
2. Check the form exists or not
3. Check form exists or not
4. Check input type email or text area not present on this url
5. Fill the related data
6. Submit the form
7. Save the submit status in database
*/


// const db = require('./conn');


// (async () => { 
//     console.log('----jjj---');
//     const [rows] = await db.query("SELECT * FROM domain_list WHERE contact_us_url != '' LIMIT 30 offset 1030");
//     for (const element of rows) {
//         // ids = ids+","+element.ID;
//         // domainList = await getUniqueDomains(element.domain);
//         // finalSet = mergeSetFun(finalSet,domainList);
//         console.log(element.contact_us_url);
//     }
//   })();






const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function submitForm(url) {
    // Set up Chrome options (for headless mode)
    let options = new chrome.Options();
    // options.addArguments('--headless'); // Enable headless mode
    // options.addArguments('--disable-gpu'); // Disable GPU (for headless mode)

    // Launch the browser and navigate to the page
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        // Go to the target page with the contact form
        await driver.get(url);

        // Wait until the page is fully loaded (wait for the <body> element to be located)
        await driver.wait(until.elementLocated(By.tagName('body')), 10000);  // Wait for <body> to be present
        console.log('Page is fully loaded!');

        await driver.sleep(10000);

        // Execute JavaScript in the browser context after the page is loaded
        await driver.executeScript(() => {
            // This will show an alert in the browser window

           


            // Function to detect CAPTCHA types on the page
            function detectCaptchaType() {
                const captchaSelectors = {
                    'Google reCAPTCHA': '.g-recaptcha-response', // Google reCAPTCHA
                    'hCAPTCHA': '.h-captcha', // hCAPTCHA
                    'Custom CAPTCHA': 'input[name="captcha"]' // Custom CAPTCHA
                };

                const detectedCaptchas = Object.entries(captchaSelectors)
                    .filter(([_, selector]) => document.querySelector(selector))
                    .map(([type]) => type);

                if (detectedCaptchas.length > 0) {
                    console.log('CAPTCHA types detected:', detectedCaptchas.join(', '));
                    return true;
                }

                console.log('No CAPTCHA found on the page.');
                return false;
            }

            // Helper function to set input values based on field type
            function setInputValue(input, fieldInfo) {
                const valueMatchers = {
                    email: /email|e[_-\s]?mail|your[_-\s]?email|contact[_-\s]?email|user[_-\s]?email/i,
                    name: /name|fname|customer_name|first[_-\s]?name|full[_-\s]?name|your[_-\s]?name|given[_-\s]?name|nickname/i,
                    lastName: /lname|last[_-\s]?name|surname|family[_-\s]?name/i,
                    phone: /phone|mobile|contact[_-\s]?number|cell/i,
                    address: /address|street|house|building/i,
                    zip: /zip|postal[_-\s]?code|pincode/i,
                    country: /country/i,
                    state: /state|region|province/i,
                    city: /city|town/i,
                    message: /message|comment|query|feedback/i,
                    subject: /subject|topic/i,
                    company: /company|organization|business|firm/i
                };

                for (const [key, regex] of Object.entries(valueMatchers)) {
                    if (Object.values(fieldInfo).some(value => regex.test(value))) {
                        const values = {
                            email: 'shubham@example.com',
                            name: 'Shubham',
                            lastName: 'Kumar',
                            phone: '9798963216',
                            address: 'Jaipur, Rajasthan',
                            zip: '302026',
                            country: 'India',
                            state: 'Rajasthan',
                            city: 'Jaipur',
                            message: 'This is a sample message.',
                            subject: 'Your speed optimization needs immediate attention!',
                            company: 'WPThrust'
                        };
                        input.value = values[key];
                        return;
                    }
                }

                // Default value if no match is found
                input.value = 'Default value121';
            }

            // Function to randomly check a checkbox
            function checkRandomCheckbox(input) {
                // Generate a random number between 0 and 1
                if (Math.random() < 0.5) { // 50% chance to check the checkbox
                    input.checked = true;
                }
            }

            // Main function to process forms
            function processForms() {
                if (detectCaptchaType() === false) {
                    const forms = document.querySelectorAll('form');
                    forms.forEach(form => {
                        const formHTML = form.innerHTML.toLowerCase();
                        if (formHTML.includes('email')) {
                            const inputs = form.querySelectorAll('input, textarea, select');
                            inputs.forEach(input => {
                                const fieldInfo = {
                                    fieldName: input.name || input.id || input.placeholder || ''
                                };

                                // Add all attributes to fieldInfo for matching
                                Array.from(input.attributes).forEach(attr => {
                                    fieldInfo[attr.name] = attr.value;
                                });

                                if ( input.type === 'submit' || input.type === 'file' ){
                                    return;
                                } else if (input.type === 'tel'){
                                    input.value = '9798963216';
                                }else if (input.tagName.toLowerCase() === 'textarea') {
                                    input.value = 'This is a text area';
                                } else if (input.type === 'checkbox') {
                                    checkRandomCheckbox(input); // Randomly check the checkbox
                                } else if (input.type === 'radio') {
                                    if (!input.checked) input.checked = true; // Select the radio button
                                } else if (input.tagName.toLowerCase() === 'select') {
                                    if (input.options.length > 1) {
                                        input.selectedIndex = 1; // Select the second dropdown option
                                    }
                                } else {
                                    setInputValue(input, fieldInfo);
                                }
                            });
                        }
                    });
                }
            }






            // Helper function to type input values progressively
            async function typeInputValue(input, value) {
                input.focus(); // Focus the input field
                input.value = ''; // Clear the input field before typing

                for (let i = 0; i < value.length; i++) {
                    input.value += value[i]; // Add one character at a time
                    const event = new Event('input', { bubbles: true }); // Trigger an input event
                    input.dispatchEvent(event);

                    await new Promise(resolve => setTimeout(resolve, 50)); // Add a small delay (50ms) between keystrokes
                }

                // Dispatch a change event when typing is complete
                const changeEvent = new Event('change', { bubbles: true });
                input.dispatchEvent(changeEvent);
            }


            // Main function to process forms
            async function processForms() {
                if (detectCaptchaType() === false) {
                    const forms = document.querySelectorAll('form');
                    for (const form of forms) {
                        const formHTML = form.innerHTML.toLowerCase();
                        if (formHTML.includes('email')) {
                            const inputs = form.querySelectorAll('input, textarea, select');
                            for (const input of inputs) {
                                const fieldInfo = {
                                    fieldName: input.name || input.id || input.placeholder || ''
                                };

                                // Add all attributes to fieldInfo for matching
                                Array.from(input.attributes).forEach(attr => {
                                    fieldInfo[attr.name] = attr.value;
                                });

                                if (input.type === 'submit' || input.type === 'file') {
                                    continue;
                                } else if (input.type === 'tel') {
                                    await typeInputValue(input, '9798963216');
                                } else if (input.tagName.toLowerCase() === 'textarea') {
                                    await typeInputValue(input, 'This is a text area');
                                } else if (input.type === 'checkbox') {
                                    checkRandomCheckbox(input); // Randomly check the checkbox
                                } else if (input.type === 'radio') {
                                    if (!input.checked) input.checked = true; // Select the radio button
                                } else if (input.tagName.toLowerCase() === 'select') {
                                    if (input.options.length > 1) {
                                        input.selectedIndex = 1; // Select the second dropdown option
                                    }
                                } else {
                                    await setInputValue(input, fieldInfo);
                                }

                            }
                            const submitButton = document.querySelector('button[type="submit"], input[type="submit"]');
                            submitButton.click();

                        }
                    }
                }
            }

            // Execute the form processing function
            processForms();



        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        // Close the browser after the process is completed
        // await driver.quit();
    }
}

// Call the function with the target URL
submitForm('http://www.cpmmovein.com/contact.html');
