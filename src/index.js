/*
The js file for the test interface.

2022.09.27 created

2022.10.17 add global call
2022.10.25 add MathJax support
*/
import '../spacemath.css'
import {fmToPTX} from './parse.js'
import {pmdToPtx, pmdToXast} from './pmdToPtx.js';

"use strict";
let sourceTextArea = document.getElementById("sourceTextArea");
let echosourceTextArea = document.getElementById("echosourceTextArea");
let xastDisplayArea = document.getElementById("xastDisplayArea");
//let mathmlTextArea = document.getElementById("mathmlTextArea");
//let pretextTextArea = document.getElementById("pretextTextArea");
//let speechTextArea = document.getElementById("speechTextArea");
//let mathJaxArea = document.getElementById("MathJaxArea");

//let translateTable = new TranslateTable();

let convertMethod = 'original';
// Modify convertMethod according to the dropdown selection
let converterSelect = document.getElementById("converterSelect");
if(converterSelect) {
    console.log("converterSelect found");
    converterSelect.addEventListener('change', function() {
        convertMethod = converterSelect.value;
        console.log("convertMethod changed to " + convertMethod);
    }, false);
}

if (sourceTextArea.addEventListener) {
    sourceTextArea.addEventListener('input', function() {

        const originaltext = sourceTextArea.value;
        console.log("Original text:", originaltext);
        let newtext = '';
        let xast = null;
        if (convertMethod === 'original') {
            newtext = fmToPTX(originaltext);
            // Other conversion methods can be added here
        } else {
            newtext = pmdToPtx(originaltext);
            xast = pmdToXast(originaltext);
        }

        if(echosourceTextArea) {
            echosourceTextArea.innerText = newtext
        }

        if(xastDisplayArea) {
            xastDisplayArea.innerText = xast
        }
    }, false);
};

