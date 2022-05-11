# textable

Overview

Textable is a colorful React Native mobile chat app for ios that allows users to personalize their chat through color customization and communicate through messages, images, and by sending their current location. 


Purpose & Context

Textable was a personal project I built as part of the web developement course at Career Foundry to demonstrate my mastery of full-stack JavaScript development.

Objective

The aim of this project was to build a React  Native application I can add to my professional portfolio. The problem I wanted to solve was to build a complete app using React Native and Cloud Firestore that can function both online and offline using Async Storage from scratch.


Approach

Server-Side

I used Firebase API with the non-relational Cloud Firestore REST database to store text messages and Firebase Storage to store image messages. The API is accessed using Firebase SDK. Cloud Firestore stores data in a JSON format while Firebase Storage stores data in a blob format. Textable also uses AsyncStorage to store data locally so the user can view data offline.

Client-Side

The client-side of the application is the main focus of the project using React Native and the Gifted Chat API to make message format simpler. The home screen allows users to select a color customization for their chat experience. Once the user enters their name and selects a color, the user is taken to the chat screen. The bubble display, the action sheet display, and the message toolbar is handled using the Gifted Chat API. Selecting the plus icon in the toolbar opens the action sheet where the user can take photos using their camera, select images from their library, or send their current location. If the user is offline, the toolbar is disabled so the user can only view past messages and not send new messages. The location is formatted as a message using the expo MapView component that takes the current location and displays it in a Google map.

Challenges

My biggest challenge with this project was staying up to date with the newest technologies. Career Foundry's lessons are out of date, so I had to research the documentation and make sure my app reflected the most current versions of React Native, Firebase, React Native Navigation, and Expo. This emphasized the importance as a developer to stay up to date and just how different the syntax and usage of each update can be. Proficiently reading documentation is a simple yet underrated skill that I am happy to add to my tool-belt, and makes me in turn, a more resilient, efficient, and self-sufficient developer. 

Duration

The development of this project took me a bit longer than expected as it took me awhile to figure out that the versions I was using were out of date and causing errors.

Credits
Lead Developer and Designer: Kristofer Hokr

                        -------------    

Development Environment Requirement and Libraries

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

                        -------------       

Database Configuration using Firebase Cloud Firestore

- Messages are stored in Cloud Firestore
- Images are stored using Firebase Storage as a blob

- Store Firestore credentials in a separate firebaseConfig.js file


