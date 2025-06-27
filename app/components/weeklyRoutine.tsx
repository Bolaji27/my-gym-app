import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Routine() {
  const [error, setError] = useState("");
  const [routine, setRoutine] = useState(false);
  const [weeklyRoutine, setWeeklyRoutine] = useState({
    monday: {
      day: "Monday",
      workout: "",
    },
    tuesday: {
      day: "Tuesday",
      workout: "",
    },
    wednesday: {
      day: "Wednesday",
      workout: "",
    },
    thursday: {
      day: "Thursday",
      workout: "",
    },
    friday: {
      day: "Friday",
      workout: "",
    },
    saturday: {
      day: "Saturday",
      workout: "",
    },
    sunday: {
      day: "Sunday",
      workout: "",
    },
  });

  const OpenRoutine = () => {
    setRoutine((prev) => !prev);
  };

  // useEffect(()=>{
  //   const showToken = async()=> {
  //  const token =  await AsyncStorage.getItem("user-token");
  //  console.log(token)
  //   }
  //   showToken()
  // },[])

  const closeRoutine = async () => {
    if (routine === true) {
      try {
        const token = await AsyncStorage.getItem("user-token");
        if(!token) {
          setError("no token, cant send data")
          return;
        }
        const data = {
          mondaySchema:{
            day:weeklyRoutine.monday.day,
            workout:weeklyRoutine.monday.workout
          },
          tuesdaySchema:{
            day:weeklyRoutine.tuesday.day,
            workout:weeklyRoutine.tuesday.workout
          },
          wednesdaySchema:{
            day:weeklyRoutine.wednesday.day,
            workout:weeklyRoutine.wednesday.workout
          },
          thursdaySchema:{
            day:weeklyRoutine.thursday.day,
            workout:weeklyRoutine.thursday.workout
          },
          fridaySchema: {
            day:weeklyRoutine.friday.day,
            workout:weeklyRoutine.friday.workout
          },
          saturdaySchema: {
            day:weeklyRoutine.saturday.day,
            workout :weeklyRoutine.saturday.workout
          },
          sundaySchema: {
            day:weeklyRoutine.sunday.day,
            workout:weeklyRoutine.sunday.workout
          },
        }
        const res = await fetch("http://localhost:3000/api/routine", {
          method:"POST",
          headers:{"Content-Type":"application/json",
            "Authorization":`Bearer ${token}`,
          },
          body:JSON.stringify(data),
        });
        if (!res.ok) {
          const errorData = await res.json();
          console.log('failed request', errorData)
          setError("failed to send data");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
        await res.json();
      } catch (error) {
        console.log(error);
      }
    }
    setRoutine((prev) => !prev);
  };

  useEffect(()=> {
    const getAllWorkout = async() => {
      try {
        const token = await AsyncStorage.getItem("user-token");
        if(!token) {
          console.log('Authentication failed');
          return;
        }
        const response = await fetch("http://localhost:3000/api/routine/getWorkout", {
          method:"GET",
          headers:{ "Content-type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          }
         );

         if(!response.ok) {
          console.log('error failed fetching all routines');
          return ;
         }
         const res = await response.json();
        
         setWeeklyRoutine((prev)=>({ 
          ...prev,
          monday:{...prev.monday,workout:res.monday},
          tuesday:{...prev.tuesday,workout:res.tuesday},
          wednesday: {...prev.wednesday,workout:res.wednesday},
          thursday: {...prev.thursday,workout:res.thursday},
          friday: {...prev.friday,workout:res.friday},
          saturday:{...prev.saturday,workout:res.saturday},
          sunday: {...prev.sunday,workout:res.sunday}
         }));
        
      } catch (error) {
        console.log(error);
      }
    }
  getAllWorkout();
  }, [])
    
    


  return (
    <View className="mt-10 ">
      <Text>{error}</Text>
      <View className="justify-center items-center rounded-md h-[30px] mb-5 bg-my-color">
        <Text className=" text-center text-white">Weekly Routine</Text>
      </View>
      <View className="h-[306px] gap-2 px-[2px] border rounded-md border-my-color">
        <View className="flex flex-row gap-4 px-[2px] py-[2px] h-[36px] items-center ">
          <Text className="w-[72px] text-xs">{weeklyRoutine.monday.day}</Text>
          {routine === false ? (
            <Text className="border flex-1 h-full pl-2 flex pt-1 ">
              {weeklyRoutine.monday.workout}
            </Text>
          ) : (
            <TextInput
              value={weeklyRoutine.monday.workout}
              className="border flex-1 h-full border-my-color px-1 "
              onChangeText={(text) =>
                setWeeklyRoutine((prev) => ({
                  ...prev,
                  monday: { ...prev.monday, workout: text },
                }))
              }
            />
          )}
        </View>
        <View className="flex flex-row gap-4 px-[2px] py-[2px] h-[36px] items-center ">
          <Text className="w-[72px] text-xs">{weeklyRoutine.tuesday.day}</Text>
          {routine === false ? (
            <Text className="border flex-1 h-full pl-2 flex pt-1 ">
              {weeklyRoutine.tuesday.workout}
            </Text>
          ) : (
            <TextInput
              value={weeklyRoutine.tuesday.workout}
              className="border flex-1 h-full border-my-color px-1 "
              onChangeText={(text) =>
                setWeeklyRoutine((prev) => ({
                  ...prev,
                  tuesday: { ...prev.tuesday, workout: text },
                }))
              }
            />
          )}
        </View>
        <View className="flex flex-row gap-4 px-[2px] py-[2px] h-[36px] items-center ">
          <Text className="w-[72px] text-xs">
            {weeklyRoutine.wednesday.day}
          </Text>
          {routine === false ? (
            <Text className="border flex-1 h-full pl-2 flex pt-1">
              {weeklyRoutine.wednesday.workout}
            </Text>
          ) : (
            <TextInput
              value={weeklyRoutine.wednesday.workout}
              className="border flex-1 h-full border-my-color px-1 "
              onChangeText={(text) =>
                setWeeklyRoutine((prev) => ({
                  ...prev,
                  wednesday: { ...prev.wednesday, workout: text },
                }))
              }
            />
          )}
        </View>
        <View className="flex flex-row gap-4 px-[2px] py-[2px] h-[36px] items-center ">
          <Text className="w-[72px] text-xs">{weeklyRoutine.thursday.day}</Text>
          {routine === false ? (
            <Text className="border flex-1 h-full pl-2 flex pt-1">
              {weeklyRoutine.thursday.workout}
            </Text>
          ) : (
            <TextInput
              value={weeklyRoutine.thursday.workout}
              className="border flex-1 h-full border-my-color px-1 "
              onChangeText={(text) =>
                setWeeklyRoutine((prev) => ({
                  ...prev,
                  thursday: { ...prev.thursday, workout: text },
                }))
              }
            />
          )}
        </View>
        <View className="flex flex-row gap-4 px-[2px] py-[2px] h-[36px] items-center ">
          <Text className="w-[72px] text-xs">{weeklyRoutine.friday.day}</Text>
          {routine === false ? (
            <Text className="border flex-1 h-full pl-2 flex pt-1">
              {weeklyRoutine.friday.workout}
            </Text>
          ) : (
            <TextInput
              value={weeklyRoutine.friday.workout}
              className="border flex-1 h-full border-my-color px-1 "
              onChangeText={(text) =>
                setWeeklyRoutine((prev) => ({
                  ...prev,
                  friday: { ...prev.friday, workout: text },
                }))
              }
            />
          )}
        </View>
        <View className="flex flex-row gap-4 px-[2px] py-[2px] h-[36px] items-center ">
          <Text className="w-[72px] text-xs">{weeklyRoutine.saturday.day}</Text>
          {routine === false ? (
            <Text className="border flex-1 h-full pl-2 flex pt-1 ">
              {weeklyRoutine.saturday.workout}
            </Text>
          ) : (
            <TextInput
              value={weeklyRoutine.saturday.workout}
              className="border flex-1 h-full border-my-color px-1 "
              onChangeText={(text) =>
                setWeeklyRoutine((prev) => ({
                  ...prev,
                  saturday: { ...prev.saturday, workout: text },
                }))
              }
            />
          )}
        </View>
        <View className="flex flex-row gap-4 px-[2px] py-[2px] h-[36px] items-center ">
          <Text className="w-[72px] text-xs">{weeklyRoutine.sunday.day}</Text>
          {routine === false ? (
            <Text className="border flex-1 h-full pl-2 flex pt-1 ">
              {weeklyRoutine.sunday.workout}
            </Text>
          ) : (
            <TextInput
              value={weeklyRoutine.sunday.workout}
              className="border flex-1 h-full border-my-color px-1 "
              onChangeText={(text) =>
                setWeeklyRoutine((prev) => ({
                  ...prev,
                  sunday: { ...prev.sunday, workout: text },
                }))
              }
            />
          )}
        </View>
      </View>
      {routine === false && (
        <TouchableOpacity
          onPress={OpenRoutine}
          className="mt-3 self-end mb-5 mr-2"
        >
          <FontAwesome name="edit" size={24} color="#A18D8D" />
        </TouchableOpacity>
      )}
      {routine === true && (
        <TouchableOpacity
          onPress={closeRoutine}
          className="mt-3 self-end mb-5 mr-2"
        >
          <FontAwesome name="save" size={24} color="#A18D8D" />
        </TouchableOpacity>
      )}
    </View>
  );
}
