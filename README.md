
# Utilizing Custom Google Media Pipe Hand Gesture Recognizer Model for Home Automation using Low-cost ESP32
This project proposes a system that utilizes real-
time hand gesture recognition to control electronic devices for
home automation using a low-cost ESP32 micro controller. The
system leverages the custom-made Model ”HandFlow” made by
up-scaling retrained Media Pipe Model Maker, a framework from
Google, for real-time hand gesture detection. Users interact with
a web interface to control devices through hand gestures.
## Authors

- [@self-nasu](https://www.github.com/self-nasu)
- [@self-yash](https://www.github.com/self-yash)
- [@self-puneet](https://www.github.com/self-puneet)
- [@tarang_srivas](https://www.instagram.com/tarang_srivas/)

## Prototype Testing

<img src="https://github.com/Self-nasu/HandFlow/blob/main/testing/prototypeimg.jpg" width="60%" height="auto">

<img src="https://github.com/Self-nasu/HandFlow/blob/main/testing/test1.jpg" width="60%" height="auto">

<img src="https://github.com/Self-nasu/HandFlow/blob/main/testing/test2.jpg" width="60%" height="auto">

## Full Prototype testing Video are avaliable at

- [Video 1](https://drive.google.com/file/d/1oj0uSbiiB3rmhwIcw8iaKmF5ybHWSIA_/view?usp=sharing) 
- [Video 2](https://drive.google.com/file/d/1of05iUnZ_4VNP9DUPiZ4Sqv1uL3IrGE8/view?usp=sharing)
## Hand Gesture Details

<img src="https://github.com/Self-nasu/HandFlow/blob/main/Gesture/command.jpg" width="45%" height="auto">

- Gesture "Started Listening" in fig initiates gesture recognition in our model.
- Until the "Started Listening" gesture appears, no other gesture messages are sent to Firebase, and no appliance executions occur.
- Upon detecting the "Started Listening" gesture, the model begins capturing subsequent gesture messages and generates a JSON file for Firebase.
- The "on" gesture in fig signals the model to activate specified devices with an ON setting.
- Similarly, the "off" gesture in fig instructs the model to deactivate specified devices with only an ON setting.
- The appearance of the "end" gesture in fig marks the conclusion of the process, with the JSON file sent to Firebase, triggering embedded C code execution.
- Between the "Started Listening" and "end" gestures, a sequence of gestures is executed.

<img src="https://github.com/Self-nasu/HandFlow/blob/main/Gesture/device.jpg" width="45%" height="auto">

- When gesture "device 1" in fig is triggered by hand movements, the selection of the device linked to our Controller Node's device 1 is guaranteed.
- Instructions from the user will be executed on this device until a different device is chosen.
- Similarly, gestures in fig can be used to select device 2 and device 3.
- Gesture "device fan" in fig acts as an intermediary gesture, allowing users to shift control from any other device to a fan. It facilitates the selection and control of the fan, enabling users to turn it on or off or adjust the fan speed.

<img src="https://github.com/Self-nasu/HandFlow/blob/main/Gesture/level123.jpg" width="45%" height="auto">

<img src="https://github.com/Self-nasu/HandFlow/blob/main/Gesture/level45.jpg" width="45%" height="auto">

- In fig and fig, gestures labeled as level 1, level 2, level 3, level 4, and level 5 are designed specifically for devices with built-in level settings.
- These gestures alter the level setting of the selected device from its previous state to the corresponding level.
- However, these gestures have no effect on devices lacking level settings.


## Training Data Set

For our HandFlow Model training, we curated a dataset comprising over 4000 images. Each gesture category consists of a minimum of 250-300 images, with the remaining images representing the absence of a gesture (None gesture). The dataset's creation and curation were primarily conducted by:

- [@self-yash](https://www.github.com/self-yash) - BTech CSE - AI/ML
- [@self-puneet](https://www.github.com/self-puneet) - BTech CSE - AI/ML
## Our Custom HandFlow Model & Web Application

We developed a custom model for hand gesture detection using the transfer learning concept. Leveraging the Google Media-pipe hand Landmark Detection model as our foundation, we retrained it with our dataset of gesture images. This approach resulted in achieving significantly improved accuracy for video-based hand gesture detection.

Our choice of utilizing the Google Media-pipe hand landmark detection model stemmed from its stability and ease of deployment in the current market scenario. This ensures seamless integration into our web application or any other desired platform.

The primary architect behind the model training and development of the web application was:

- [@self-nasu](https://www.github.com/self-nasu) - BCA || MCA - AI/ML
- [LinkedIn - self-nasu](https://www.linkedin.com/in/nasu1708/)

## Hardware Design

The success of our project hinged on the seamless integration of hardware components. We orchestrated an impressive fusion of Firebase service with the cost-effective ESP32, enabling us to harness gesture data for home automation purposes. Additionally, the prototype crafted by [@tarang_srivas](https://www.instagram.com/tarang_srivas/) underwent rigorous testing, ensuring its functionality and reliability. Moreover, we handcrafted the PCB (Printed Circuit Board) tailored specifically for this project, further enhancing its efficiency and performance. This intricate hardware design, orchestrated by Tarang Srivas, played a pivotal role in bringing our vision to fruition.

- [@tarang_srivas](https://www.instagram.com/tarang_srivas/) - BTech ECE
