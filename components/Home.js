import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';


//colors: #F7FCFC #95FDE8 #57F3D6 #1EF4BC #FFDE04 #5A5136 #F3AA37
export default function Home(props) {
    const [text, settext] = useState('');
    const [color, setcolor] = useState('#F7FCFC');

    console.log(color);

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.diagonalBoxOne}></View>
      <View style={homeStyles.diagonalBoxTwo}></View>
      <View style={homeStyles.contentContainer}>
        <TextInput style={homeStyles.inputContainer} onChangeText={(text) => settext(text)} placeholder='Enter your name'/>
        <View style={{padding: '10%', marginLeft: 'auto', marginRight: 'auto'}}>
          <Text style={{fontSize: 16, marginLeft: 'auto', marginRight: 'auto'}}>Choose your background color: </Text>
          <View style={{marginTop: '10%', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', width: '80%'}}>

            <TouchableOpacity style={[homeStyles.lightBlue, {borderWidth: (color === '#95FDE8') ? 3: 0}]} onPress={() => setcolor('#95FDE8')}/>

            <TouchableOpacity style={[homeStyles.yellow, {borderWidth: (color === '#FFDE04') ? 3: 0}]} onPress={() => setcolor('#FFDE04')}/>

            <TouchableOpacity style={[homeStyles.brown, {borderWidth: (color === '#5A5136') ? 3: 0}]} onPress={() => setcolor('#5A5136')} />

            <TouchableOpacity style={[homeStyles.green, {borderWidth: (color === '#1EF4BC') ? 3: 0}]} onPress={() => setcolor('#1EF4BC')}/>
          </View>
        </View>
        <Pressable style={homeStyles.button} onPress={() => props.navigation.navigate('Chat', {text, color})}>
          <Text style={homeStyles.text}>Begin chatting</Text>
        </Pressable>
      </View>
      
    </View>
  )  
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  diagonalBoxOne: {
    position: 'absolute',
    height: '50%',
    width: '100%',
    top: 0,
    zIndex: -2,
    backgroundColor: '#95FDE8'
  },
  diagonalBoxTwo: {
    position:'absolute',
    height: '50%',
    width: '100%',
    bottom: 0,
    zIndex: -1,
    backgroundColor: '#FFDE04'
    // transform: [{ skewY: '-11deg' }]
  },
  contentContainer: {
    backgroundColor: '#F7FCFC',
    width: '85%'
  },
  inputContainer: {
    width: '80%',
    fontSize: 40,
    textAlign: 'center',
    borderRadius: 10,
    opacity: 0.8,
    margin: '10%'
  },
  button: {
    backgroundColor: '#5A5136',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    borderRadius: 5,
    padding: '4%',
    margin: '5%',
    opacity: 0.8
  },

  text: {
    fontSize: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#F7FCFC'
  },

  lightBlue: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#95FDE8', 
    marginRight: '5%'
  },

  yellow: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#FFDE04', 
    marginRight: '5%'
  },
  brown: {
    backgroundColor: '#5A5136',
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: '5%'

  },
  green: {
    backgroundColor: '#1EF4BC',
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: '5%'

  }
})
