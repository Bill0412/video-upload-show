import * as functions from 'firebase-functions';

const os = require('os');
const path = require('path');
const cors = require('cors')({origin: true});
const Busboy = require('busboy');
const fs = require('fs');
const gcs = require('@google-cloud/storage')();

export const onFileChange = functions.storage.object().onFinalize((event: any) => {
    console.log(event);
    return;
});

export const getVideoURL = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        console.log(req);

        if(req.method !== "GET") {
            return res.status(500).json({
                message: 'Not allowed'
            });
        }
        
        // get the urls JSON File

        return res.status(200).json({
            // urls: ''
        });
    })
});