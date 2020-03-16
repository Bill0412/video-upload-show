import * as functions from 'firebase-functions';

// const os = require('os');
// const path = require('path');
const cors = require('cors')({origin: true});
// const fs = require('fs');
// const gcs = require('@google-cloud/storage')();


/*
 * Generate a JSON File of Download URLs of all the videos in the Firebase  Storage
 * Download URL Format: {event.mediaLink}&token={event.metadata.firebaseStorageDownloadTokens}
 */
export const onFileChange = functions.storage.object().onFinalize((event: any) => {
    console.log(event);

    const tmp = event.selfLink.parse('/');
    const filename = tmp[tmp.length - 1];
    const link = "https://firebasestorage.googleapis.com/v0/b/video-c34ea.appspot.com/o/" + filename + "?alt=media&token=" + event.metadata.firebaseStorageDownloadTokens;

    console.log(link);

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
        // try to traverse the whole directory

        // get the urls JSON File

        return res.status(200).json({
            // urls: ''
        });
    })
});