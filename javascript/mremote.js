// ================================================================================================================================
//                                                  Models Importing
// ================================================================================================================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js';

// =================================================================================================================================
//                                                  Variables SetUp
// =================================================================================================================================

let enabledevice1;
let enabledevice2;
let enabledevice3;
let remote_status = false;
// device 1
let device1_status = false;
let device1_icon = document.getElementById("m-device1-icon");
let device1_card = document.getElementById("device1-card");
// device 2
let device2_status = false;
let device2_icon = document.getElementById("m-device2-icon");
let device2_card = document.getElementById("device2-card");
// device 3
let device3_status = false;
let device3_icon = document.getElementById("m-device3-icon");
let device3_card = document.getElementById("device3-card");

if (remote_status == false) {
    enabledevice1 = document.getElementById("m-device1-btn");
    enabledevice1.addEventListener("click", device1_work);

    enabledevice2 = document.getElementById("m-device2-btn");
    enabledevice2.addEventListener("click", device2_work);

    enabledevice3 = document.getElementById("m-device3-btn");
    enabledevice3.addEventListener("click", device3_work);

    remote_status = true
}
else {
    alert("Sorry Mobile Remote service not availabe.")
}

// =================================================================================================================================
//                                                  FireBase SetUp
// =================================================================================================================================

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

// =================================================================================================================================
//                                                  Variables SetUp
// =================================================================================================================================
let gestureData = {};

function device1_work(event) {
    if (device1_status == false) {
        gestureData.device = "device_1";
        gestureData.level = "0";
        gestureData.command = "on";
        set(gestureDataRef, gestureData);
        device1_status = true;
        enabledevice1.innerText = "Turn Off";
        device1_card.classList.add("card-active");
        device1_icon.innerHTML = '<i class="bi bi-lightbulb-fill"  style="color: yellow !important;"></i>';
    }
    else {
        gestureData.device = "device_1";
        gestureData.level = "0";
        gestureData.command = "off";
        set(gestureDataRef, gestureData);
        device1_status = false;
        enabledevice1.innerText = "Turn On ";
        device1_card.classList.remove("card-active");
        device1_icon.innerHTML = '<i class="bi bi-lightbulb"></i>';
    }
}

function device2_work(event) {
    if (device2_status == false) {
        gestureData.device = "device_2";
        gestureData.level = "0";
        gestureData.command = "on";
        set(gestureDataRef, gestureData);
        device2_status = true;
        enabledevice2.innerText = "Turn Off";
        device2_card.classList.add("card-active");
        device2_icon.innerHTML = '<i class="bi bi-lightbulb-fill"  style="color: yellow !important;"></i>';
    }
    else {
        gestureData.device = "device_2";
        gestureData.level = "0";
        gestureData.command = "off";
        set(gestureDataRef, gestureData);
        device2_status = false;
        enabledevice2.innerText = "Turn On ";
        device2_card.classList.remove("card-active");
        device2_icon.innerHTML = '<i class="bi bi-lightbulb"></i>';
    }
}

function device3_work(event) {
    if (device3_status == false) {
        gestureData.device = "device_3";
        gestureData.level = "0";
        gestureData.command = "on";
        set(gestureDataRef, gestureData);
        device3_status = true;
        enabledevice3.innerText = "Turn Off";
        device3_card.classList.add("card-active");
        device3_icon.innerHTML = '<i class="bi bi-lightbulb-fill"  style="color: yellow !important;"></i>';
    }
    else {
        gestureData.device = "device_3";
        gestureData.level = "0";
        gestureData.command = "off";
        set(gestureDataRef, gestureData);
        device3_status = false;
        enabledevice3.innerText = "Turn On ";
        device3_card.classList.remove("card-active");
        device3_icon.innerHTML = '<i class="bi bi-lightbulb"></i>';
    }
}