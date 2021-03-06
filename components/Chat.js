import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import MapView from 'react-native-maps';
import React, {useState, useEffect, useCallback} from 'react';
import { GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';

import {db} from './firebaseConfig';

import { addDoc, collection, onSnapshot, where, query } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import './fontawesome';
import CustomActions from './CustomActions';

//Ignores warning due to expo and async storage
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: AsyncStorage has been extracted from react-native core']);






export default function Chat(props) {
  const [messages, setmessages] = useState([]);
  const [uid, setuid] = useState(0);
  const [newMessage, setnewMessage] = useState({});
  const [isConnected, setisConnected] = useState(true);
  const name = props.route.params.text;
  const color = props.route.params.color;
  const messagesCollectionRef = collection(db, "messages");


  useEffect(() => {
    AsyncStorage.getItem('messages').then(res => console.log(res));
  }, [])
  

  useEffect(() => {
    props.navigation.setOptions({ title: name });

    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
        setisConnected(true);

      const auth = getAuth();
      let unSubscribe;

      const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
        
        if (!user) {
          await signInAnonymously(auth);
        } 

        setuid(user.uid);
        setmessages([]); 


        const q = query(messagesCollectionRef, where("uid", "==", user.uid));
      
        unSubscribe =  onSnapshot(q, onCollectionUpdate);
        
        return () => {
          authUnsubscribe();
          unSubscribe();
        }
        
      });

      } else {
        console.log('offline');
        setisConnected(false);
        getMessages();

      }
    })
  },[])

  

  async function getMessages() {
    let messagesStr = '';
    try {
      
      messagesStr = await AsyncStorage.getItem('messages') || [];
   
      (messagesStr === []) ? setmessages([]) : setmessages(JSON.parse(messagesStr));

      console.log('successfully got messages')

    } catch (error){
      console.log('getMessages error: ')
        console.log(error.message);
    }
  }

  async function onCollectionUpdate(querySnapshot) {

    let collectDocs = [];

    querySnapshot.forEach( doc => {
      let data = doc.data();
      let obj = {_id: data._id, text: data.text, createdAt: data.createdAt.toDate(), user: data.user, uid};
      collectDocs.push(obj);
    });

    orderMessages(collectDocs);

    return setmessages(collectDocs);
  }

  function orderMessages(messagesArr) {
    return messagesArr.sort((a,b) => b.createdAt - a.createdAt);
  }

  async function addMessage(messageObj) {
    
    const docRef = await addDoc(messagesCollectionRef, messageObj);
    
    return docRef
  }

  useEffect(() => {
    //waits until the uid and the newMessage states have been updated to add a new message
    if ((uid !== 0) && (Object.keys(newMessage).length > 0)) {
      addMessage(newMessage);
      setnewMessage([]);
    }
  },[newMessage, uid]);

  async function saveMessages() {
    try {
      console.log('saving messages...');

      // console.log(JSON.stringify(messages));
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
        
      console.log('successfully saved messages');
    } catch(error) {
      console.log('error in saveMessages: ');
      console.log(error.message);
    }
  }


  async function deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      setmessages([]);
    } catch(error) {
      console.log(error.message);
    }
  }

  //Saves messages to local storage once messages are set in onSend
  useEffect(() => {
    if (messages.length > 0) {
      saveMessages();
    }
  }, [messages])

  const onSend = useCallback((messages = []) => { 
    console.log('onSend is called!')
    console.log('messages in onSend: ')
    console.log(messages);
    let formattedMsg = {...messages[0], uid};
    setnewMessage(formattedMsg);
    setmessages(previousMessages => GiftedChat.append(previousMessages, messages))
    
  }, []);

  
  
  function renderBubble(props) {
    console.log('This is the props in renderBubble: ')
    console.log(props.currentMessage);
    return <Bubble {...props} wrapperStyle={{ right: 
      { backgroundColor: '#000' }
    }}/>
  }

  function renderInputToolbar(props) {
    return (isConnected) ? <InputToolbar {...props} placeholderTextColor='#000' containerStyle={styles.textBar} /> : null
  } 



  function renderCustomActions(props) {
    return <CustomActions {...props}/>
  }


  function renderCustomView(props) {
    const {currentMessage} = props;
   
    if (currentMessage.location) {
      console.log('This is current location in renderCustomView: ')
      console.log(currentMessage.location.latitude);
      return <MapView style={styles.map}
      region={{
        latitude: parseInt(currentMessage.location.latitude),
        longitude: parseInt(currentMessage.location.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}/>
    }
    return null;
  }
  
  
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={styles.chat}>
        <GiftedChat 
        messages={messages} 
        onSend={newMessages => onSend(newMessages)} 
        user={{_id: 1}} 
        renderBubble={renderBubble} 
        renderInputToolbar={props => renderInputToolbar(props)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        />

        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
      
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chat: {
    flex: 1,
    width: '100%',
    padding: '5%'
  },
  textBar: {
    borderRadius: 20,
    opacity: 0.8
  },
  map: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3
  }
}

