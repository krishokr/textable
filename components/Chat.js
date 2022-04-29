import { View, Text, Platform, KeyboardAvoidingView  } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, onSnapshot, where, query, orderBy } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
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
  const name = props.route.params.text;
  const color = props.route.params.color;
  const messagesCollectionRef = collection(db, "messages");
  

  useEffect(() => {
    props.navigation.setOptions({ title: name });

    const auth = getAuth();
    let unSubscribe;

    onAuthStateChanged(auth, (user) => {
      
      // if (!user) {
      //   signInAnonymously(auth);
      // } 

      setuid(user.uid);
      setmessages([]); 

      const q = query(messagesCollectionRef, where("uid", "==", user.uid));
      // const ordered = query(q, orderBy("createdAt", "desc"))
      unSubscribe =  onSnapshot(q, onCollectionUpdate);
      
      
    });
    
    
  },[])

  async function onCollectionUpdate(querySnapshot) {

    let collectDocs = [];

    querySnapshot.forEach( doc => {
      let data = doc.data();
      console.log(data);
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
      addMessage({...newMessage, uid})
    }
  },[newMessage, uid]);


  const onSend = useCallback((messages = []) => { 
    setnewMessage(messages[0]);
    setmessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, []);
  
  function renderBubble(props) {
    return <Bubble {...props} wrapperStyle={{ right: 
      { backgroundColor: '#000' }
    }}/>
  }

  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={styles.chat}>
        <GiftedChat messages={messages} onSend={newMessages => onSend(newMessages)} user={{_id: 1}} renderBubble={renderBubble}/>

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
  }
}

