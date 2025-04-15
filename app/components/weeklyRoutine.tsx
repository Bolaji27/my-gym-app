import { View, Text, TextInput, Pressable, TouchableOpacity } from "react-native";
import { FontAwesome} from '@expo/vector-icons';
import { useState } from "react";
export default function Routine () {
    const [routine, setRoutine] = useState(false);
const data = {
    monday : '',
   tuesday: '',
   wednesday:'',
   thursday: '',
   friday: '',
   saturday: '',
   sunday:''
};
    const OpenRoutine = () => {
        setRoutine(prev => !prev);
    }
    return (
  <View>
      <View className="justify-center items-center rounded-md h-[30px] mb-5 bg-my-color">
        <Text className=" text-center text-white">Weekly Routine</Text>
      </View>
  <View className="h-[306px] gap-2 px-[2px] border rounded-md border-my-color">
    <View className='flex flex-row gap-4 px-[2px] py-[2px] h-[36px] items-center '>
      <Text className="w-[72px] text-xs">Monday</Text>
      {routine === false ? <Text className="border flex-1 h-full ">{data.monday}</Text> : <TextInput value={data.monday}  className="border flex-1 h-full border-my-color px-1 "/> }
    </View>
    <View className='flex flex-row gap-4 px-[2px] py-[2px] h-[36px] items-center '>
      <Text className="w-[72px] text-xs">Tuesday</Text>
     {routine === false ? <Text className="border flex-1 h-full ">{data.tuesday}</Text> : <TextInput value={data.tuesday}  className="border flex-1 h-full border-my-color px-1 "/> }
    </View>
    <View className='flex flex-row gap-4 px-[2px] py-[2px] h-[36px] items-center '>
      <Text className="w-[72px] text-xs">Wednesday</Text>
      {routine === false ? <Text className="border flex-1 h-full ">{data.wednesday}</Text> : <TextInput value={data.wednesday}  className="border flex-1 h-full border-my-color px-1 "/> }
    </View>
    <View className='flex flex-row gap-4 px-[2px] py-[2px] h-[36px] items-center '>
      <Text className="w-[72px] text-xs">Thursday</Text>
      {routine === false ? <Text className="border flex-1 h-full ">{data.thursday}</Text> : <TextInput value={data.thursday}  className="border flex-1 h-full border-my-color px-1 "/> }
    </View>
    <View className='flex flex-row gap-4 px-[2px] py-[2px] h-[36px] items-center '>
      <Text className="w-[72px] text-xs">Friday</Text>
      {routine === false ? <Text className="border flex-1 h-full ">{data.friday}</Text> : <TextInput value={data.friday}  className="border flex-1 h-full border-my-color px-1 "/> }
    </View>
    <View className='flex flex-row gap-4 px-[2px] py-[2px] h-[36px] items-center '>
      <Text className="w-[72px] text-xs">Saturday</Text>
      {routine === false ? <Text className="border flex-1 h-full ">{data.saturday}</Text> : <TextInput value={data.saturday}  className="border flex-1 h-full border-my-color px-1 "/> }
    </View>
    <View className='flex flex-row gap-4 px-[2px] py-[2px] h-[36px] items-center '>
      <Text className="w-[72px] text-xs">Sunday</Text>
      {routine === false ? <Text className="border flex-1 h-full ">{data.sunday}</Text> : <TextInput value={data.sunday}  className="border flex-1 h-full border-my-color px-1 "/> }
    </View>
  </View>
  <TouchableOpacity onPress={OpenRoutine} className="mt-3 self-end">
        <FontAwesome name={routine === false ? "edit" : "save"} size={20} />
      </TouchableOpacity>


    </View>
    )
    ;
}