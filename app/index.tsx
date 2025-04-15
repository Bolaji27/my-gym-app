import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome} from '@expo/vector-icons';
import {useState} from 'react';
import {SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Routine from './components/weeklyRoutine';




export default function HomeScreen() {
  const [goal, setGoal] = useState('');
  const [workout, setWorkout] = useState('');
  const [activity, setActivity] = useState('Activity');
  const [note, setNote] = useState('Note');
  return (
    <View className='mx-2 '>
    <View className='flex flex-row items-center mb-[30px] w-full gap-4'>
      <Text className='text-[16px] flex-1  h-[26px] text-center text-my-color'>LiftNRecord</Text>
      <View className=' border rounded-xl flex-1 justify-center items-center h-[36px] border-my-color '>
      <Link href="/gains" className='text-xs text-center text-my-color' >GainsWBriez</Link>
      </View>
      <View className='flex-1 flex-row gap-3  h-[36px] items-center '>
      <FontAwesome5 name="dumbbell" size={12} className='text-white'/>
      <View className='border rounded-xl justify-center items-center flex-1 h-[36px] bg-my-color  '>
      <Link href="/logs" className='text-xs text-white'>View Log</Link>
      </View>
      </View>
      <View className=' flex-1 items-center justify-center'>
        <FontAwesome name="user" size={22}/>
      </View>
    </View>

    <Text className=' mx-auto text-xs mb-10 text-center'>
      Welcome Mr name
    </Text>


  <View className='flex flex-row gap-2 '> 
    <View className='flex-1 gap-5'>
    <View className='flex items-center justify-center border border-my-color rounded-md h-[30px]'>
   <Text className=''>{!goal? "Goals" : goal} </Text>
    </View>
    <View className='flex items-center justify-center border border-my-color rounded-md h-[32px]'>
   <Text>{workout?workout:"Workout"}</Text>
    </View>
    <View className='flex flex-row  gap-2 h-[28px]' > 
      <View className='flex-1 flex-row  border border-my-color rounded-md justify-center items-center'> 
        <Text className='flex-1 text-center'>dd</Text>
        <View className='flex-1 border-l'><Text className='text-center'>mm</Text></View>
        <View className='flex-1 border-l'><Text className='text-center'>yy</Text></View>
      </View>
      <View className='flex-1 border border-my-color rounded-md justify-center items-center'>
      <Text>Day</Text>
      </View>
    </View>

      <View className='flex gap-5 flex-col'>
  <TextInput placeholder="Activity"  className='border rounded-md px-4 text-black text-sm h-[30px] flex ' value={activity} onChangeText={setActivity} />
  <TextInput value={note} className='border rounded-md text-sm h-[116px] pl-2 '  multiline={true}
  textAlignVertical="top" onChangeText={setNote}
  />
  <TouchableOpacity className=' rounded-md h-[34px] flex justify-center items-center bg-my-color '>
    <Text className='text-white' >Add</Text>
     </TouchableOpacity>
     </View>
  </View>
  <View className='flex-1'>
  <Routine/>
  </View>
   
  </View>
    </View>
  );
}

