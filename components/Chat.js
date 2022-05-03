import { View, Text, Platform, KeyboardAvoidingView  } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react';
import { GiftedChat, Bubble, InputToolbar, Actions } from 'react-native-gifted-chat';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, onSnapshot, where, query, orderBy } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import './fontawesome';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnVfMWEnDy7xbpWneNJS1lMcpWX5cJKOs",
  authDomain: "textable-4be18.firebaseapp.com",
  projectId: "textable-4be18",
  storageBucket: "textable-4be18.appspot.com",
  messagingSenderId: "802916814412",
  appId: "1:802916814412:web:5cd4b6d194f0b8e1f52ee9",
  measurementId: "G-XYDGNRCN5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function Chat(props) {
  const [messages, setmessages] = useState([]);
  const [uid, setuid] = useState(0);
  const [newMessage, setnewMessage] = useState({});
  const [isConnected, setisConnected] = useState(true);
  const name = props.route.params.text;
  const color = props.route.params.color;
  const messagesCollectionRef = collection(db, "messages");

  

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
    
    const docRef = await addDoc(messagesCollectionRef, {...messageObj, uid});
    
    return docRef
  }

  useEffect(() => {
    //waits until the uid and the newMessage states have been updated to add a new message
    if ((uid !== 0) && (Object.keys(newMessage).length > 0)) {
      addMessage({...newMessage, uid});
      setnewMessage([]);
    }
  },[newMessage, uid]);

  async function saveMessages() {
    try {
      console.log('saving messages...');

      console.log(JSON.stringify(messages));
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
        
      console.log('successfully saved messages');
    } catch(error) {
      console.log('error in saveMessages: ');
      console.log(error.message);
    }
  }




  async function deleteMessages(message) {
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
    setnewMessage(messages[0]);
    setmessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, []);

  
  
  function renderBubble(props) {
    return <Bubble {...props} wrapperStyle={{ right: 
      { backgroundColor: '#000' }
    }}/>
  }

  function renderInputToolbar(props) {
    return (isConnected) ? <InputToolbar {...props} placeholderTextColor='#000' containerStyle={styles.textBar} /> : null
  } //renderActions={() => (<Actions icon={() => (<FontAwesomeIcon icon="fa-solid fa-paper-plane-top" />)}/>)
  //renderInputToolbar={props => renderInputToolbar(props)}
  
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={styles.chat}>
        <GiftedChat messages={messages} onSend={newMessages => onSend(newMessages)} user={{_id: 1}} renderBubble={renderBubble} 
        renderInputToolbar={props => renderInputToolbar(props)}/>

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
  }
}

