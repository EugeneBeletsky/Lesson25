//API тесты для google API 
const sendHttpRequest = require('../sendHttpRequest');
const axios = require('axios');
const googleJsonSchema = require('../testData/googleSchema.json');

describe('google API tests', () => {

    let response;
    test('first test', async () => {
        response = await axios.get('https://google-search3.p.rapidapi.com/api/v1/search/q=elon+musk', {
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
        console.log('googleJsonSchema', googleJsonSchema);
                await expect(response.data).toBeValidSchema(googleJsonSchema);
    })

    test ('json schema validation', async() => {
        const conf = {
            url: 'https://google-search3.p.rapidapi.com/api/v1/search/q=elon+musk',
                      headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'EU',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
                'X-RapidAPI-Key': '7a60d19ad3msh5d8cb34531243f0p10b789jsn1591240f287f'
            }
        }
        response = await sendHttpRequest(conf);
        console.log(response);
        await expect(response.data).toBeValidSchema(googleJsonSchema);      
    })
    
    test ('status code ', async() => {
        const conf = {
            url: 'https://google-search3.p.rapidapi.com/api/v1/search/q=elon+musk',
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
            url: 'https://google-search3.p.rapidapi.com/api/v1/search/q=elon+musk',
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


//пример из rapidapi для google API
// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://google-search3.p.rapidapi.com/api/v1/search/q=elon+musk',
//   headers: {
//     'X-User-Agent': 'desktop',
//     'X-Proxy-Location': 'EU',
//     'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
//     'X-RapidAPI-Key': '7a60d19ad3msh5d8cb34531243f0p10b789jsn1591240f287f'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });