import React from 'react';
import {View, Text, Pressable, TextInput} from 'react-native'
import { Link } from 'expo-router';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';

export default function ALLLogs() {
  interface LogType {
        dateDay: string,
        dateMonth: string,
        dateYear: string,
        workout: string,
        activities: string,
        note: string,
    }
    const [logs, setLogs] = useState<LogType[]>([]);
    const selectedActvities: string[] = ['inlcine', 'decline']

    return (
        <View className='mx-2'>
             <View className='flex flex-row items-center mb-[30px] w-full gap-4'>
      <Link className='text-[16px] flex-1  h-[26px] text-center text-my-color' href="/home">LiftNRecord</Link>
      <View className=' border rounded-xl flex-1 justify-center items-center h-[36px] border-my-color '>
      <Link href="/gains" className='text-xs text-center text-my-color' >GainsWBriez</Link>
      </View>
      <View className='flex-1 flex-row gap-3  h-[36px] items-center '>
      <FontAwesome5 name="dumbbell" size={12} className='text-white'/>
      <View className='border rounded-xl justify-center items-center flex-1 h-[36px] bg-my-color  '>
      <Link href="/(logs)/recentLogs" className='text-xs text-white'>View Log</Link>
      </View>
      </View>
      <View className=' flex-1 items-center justify-center'>
        <FontAwesome name="user" size={22}/>
      </View>
    </View>
           <View className='flex flex-row h-[30px] gap-2 '>
           <Pressable className='flex-1 text-center border rounded-md h-full flex items-center justify-center  '><Link href="/(logs)/recentLogs">Recent Logs</Link></Pressable>
           <View className='flex-1 h-full bg-my-color rounded-md items-center justify-center'>
  <Text className='text-white text-xs'>All Logs</Text>
</View>          
           </View>
           <View className='border border-my-color rounded-md flex flex-row h-[32px] items-center justify-center mt-8 px-2'> 
            <TextInput placeholder='search' className='flex-1'/>
            <FontAwesome name='search' size={20} className='text-my-color'/>
           </View>
     {logs.length > 0?logs.map((log, index)=> (<View className='mt-10 flex gap-2'> 
        <View className='flex flex-row h-[28px] gap-2'> 
       <View className='w-[88px] flex flex-row border rounded-sm' > 
        <Text className='flex-1 flex justify-center items-center'>DD</Text>
        <Text className='flex-1 flex justify-center items-center border-l'>MM</Text>
        <Text className='flex-1 flex justify-center items-center border-l'>YY</Text>
       </View>
       <Text className='flex-1 flex justify-center items-center border rounded-sm'>workout</Text>
       <SelectDropdown 
       data={selectedActvities}
       onSelect={(selectedItem, index) => (<Text className='text center'>{selectedItem}</Text>) }
    renderButton={(selectedItem,isOpened)=> (
        <View className='border rounded-md pl-2 flex-1 flex justify-center items-center'> 
            <Text>{selectedItem? selectedItem: 'Activity'}</Text>
        </View>)}
    renderItem={(selectedItem, isSelected)=> (
        <View className='border rounded-md pl-2 flex-1'> 
            <Text>{selectedItem}</Text>
        </View>
    )}/>
       </View>
       <TextInput placeholder='note' className='border rounded-md h-[48px]' textAlignVertical="top" multiline={true}/>
       <View className='flex flex-row justify-between items-center'> 
        <FontAwesome name='heart' className='flex-start flex-1 text-my-color' size={16}/>
       <View className=' flex items-center justify-end'><FontAwesome name='trash' className='flex-1 text-my-color'  size={16}/> </View>
       </View>

     </View>)): <Text className='mt-10 text-center text-my-color'>No Active Logs </Text>}
        </View>
    )
}