const AdmZip = require('adm-zip');
const path = require('path');

const filePath = "C:/Users/crist/Downloads/_The_Ultimate_French_Deck_LoF__French_in_Action_.apkg";

try {
    const zip = new AdmZip(filePath);
    const zipEntries = zip.getEntries();

    console.log("Files within the archive:");
    let foundCollection = false;
    zipEntries.forEach(function (zipEntry) {
        if (zipEntry.entryName.includes("collection")) {
            console.log("- " + zipEntry.entryName);
            foundCollection = true;
        }
    });

    if (!foundCollection) {
        console.log("No 'collection' files found.");
    }

} catch (e) {
    console.error("Error reading zip:", e);
}
