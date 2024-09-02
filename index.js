const axios = require('axios');
const fs = require('fs');
const path = require('path');
const mapBounds = require('./mapBounds.js');

const API_URL = 'https://www.zillow.com/async-create-search-page-state';
const HEADERS = {
    'accept': '*/*',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'content-type': 'application/json',
    'cookie': 'zguid=24|%2492644882-0173-41c5-9423-7d998663ba5c; zjs_anonymous_id=%2292644882-0173-41c5-9423-7d998663ba5c%22; zjs_user_id=null; zg_anonymous_id=%2250da1ac9-caab-4b5a-b18e-ec5aa8115a50%22; zgsession=1|204c985d-4862-4f83-acc5-c98581f2d47a; pxcts=55e9a386-6947-11ef-afd4-a8f30536ee6b; _pxvid=55e98f74-6947-11ef-afd4-a8fa08a61b8c; JSESSIONID=18C405DD20696AB4241AE8F286CBEB81; _px3=929731252713fee4eeb7d7b7ba2f0e7af8449d5ea420203b339f2f20165fff12:ckpBBQCPASom1O79qE37zC+KWExaFWXhpJ/LpNV5TDWwyrgiL4J9YYEp43pn7ZgypoupPMCplelwh5zRX0x/VA==:1000:Elrhx67LN9WbtT7lC/j5t2w0/uTnXtplUs+bWQk/WRYXkPFTKhCKBv/ZqR3G4RAT61jU2TdgmEfJyDzWwbkO+7Gt8pUqDP9CaxFS9yTSsarzVv1eHRapprpjNkAO+bvqStdCejqm5kS3T4DCQFWZeFuRqTpCKHkGgoRPhIX2LYPlCg+I8/dy/pUyGnxZJUNyE8P8pHfD9tZVAUh/JEByHSaf50eC5Ic5GDzvk3mUEHg=; search=6|1727887473873%7C%09%093%09%7B%22isList%22%3Atrue%2C%22isMap%22%3Atrue%7D%09%09%09%09%09; AWSALB=ucYWULUIg008Vaz6CoLoA4cq2cr1/LaBSao8IWXG0kKeekg48PK7mEx9uheKTvafrfLGDGl4CCpOyqLTxwlgJVuf2r04bOdyH6jvzL5XrZsFvWs0vFwavu3LOVDN; AWSALBCORS=ucYWULUIg008Vaz6CoLoA4cq2cr1/LaBSao8IWXG0kKeekg48PK7mEx9uheKTvafrfLGDGl4CCpOyqLTxwlgJVuf2r04bOdyH6jvzL5XrZsFvWs0vFwavu3LOVDN; search=6|1727878584743%7Crect%3D45.8218174416852%2C-63.816218093749995%2C41.87846159904494%2C-81.08672590625%26rid%3D58%26disp%3Dmap%26mdm%3Dauto%26p%3D1%26z%3D1%26listPriceActive%3D1%26fs%3D1%26fr%3D0%26mmm%3D0%26rs%3D0%26ah%3D0%26singlestory%3D0%26housing-connector%3D0%26parking-spots%3Dnull-%26abo%3D0%26garage%3D0%26pool%3D0%26ac%3D0%26waterfront%3D0%26finished%3D0%26unfinished%3D0%26cityview%3D0%26mountainview%3D0%26parkview%3D0%26waterview%3D0%26hoadata%3D1%26zillow-owned%3D0%263dhome%3D0%26featuredMultiFamilyBuilding%3D0%26student-housing%3D0%26income-restricted-housing%3D0%26military-housing%3D0%26disabled-housing%3D0%26senior-housing%3D0%26commuteMode%3Ddriving%26commuteTimeOfDay%3Dnow%09%0958%09%7B%22isList%22%3Atrue%2C%22isMap%22%3Atrue%7D%09%09%09%09%09', // Replace with valid cookie data
    'dnt': '1',
    'origin': 'https://www.zillow.com',
    'referer': 'https://www.zillow.com/homes/for_sale/',
    'sec-ch-ua': '"Not;A=Brand";v="24", "Chromium";v="128"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
};

const progressFilePath = path.join(__dirname, 'progress.json');

function loadProgress() {
    if (fs.existsSync(progressFilePath)) {
        return JSON.parse(fs.readFileSync(progressFilePath, 'utf8'));
    }
    return {};
}

function saveProgress(state, page) {
    const progress = loadProgress();
    progress[state] = page;
    fs.writeFileSync(progressFilePath, JSON.stringify(progress, null, 2));
}

async function getData(pageNumber, bounds, stateName) {
    const data = {
        searchQueryState: {
            pagination: { currentPage: pageNumber },
            isMapVisible: false,
            usersSearchTerm: '',
            mapBounds: bounds,
            filterState: {
                sortSelection: { value: 'globalrelevanceex' },
                isAllHomes: { value: true }
            },
            isListVisible: true
        },
        wants: {
            cat1: ['listResults'],
            cat2: ['total']
        },
        requestId: 5,
        isDebugRequest: false
    };

    const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: API_URL,
        headers: HEADERS,
        data: JSON.stringify(data)
    };

    try {
        const response = await axios.request(config);
        const listResults = response.data?.cat1?.searchResults?.listResults || [];

        if (listResults.length > 0) {
            const folderPath = path.join(__dirname, stateName);
            if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

            const filePath = path.join(folderPath, `page${pageNumber}.json`);
            fs.writeFileSync(filePath, JSON.stringify(listResults));
            console.log(`Saved page ${pageNumber} data for ${stateName}`);

            // Save progress after successful save
            saveProgress(stateName, pageNumber);
        }

        return listResults.length > 0;
    } catch (error) {
        console.error(`Error getting data for page ${pageNumber} and state ${stateName}: `, error.message);
        return false;
    }
}

async function processMapBounds() {
    const progress = loadProgress();

    for (let i = 0; i < mapBounds.length; i++) {
        const { state, bounds } = mapBounds[i];
        console.log(`Processing state: ${state}`);

        let pageNumber = progress[state] ? progress[state] + 1 : 1;
        let hasMoreResults = true;

        while (hasMoreResults) {
            hasMoreResults = await getData(pageNumber, bounds, state);
            if (hasMoreResults) {
                pageNumber++;
                await delay(2000);
            }
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

processMapBounds();
