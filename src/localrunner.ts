import {handler} from "./index.js"
import * as fs from 'fs'

function whatever() {
    let sample = JSON.parse(fs.readFileSync("./sampleAutocompleteMove.json", "utf-8"));
    handler(sample);
}

whatever();
export { whatever }