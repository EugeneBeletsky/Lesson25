//API тесты для google API 
const sendHttpRequest = require('../sendHttpRequest');
const axios = require('axios');
const googleJsonSchemaImage = require('../testData/googleSchemaImage.json');

describe('google API tests', () => {

    let response;
    test('first test', async () => {
        response = await axios.get('https://google-search3.p.rapidapi.com/api/v1/image/q=tesla', {
            headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'EU',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
                'X-RapidAPI-Key': '7a60d19ad3msh5d8cb34531243f0p10b789jsn1591240f287f'
                }
        })
                await expect(response.status).toEqual(200);
    });

    test ('validate json schema', async () => {
        console.log('googleJsonSchemaImage', googleJsonSchemaImage);
                await expect(response.data).toBeValidSchema(googleJsonSchemaImage);
    })

    test ('json schema validation', async() => {
        const conf = {
            url: 'https://google-search3.p.rapidapi.com/api/v1/image/q=tesla',
                      headers: {
                        'X-User-Agent': 'desktop',
                        'X-Proxy-Location': 'EU',
                        'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
                        'X-RapidAPI-Key': '7a60d19ad3msh5d8cb34531243f0p10b789jsn1591240f287f'
            }
        }
        response = await sendHttpRequest(conf);
        console.log(response);
        await expect(response).toBeValidSchema(googleJsonSchemaImage);      
    })
    
    test ('status code ', async() => {
        const conf = {
            url: 'https://google-search3.p.rapidapi.com/api/v1/image/q=tesla',
                        headers: {
                            'X-User-Agent': 'desktop',
                            'X-Proxy-Location': 'EU',
                            'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
                            'X-RapidAPI-Key': '7a60d19ad3msh5d8cb34531243f0p10b789jsn1591240f287f'
            }
        }
        response = await sendHttpRequest(conf);
        console.log(response);
        await expect(response).toBeValidStatusCode(200);
    })


    test ('negative status code ', async() => {
        const conf = {
            url: 'https://google-search3.p.rapidapi.com/api/v1/image/q=tesla',
                        headers: {
                            'X-User-Agent': 'desktop',
                            'X-Proxy-Location': 'EU',
                            'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
                            'X-RapidAPI-Key': '7a60d19ad3msh5d8cb34531243f0p10b789jsn1591240f'
            }
        }
        response = await sendHttpRequest(conf, 'POST');
        console.log(response);
        await expect(response).toBeValidStatusCode(403);
        await expect(response.data.message).toEqual('You are not subscribed to this API.');
    })
});