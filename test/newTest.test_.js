const sendHttpRequest = require('../sendHttpRequest');
const axios = require('axios');
const sportJsonschema = require('../testData/sportSchema.json');

describe('new tests', () => {

    let response;
    test('first test', async () => {
        response = await axios.get('https://odds.p.rapidapi.com/v4/sports', {
                params: {all: 'true'},
                headers: {
                  'X-RapidAPI-Host': 'odds.p.rapidapi.com',
                  'X-RapidAPI-Key': '7898d4c266msh4bb61e72c9c87ffp1309eejsn182377b55ad4'
                }
        })
        // console.log(response);
        await expect(response.status).toEqual(200);
    });

    test('validate sjon schema', async () => {
        console.log('sportJsonschema', sportJsonschema);
        //console.log('response.data', response.data);
        await expect(response.data).toBeValidSchema(sportJsonschema);
    })

    test('json schema validation', async() => {
        const conf = {
            url: 'https://odds.p.rapidapi.com/v4/sports',
            params: {all: 'true'},
            headers: {
              'X-RapidAPI-Host': 'odds.p.rapidapi.com',
              'X-RapidAPI-Key': '7898d4c266msh4bb61e72c9c87ffp1309eejsn182377b55ad4'
            }
        }
        response = await sendHttpRequest(conf);
        console.log(response);
        await expect(response).toBeValidSchema(sportJsonschema);
    })
    
    test('status code ', async() => {
        const conf = {
            url: 'https://odds.p.rapidapi.com/v4/sports',
            params: {all: 'true'},
            headers: {
              'X-RapidAPI-Host': 'odds.p.rapidapi.com',
              'X-RapidAPI-Key': '7898d4c266msh4bb61e72c9c87ffp1309eejsn182377b55ad4'
            }
        }
        response = await sendHttpRequest(conf);
        console.log(response);
        await expect(response).toBeValidStatusCode(200);
    })


    test('status code ', async() => {
        const conf = {
            url: 'https://odds.p.rapidapi.com/v4/sports',
            params: {all: 'true'},
            headers: {
              'X-RapidAPI-Host': 'odds.p.rapidapi.com',
              'X-RapidAPI-Key': '7898d4c266msh4bb61e72c9c87ffp1309eejsn182377b55a'
            }
        }
        response = await sendHttpRequest(conf, 'POST');
        console.log(response);
        await expect(response).toBeValidStatusCode(403);
        await expect(response.data.message).toEqual('You are not subscribed to this API.');
    })
});