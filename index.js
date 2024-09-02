const axios = require('axios');
const fs = require("fs");
const path = require("path");
const mapBounds = require('./mapBounds.js');

async function getData(pageNumber, bounds, stateName) {
    let data = JSON.stringify({
        "searchQueryState": {
            "pagination": {
                "currentPage": pageNumber
            },
            "isMapVisible": false,
            "usersSearchTerm": "",
            "mapBounds": bounds,
            "filterState": {
                "sortSelection": {
                    "value": "globalrelevanceex"
                },
                "isAllHomes": {
                    "value": true
                }
            },
            "isListVisible": true
        },
        "wants": {
            "cat1": [
                "listResults"
            ],
            "cat2": [
                "total"
            ]
        },
        "requestId": 5,
        "isDebugRequest": false
    });

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'https://www.zillow.com/async-create-search-page-state',
        headers: {
            'accept': '*/*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'content-type': 'application/json',
            'cookie': 'zguid=24|%2492644882-0173-41c5-9423-7d998663ba5c; zjs_anonymous_id=%2292644882-0173-41c5-9423-7d998663ba5c%22; zjs_user_id=null; zg_anonymous_id=%2250da1ac9-caab-4b5a-b18e-ec5aa8115a50%22; zgsession=1|204c985d-4862-4f83-acc5-c98581f2d47a; JSESSIONID=B57A996D2500F349DF2C7B4991D7CBF7; search=6|1727880373925%7Crb%3DNewton%252C-KS%26rect%3D38.304314%252C-97.013658%252C37.926729%252C-97.471895%26disp%3Dmap%26mdm%3Dauto%26sort%3Dpriorityscore%26listPriceActive%3D1%26fs%3D1%26fr%3D0%26mmm%3D0%26rs%3D0%26ah%3D0%26singlestory%3D0%26abo%3D0%26garage%3D0%26pool%3D0%26ac%3D0%26waterfront%3D0%26finished%3D0%26unfinished%3D0%26cityview%3D0%26mountainview%3D0%26parkview%3D0%26waterview%3D0%26hoadata%3D1%263dhome%3D0%26commuteMode%3Ddriving%26commuteTimeOfDay%3Dnow%09%0919619%09%7B%22isList%22%3Atrue%2C%22isMap%22%3Atrue%7D%09%09%09%09%09; AWSALB=gvy/ZTPCtiMalnbmzhSwYkM4lp5gzikKIpvxgW4iLEOyYDb3sTfmSZ8qhr8E+ruKCsZhqiz22At6fbR5Bv2WcFfELNK04SO7djMR2/55rjCOGnR0ojMK4YprGW1k; AWSALBCORS=gvy/ZTPCtiMalnbmzhSwYkM4lp5gzikKIpvxgW4iLEOyYDb3sTfmSZ8qhr8E+ruKCsZhqiz22At6fbR5Bv2WcFfELNK04SO7djMR2/55rjCOGnR0ojMK4YprGW1k; search=6|1727878584743%7Crect%3D45.8218174416852%2C-63.816218093749995%2C41.87846159904494%2C-81.08672590625%26rid%3D58%26disp%3Dmap%26mdm%3Dauto%26p%3D1%26z%3D1%26listPriceActive%3D1%26fs%3D1%26fr%3D0%26mmm%3D0%26rs%3D0%26ah%3D0%26singlestory%3D0%26housing-connector%3D0%26parking-spots%3Dnull-%26abo%3D0%26garage%3D0%26pool%3D0%26ac%3D0%26waterfront%3D0%26finished%3D0%26unfinished%3D0%26cityview%3D0%26mountainview%3D0%26parkview%3D0%26waterview%3D0%26hoadata%3D1%26zillow-owned%3D0%263dhome%3D0%26featuredMultiFamilyBuilding%3D0%26student-housing%3D0%26income-restricted-housing%3D0%26military-housing%3D0%26disabled-housing%3D0%26senior-housing%3D0%26commuteMode%3Ddriving%26commuteTimeOfDay%3Dnow%09%0958%09%7B%22isList%22%3Atrue%2C%22isMap%22%3Atrue%7D%09%09%09%09%09',
            'dnt': '1',
            'origin': 'https://www.zillow.com',
            'priority': 'u=1, i',
            'referer': 'https://www.zillow.com/homes/for_sale/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22west%22%3A-80.85396146679689%2C%22east%22%3A-79.83497953320314%2C%22south%22%3A25.230253872754652%2C%22north%22%3A26.174387302610153%7D%2C%22usersSearchTerm%22%3A%22%22%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%7D',
            'sec-ch-ua': '"Not;A=Brand";v="24", "Chromium";v="128"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        const listResults = response.data?.cat1?.searchResults?.listResults;
        const folderPath = path.join(__dirname, stateName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        const filePath = path.join(folderPath, `page${pageNumber}.json`);
        fs.writeFileSync(filePath, JSON.stringify(listResults));
        console.log(`Saved page ${pageNumber} data for ${stateName}`);
        return listResults.length > 0;
    } catch (error) {
        console.error(`Error getting data for page ${pageNumber} and state ${stateName}: `, error);
        return false;
    }
}

async function processMapBounds() {

    let startIndex = 0;
    const stateDirectories = fs.readdirSync(__dirname).filter(file => fs.statSync(path.join(__dirname, file)).isDirectory());
    if (stateDirectories.length > 0) {
        startIndex = mapBounds.findIndex(bounds => bounds.state === stateDirectories[stateDirectories.length - 1]);
        if (startIndex === -1) {
            startIndex = 0;
        } else {
            startIndex += 1;
        }
    }

    for (let i = startIndex; i < mapBounds.length; i++) {
        const { state, bounds } = mapBounds[i];
        console.log(`Processing state: ${state}`);

        let pageNumber = 1;
        let hasMoreResults = true;

        while (hasMoreResults) {
            hasMoreResults = await getData(pageNumber, bounds, state);
            if (hasMoreResults) {
                pageNumber++;
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
            }
        }
    }
}

processMapBounds();
