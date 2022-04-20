import { View, Text, Platform, KeyboardAvoidingView  } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';


export default function Chat(props) {
  const [messages, setmessages] = useState([]);
  const name = props.route.params.text;
  const color = props.route.params.color;
  props.navigation.setOptions({title: name});

  useEffect(() => {
      setmessages([
        {
          _id: 1,
          text: 'Welcome to Textable!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          }
        },
        {
          _id: 2,
          text: `${props.route.params.text} has entered the chat.`,
          createdAt: new Date(),
          user: {
            _id: 3,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          }
        }
    ])
  },[]);

  const onSend = useCallback((messages = []) => {
    setmessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  function renderBubble(props) {
    return <Bubble {...props} wrapperStyle={{ right: 
      { backgroundColor: '#000' }
    }}/>
  }
  console.log('messages: ')
  console.log(messages);

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

