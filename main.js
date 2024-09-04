const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

const tempJsonFolder = "temp-json";
const stateFilePath = "state.json";

const url = "https://www.zillow.com/graphql/";
const headers = {
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.8",
    "Client-ID": "for-sale-sub-app-browser-client",
    "Content-Type": "application/json",
    Cookie: [
        "JSESSIONID=8534BB28B6B813B1AFE5DA6F0A248334",
        "search=6|1728045319175%7Cregion%3Dbeaufort-county-sc%26rb%3D610-Newhaven-Ct-Fripp-Island%252C-SC-29920%26rect%3D32.704321%252C-80.305711%252C32.07689%252C-81.016341%26fs%3D1%26fr%3D0%26mmm%3D1%26rs%3D0%26ah%3D0%09%092138%09%7B%22isList%22%3Atrue%7D%09%09%09%09%09",
        "zguid=24|%24f0e8a3b9-6473-47d5-b762-777290a38f5a",
        "zgsession=1|ad515d3f-8e63-4168-9ada-50704e679538",
        'zjs_anonymous_id="f0e8a3b9-6473-47d5-b762-777290a38f5a"',
        "zjs_user_id=null",
        'zg_anonymous_id="7a3c92e3-c743-4331-82a6-a73f596f5487"',
        "AWSALB=caFsQhrZAYFlchLDn9TgYIHB4EGDTlAj7KYmgjABKUgCCleOFpwb1gRG32b/s8gRFQb7g4G7aQYBPEEy1z6nxobFmMW/pBY3QT6VFsiBDuBvwClTfWmXShsH7AAB",
        "AWSALBCORS=caFsQhrZAYFlchLDn9TgYIHB4EGDTlAj7KYmgjABKUgCCleOFpwb1gRG32b/s8gRFQb7g4G7aQYBPEEy1z6nxobFmMW/pBY3QT6VFsiBDuBvwClTfWmXShsH7AAB",
    ].join("; "),
    Priority: "u=1, i",
    "Sec-CH-UA": '"Not)A;Brand";v="99", "Brave";v="127", "Chromium";v="127"',
    "Sec-CH-UA-Mobile": "?0",
    "Sec-CH-UA-Platform": '"Linux"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "Sec-GPC": "1",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
};

async function readJson(filePath) {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

async function writeJson(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

async function fetchZpidData(zpid) {
    const params = {
        extensions: JSON.stringify({
            persistedQuery: {
                version: 1,
                sha256Hash: "bddfe9ca4f79bc5c9d53cfa0307e822a67313d957cd4922ab4a2d67205e2ef00",
            },
        }),
        variables: JSON.stringify({
            zpid,
            platform: "DESKTOP_WEB",
            formType: "OPAQUE",
            contactFormRenderParameter: {
                zpid,
                platform: "desktop",
                isDoubleScroll: true,
            },
            skipCFRD: false,
            ompPlatform: "web",
        }),
    };

    try {
        const { data } = await axios.get(url, { params, headers });
        return data;
    } catch (error) {
        console.error(`Error fetching data for zpid ${zpid}:`, error);
        return null;
    }
}

async function processFiles() {
    const files = await fs.readdir(tempJsonFolder);
    let state = {};
    try {
        state = await readJson(stateFilePath);
    } catch (error) {
        console.log("No previous state found, starting fresh.");
    }

    for (const file of files) {
        if (!file.endsWith(".json")) continue;

        const filePath = path.join(tempJsonFolder, file);
        const fileKey = path.basename(file, ".json");

        // Skip files that were fully processed in the previous run
        if (state[fileKey] && state[fileKey].completed) {
            console.log(`Skipping already processed file: ${file}`);
            continue;
        }

        let fileState = state[fileKey] || { processedZpids: {} };

        try {
            const jsonData = await readJson(filePath);
            const listResults = jsonData.listResults;

            for (const obj of listResults) {
                const zpid = obj.zpid;
                if (!zpid) continue; // Skip if no zpid

                if (fileState.processedZpids[zpid]) {
                    // Skip if already processed
                    console.log(`Skipping already processed zpid ${zpid} in file ${file}`);
                    continue;
                }

                const zpidData = await fetchZpidData(zpid);
                if (zpidData) {
                    // Append data under a new property or modify as needed
                    obj.zpidData = zpidData;

                    // Log that the data has been written
                    console.log(`Complete write data for ${file} zpid ${zpid}`);

                    // Update the state for this zpid
                    fileState.processedZpids[zpid] = true;

                    // Save the updated file
                    await writeJson(filePath, jsonData);

                    // Save the progress of processed zpids
                    state[fileKey] = fileState;
                    await writeJson(stateFilePath, state);
                }
            }

            // Mark the file as completed if all objects have been processed
            if (Object.keys(fileState.processedZpids).length === listResults.length) {
                fileState.completed = true;
                await writeJson(filePath, jsonData);
                console.log(`Completed processing file: ${file}`);
            }
        } catch (error) {
            console.error(`Error processing file ${filePath}:`, error);
        }
    }

    console.log("Processing completed.");
}

processFiles();
