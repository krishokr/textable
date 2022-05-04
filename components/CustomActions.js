import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';

export default class CustomActions extends Component {

    state = {
        image: {},
        location: {}
    }

    getLocation = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            let result = await Location.getCurrentPositionAsync({});
            if (!result.cancelled) {
                console.log('This is the location: ');
                const latitude = JSON.stringify(result.coords.latitude);
                const longitude = JSON.stringify(result.coords.longitude);
           
                
                this.props.onSend([{location: {latitude, longitude}, text: `Latitude: ${latitude},\nLongitude: ${longitude}`}]);

            }
        }
    }

    uploadImageFetch = async (uri) => {
        const blob = await new Promise ((resolve,reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response)
            };
            xhr.onerror = function(e) {
                console.log(e);
                reject(new TypeError('Network request failed.'))
            }
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        const imageNameBefore = uri.split("/");
        const imageName = imageNameBefore[imageNameBefore.length - 1];

        const storage = getStorage();

        const storageRef = ref(storage, `images/${imageName}`);


        return await uploadBytes(storageRef, blob).then(async snapshot => {
            console.log('file has been uploaded.');
            return await getDownloadURL(snapshot.ref).then(url => {
                return url
            }).catch(err => console.log(err))
        })
        

    }

    imagePicker = async () => {

        const { status } = await Camera.requestCameraPermissionsAsync();
        try {
          if (status === "granted") {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images
            }).catch((error) => console.log(error));

            if (!result.cancelled) {
              const imageUrl = await this.uploadImageFetch(result.uri);
              this.props.onSend({ image: imageUrl });
            }
          }
        } catch (error) {
          console.log(error.message);
        }
    };

    takePhoto = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();

        if (status === 'granted') {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: 'Images'
            }).catch(error => console.log(error));

            if (!result.cancelled) {
                const imageUrl = await this.uploadImageFetch(result.uri);
                this.props.onSend({ image: imageUrl });
            }
        }

    };
    
    onActionPress = () => {
        const options = ['Choose from library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length-1;
        this.context.actionSheet().showActionSheetWithOptions({
            options,
            cancelButtonIndex
        },
        async (buttonIndex) => {
            switch(buttonIndex) {
                case 0:
                    return this.imagePicker()
                case 1:
                    return this.takePhoto()
                case 2:
                    return this.getLocation()
                default:
            }
        })
    }
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.onActionPress}>
                <View style={[styles.wrapper, this.props.wrapperStyle]}>
                    <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
  


const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 16,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
   });

CustomActions.contextTypes = {
actionSheet: PropTypes.func,
};