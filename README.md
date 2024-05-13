# Utilizing Custom Google Media Pipe Hand Gesture Recognizer Model for Home Automation using Low-cost ESP32

This project proposes a system that utilizes real-time hand gesture recognition to control electronic devices for home automation using a low-cost ESP32 microcontroller. The system leverages the custom-made Model "HandFlow" made by up-scaling retrained Media Pipe Model Maker, a framework from Google, for real-time hand gesture detection. Users interact with a web interface to control devices through hand gestures.

## Authors

- [@self-nasu](https://www.github.com/self-nasu)
- [@self-yash](https://www.github.com/self-yash)
- [@self-puneet](https://www.github.com/self-puneet)
- [@tarang_srivas](https://www.instagram.com/tarang_srivas/)

## Prototype Testing

<img src="https://github.com/Self-nasu/HandFlow/blob/main/testing/prototypeimg.jpg" width="50%" height="auto">

<img src="https://github.com/Self-nasu/HandFlow/blob/main/testing/test1.jpg" width="50%" height="auto">

<img src="https://github.com/Self-nasu/HandFlow/blob/main/testing/test2.jpg" width="50%" height="auto">

#### Full Prototype testing Videos are available at

- [Video 1](https://drive.google.com/file/d/1oj0uSbiiB3rmhwIcw8iaKmF5ybHWSIA_/view?usp=sharing) 
- [Video 2](https://www.instagram.com/tarang_srivas/)

## Hand Gesture Details

<img src="https://github.com/Self-nasu/HandFlow/blob/main/Gesture/command.jpg" width="50%" height="auto">

- Gesture "Started Listening" in fig initiates gesture recognition in our model.
- Until the "Started Listening" gesture appears, no other gesture messages are sent to Firebase, and no appliance executions occur.
- Upon detecting the "Started Listening" gesture, the model begins capturing subsequent gesture messages and generates a JSON file for Firebase.
- The "on" gesture in fig signals the model to activate specified devices with an ON setting.
- Similarly, the "off" gesture in fig instructs the model to deactivate specified devices with only an ON setting.
- The appearance of the "end" gesture in fig marks the conclusion of the process, with the JSON file sent to Firebase, triggering embedded C code execution.
- Between the "Started Listening" and "end" gestures, a sequence of gestures is executed.

<img src="https://github.com/Self-nasu/HandFlow/blob/main/Gesture/device.jpg" width="50%" height="auto">

<img src="https://github.com/Self-nasu/HandFlow/blob/main/Gesture/level123.jpg" width="50%" height="auto">

<img src="https://github.com/Self-nasu/HandFlow/blob/main/Gesture/level45.jpg" width="50%" height="auto">
