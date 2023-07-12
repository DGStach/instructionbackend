// index.js
import fetch from "node-fetch";
const { writeFile } = require('fs').promises;

const url =
    'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4';

(async () => {
    const response = await fetch(url);
    const buffer = await response.buffer();
    await writeFile('test.mp4', buffer);
    console.log('Done!');
})();