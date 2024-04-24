// ================================================================================================================================
//                                                  Models Importing
// ================================================================================================================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js';
import { GestureRecognizer, FilesetResolver, DrawingUtils } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";


// =================================================================================================================================
//                                                  Variables SetUp
// =================================================================================================================================

let gestureRecognizer;
let runningMode = "IMAGE";
let enableWebcamButton;
let webcamRunning = false;
let gestureData = null;
let isListening = false;

// =================================================================================================================================
//                                                  Gesture Recognizer Intislizer
// =================================================================================================================================

const createGestureRecognizer = async () => {
    const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm");
    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: "./model/HandFlow4.task",
            delegate: "GPU"
        },
        runningMode: runningMode
    });
};
createGestureRecognizer();


// =================================================================================================================================
//                                                 WebCam Or Front Camera Handler
// =================================================================================================================================

const video = document.getElementById("webcam");
const canvasElement = document.getElementById("output_canvas");
const canvasCtx = canvasElement.getContext("2d");

// output screen for consol

const gestureOutput = document.getElementById("gesture_output");
const device = document.getElementById("device");
const level = document.getElementById("level");
const command = document.getElementById("command");
const field = document.getElementById("field");
const field2 = document.getElementById("field2");
const field3 = document.getElementById("field3");
const indicator = document.getElementById("indicator");

// Check if webcam access is supported.

function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}
// If webcam supported, add event listener to button for when user
// wants to activate it.

if (hasGetUserMedia()) {
    enableWebcamButton = document.getElementById("webcamButton");  
    enableWebcamButton.addEventListener("click", enableCam); 
}
else {
    console.warn("getUserMedia() is not supported by your browser");
}

// Enable the live webcam view and start detection.

function enableCam(event) {
    if (!gestureRecognizer) {
        alert("Please wait for Hand Flow Model to load");
        return;
    }
    if (webcamRunning === true) {
        webcamRunning = false;
        enableWebcamButton.innerText = "ENABLE PREDICTIONS";
    }
    else {
        webcamRunning = true;
        enableWebcamButton.innerText = "DISABLE PREDICTIONS";
    }
    // getUsermedia parameters.
    const constraints = {
        video: true
    };
    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        video.srcObject = stream;
        video.addEventListener("loadeddata", predictWebcam);
    });
}


let lastVideoTime = -1;
let results = undefined;

// Your Firebase configuration 

const firebaseConfig = {
    apiKey: "AIzaSyCzlNfNrVacMUc7TKUsxXhvXpem0PbPY8Y",
    authDomain: "handflow2-c9fc1.firebaseapp.com",
    databaseURL: "https://handflow2-c9fc1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "handflow2-c9fc1",
    storageBucket: "handflow2-c9fc1.appspot.com",
    messagingSenderId: "243080489801",
    appId: "1:243080489801:web:06d87d0aa583d46477c898",
    measurementId: "G-XZYPYD2LPL"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const gestureDataRef = ref(database, 'gestureData');

// =================================== handleGesture function makes the JSON File and Send to Firebase ===========================

function handleGesture(gesture) {
    if (gesture === "started_listening") {
        isListening = true;
        field.style.display = "flex";
        field2.style.display = "flex";
        field3.style.display = "flex";
        indicator.style.backgroundColor = "#00e700";
        indicator.innerText = "Now recoding gestures";
        console.log('started listening');
        gestureData = {}; // Initialize gestureData with an empty object
        // gestureData.command = {};
    } else if (gestureData !== null) {
        if (["device_fan", "device_1", "device_2", "device_3"].includes(gesture)) {
            gestureData.device = gesture;
            device.innerText = gesture;
        } else if (gestureData.level == null) {
            gestureData.level = "0";
            level.innerText = '0';
        }else if (gesture.startsWith("level_")) {
            gestureData.level = gesture.slice(6);
            level.innerText = gesture.slice(6);
        } else if (["on", "off"].includes(gesture)) {
            gestureData.command = gesture;
            command.innerText = gesture;
        }

        if (gesture === "end") {
            if (isListening) {
                sendGestureDataToFirebase(gestureData); // Pass gestureData to sendGestureDataToFirebase
                isListening = false;
                field.style.display = "none";
                field2.style.display = "none";
                field3.style.display = "none";
                indicator.style.backgroundColor = "Red";
                indicator.innerText = "Please start recording";
                gestureData = {}; // Reset gestureData to an empty object
            }
        }
    }
}

// ================================================= Helping Function for handleGesture ================================================


async function sendGestureDataToFirebase(gestureData) {
    console.log('Sending gesture data to Firebase:', gestureData); // Add this line for debugging
    try {
        if (gestureData !== undefined) {
            await set(gestureDataRef, gestureData); // Use set() function here
            console.log('Gesture data sent to Firebase:', gestureData);
        } else {
            console.error('Error: gestureData is undefined');
        }
    } catch (error) {
        console.error('Error sending gesture data to Firebase:', error);
    }
}

//  ================================ Main Model function for predicting and stroring Hand gesture ===============================
//  ============================================== Dont touch this Code =========================================================

async function predictWebcam() {
    const webcamElement = document.getElementById("webcam");
    // Now let's start detecting the stream.
    if (runningMode === "IMAGE") {
        runningMode = "VIDEO";
        await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
    }
    let nowInMs = Date.now();
    if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        results = gestureRecognizer.recognizeForVideo(video, nowInMs);
    }

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    const drawingUtils = new DrawingUtils(canvasCtx);

    if (results.landmarks) {
        for (const landmarks of results.landmarks) {
            drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
                color: "#d9d9d9",
                lineWidth: 1
            });
        }
    }
    canvasCtx.restore();

    if (webcamRunning === true) {
        window.requestAnimationFrame(predictWebcam);
    }

    if (results.gestures.length > 0) {
        const gesture = results.gestures[0][0].categoryName;
        handleGesture(gesture);
    }
}


// =================================================================================================================================
//                                                M-Remote Handler
// =================================================================================================================================




