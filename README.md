# textable

Overview

Textable is a colorful chat app that allows users to communicate through messages, images, and by sending the user's current location.

The goal was to build a React Native application that was able to function online and offline using Cloud Firestore and Async Storage.

Role: Lead Developer.

This was a project I completed for the Full Stack Web Development course at Career Foundry. The goal of this app was to build a full stack app to practice my skills in React Native. This app required me to familiarize myself with the updated versions of Firebase, React Native, React Native Navigation, and Async Storage. 

                        -------------    

Retrospective

My original intention was to design and implement a simple, colorful app that allows me to practice developing for a mobile environment. My biggest challenge was staying up to date with the newest technologies as Career Foundry's lessons are a bit out of date. This emphasized the importance as a developer to stay up to date by reading documentation and just how different the syntax and usage of each update can be. Proficiently reading documentation is a simple yet underrated skill that I am happy to add to my tool-belt, and makes me in turn, a more resilient, efficient, and self-sufficient developer.

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


