# Textable Chat Application

### Last Updated: May 18, 2022

<image src="./assets/demo1.png" width="100">
<image src="./assets/demo2.png" width="100">


## Overview

Textable is a colorful React Native mobile chat app for ios that allows users to personalize their chat through color customization and communicate through messages, images, and by sending their current location. 


## Key Features

* Home page that allows users to customize their chat with different colors and their name.
* Chat page that allows users to send text messages, images, and their location.
* Messages are stored in a database to allow users to pick up from where they left off.
* Messages are visible both online and offline.


## Objective

The aim of this project was to build a React Native application with Cloud Firestore that can function both online and offline using Async Storage.


## Approach

### Server-Side
I used Google Firebase API with the non-relational Cloud Firestore REST database to store texts and Firebase Storage to store images. The location is sent using Expo's MapView component. The API is accessed using Firebase SDK. Cloud Firestore stores data in a JSON format while Firebase Storage stores data in a blob format. Textable also uses AsyncStorage to store data locally so the user can view data offline.

### Client-Side
The client-side of the application was the main focus of the project using React Native and the Gifted Chat API to make message format simpler. The home screen allows users to select a color customization for their chat experience. Once the user enters their name and selects a color, the user is taken to the chat screen. The bubble display, the action sheet display, and the message toolbar is handled using the Gifted Chat API. Selecting the plus icon in the toolbar opens the action sheet where the user can take photos using their camera, select images from their library, or send their current location. If the user is offline, the toolbar is disabled so the user can only view past messages and not send new messages. The location is formatted as a message using the expo MapView component that takes the current location and displays it in a Google map.


### Credits: Lead Developer and Designer: Kristofer Hokr


# Getting Started

Clone this repository
```git clone https://github.com/krishokr/textable.git```

Go to project's root directory
```cd textable```

Install dependencies
```npm install```

Set up a [Firestore Database](https://firebase.google.com/docs) and an [Expo account](https://docs.expo.dev/). You will need to replace the firebaseConfig variable in firebaseConfig.js with your own database configuration.

Run the project using expo:
```expo start```

Scan the QR code with Camera app (iOS) Run on iOS Emulator to test the chat features.


# Dependencies

React Native v0.64.3 or higher
- React Native Navigation v6.0.10
- React Native Maps v0.29.4 or higher

Expo v44.0 or higher
- expo-camera: v12.1.2
- expo-image-picker: v12.0.2
- expo-location: v14.0.2

Firebase 9.6.11 or higher

React Native Gifted Chat v0.16.3 or higher

React Native Async Storage v1.17.13 or higher

Netinfo v7.1.3


# Database Configuration using Firebase Cloud Firestore

* Messages are stored in Cloud Firestore.
* Images are stored using Firebase Storage as a blob.
* Firestore credentials are stored in a separate firebaseConfig.js file.


