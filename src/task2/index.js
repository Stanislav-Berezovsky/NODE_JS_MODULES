import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import csv from 'csvtojson';

const readable = fs.createReadStream(path.join(__dirname, '/input.csv'));
const writetable = fs.createWriteStream(path.join(__dirname, '/output.txt'));

pipeline(
    readable,
    csv({ ignoreColumns: /(Amount)/i })
        .preFileLine((fileLine, idx) => idx === 0 ? fileLine.toLowerCase() : fileLine),
    writetable,
    error => {
        if (error) {
            console.error('failed: ', error);
        } else {
            console.log('finished');
        }
    }
);