import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, Redirect } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Routine from "../components/weeklyRoutine";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [goal, setGoal] = useState<null | string>("");
  const [workout, setWorkout] = useState("");
  const [activity, setActivity] = useState("");
  const [note, setNote] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalGoal, setModalGoal] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [resMessage, setResMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [name,setName] = useState('name');

  const modalEditGoal = () => {
    setModalGoal(true);
  };

  const clickToOpenModal = () => {
    setOpenModal((prev) => !prev);
  };

  useEffect(()=>{
const getUserInfo = async() => {
  try {
    const token = await AsyncStorage.getItem("user-token");
    if(!token){
      setError("cant update page");
      setTimeout(() => {
        setError('')
      },3000);
    }
    const res = await fetch("http://localhost:3000/api/user",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      }
  });
  if(!res.ok) {
    setError('bad network');
    setTimeout(()=>{
   setError("")
    },3000)
  }
  const response = await res.json();
  console.log(response)
  setImage(response.profilePic);
  setGoal(response.goal);
  setName(response.name)
  
  } catch (error) {
    console.log(error)
  }
}
getUserInfo();
  },[]);

  useEffect(()=>{
    const getWorkout = async () => {
     try {
      const token = await AsyncStorage.getItem("user-token");
      console.log(token);
      if(!token) {
        return console.log('no token');
      }
      const res = await fetch("http://localhost:3000/api/routine", {
        method: "GET",
        headers:{"Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if(!res.ok) {
        return console.log("server error")
      }
      const response = await res.json();
      setWorkout(response.workout)
     } catch (error) {
      console.log(error)
     }
    }
    getWorkout();
  },[])

const updateRoutine = async () => {
  if (!activity || !note) {
    setError("no activity or note")
    return ;
  }
   const token = await AsyncStorage.getItem("user-token");
   if(!token){
    setError("no token")
    return ;
   }
   try {

    console.log(activity, note)

    const res = await fetch("http://localhost:3000/api/routine", {
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      }, 
      body:JSON.stringify({activity, note})
    });
  
    if(!res.ok){
      setError('failed to send')
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
   const message = await res.json();
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000);
    setActivity('');
    setNote('');
    
   } catch (error) {
     console.log(error)
   }

}


  const getProfilePic = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      const token = await AsyncStorage.getItem("user-token");
      const res = await fetch("http:192.168.1.101:3000/api/user/profilePic", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profilePic: uri }),
      });
      if (!res.ok) {
        setError("failed to send image");
        setTimeout(() => {
          setError("");
        }, 3000);
        return error;
      }

      const response = await res.json();
      setResMessage(response.message);
    }
  };

  const submitLogOut = async () => {
    const token = await AsyncStorage.getItem("user-token");
    if (token) {
      await AsyncStorage.removeItem("user-token");
      setRedirect(true);
    }
    return;
  };
  const today = new Date();

const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const year = String(today.getFullYear()).slice(-2); // Get last two digits of the year

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekday = weekdays[today.getDay()];
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="mx-2"
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex flex-row items-center mb-[30px] w-full gap-4">
          <Text className="text-[16px] flex-1  h-[26px] text-center text-my-color">
            LiftNRecord
          </Text>
          <View className=" border rounded-xl flex-1 justify-center items-center h-[36px] border-my-color ">
            <Link href="/gains" className="text-xs text-center text-my-color">
              GainsWBriez
            </Link>
          </View> 
          <View className="flex-1 flex-row gap-3  h-[36px] items-center ">
            <FontAwesome5 name="dumbbell" size={12} color="#A18D8D" />
            <View className="border rounded-xl justify-center items-center flex-1 h-[36px] bg-my-color  ">
              <Link href="/(logs)/recentLogs" className="text-xs text-white">
                View Log
              </Link>
            </View>
          </View>

          {image === null ? (
            <Pressable
              className="flex-1 items-center justify-center"
              onPress={clickToOpenModal}
            >
              <FontAwesome name="user" size={22} color="#A18D8D" />
            </Pressable>
          ) : (
            <Pressable onPress={clickToOpenModal}>
              <View className="flex-1 items-center justify-center">
                <Image
                  source={{ uri: image }}
                  className="w-[32px] h-[32px] rounded-full"
                />
              </View>
            </Pressable>
          )}

          {openModal && (
            <Modal
              transparent={true}
              animationType="fade"
              visible={openModal}
              onRequestClose={() => setOpenModal(false)}
            >
              <View className="w-[60%]  border h-[25%] mx-auto bg-my-color my-auto rounded-lg border-my-color px-2">
                <Pressable
                  onPress={() => setOpenModal(false)}
                  className="w-full mb-4"
                >
                  <Entypo
                    size={24}
                    name="cross"
                    className="flex justify-end"
                    color="white"
                  />
                </Pressable>
                <Pressable
                  className="flex flex-row gap-4 justify-center items-center mx-auto"
                  onPress={getProfilePic}
                >
                  <View className="border w-[26px] flex justify-center items-center h-[32px] border-white bg-my-color rounded-s-md">
                    <FontAwesome name="plus" size={20} color="white" />
                  </View>
                  <View className="flex-1 w-[68px]">
                    <Text className=" text-white ">Add Display Picture</Text>
                  </View>
                </Pressable>
                <View className="flex justify-center items-center mt-8 text-lg w-full bg-white ">
                  <Text className=" text-my-color">Workout Plan</Text>
                </View>

                <View className="flex flex-row gap-2 px-2 mt-5 bg-white h-[32px] justify-center items-center">
                  <Text className="flex-1 font-bold text-my-color">Goal</Text>
                  {modalGoal === false ? (
                    <Text className="flex-1 text-my-color">GoalsSet</Text>
                  ) : (
                    <TextInput
                      placeholder="Edit"
                      className="border rounded-md h-full flex-1 "
                    />
                  )}
                  {modalGoal === false ? (
                    <Pressable onPress={modalEditGoal}>
                 <Text>{" "}</Text> 
                      <FontAwesome name="edit" size={20} color="#A18D8D" />
                    </Pressable>
                  ) : (
                    <Pressable onPress={() => setModalGoal(false)}>
                    <Text>{" "}</Text> 
                      <FontAwesome
                        name="save"
                        size={20}
                        className="flex-1"
                        color="#A18D8D"
                      />
                    </Pressable>
                  )}
                </View>
                <Pressable onPress={submitLogOut} className="mx-auto">
                  <View className=" border rounded-md bg-my-color  mt-4 flex justify-center items-center h-[30px] w-[80px] border-white">
                    <Text className="text-white">Log out</Text>
                  </View>
                </Pressable>
                <Text>{error}</Text>
                <Text>{resMessage}</Text>
              </View>
            </Modal>
          )}
        </View>

        <Text className=" mx-auto text-xs mb-10 text-center">
          Welcome {name}
        </Text>

        <View className="flex-col gap-2">
          <View className="flex flex-row items-center justify-center border border-my-color rounded-md h-[30px]">
            <Text className="w-[100px] text-center text-my-color border-r border-my-color">Goal</Text>
           <Text className="flex-1 pl-2">{!goal ? "goal" : `${goal}` } </Text>
          </View>
          <View className="flex flex-row items-center justify-center border border-my-color rounded-md h-[32px]">
            <Text className="w-[100px] text-center  text-my-color border-r border-my-color">Workout</Text>
            <Text className="flex-1 pl-2">{workout ?` ${workout} day `: "Workout"}</Text>
          </View>
          <View className="flex flex-row  gap-2 h-[28px]">
            <View className="flex-1 flex-row  border border-my-color rounded-md justify-center items-center">
              <Text className="flex-1 text-center">{day}</Text>
              <View className="flex-1 border-l">
                <Text className="text-center">{month}</Text>
              </View>
              <View className="flex-1 border-l">
                <Text className="text-center">{year}</Text>
              </View>
            </View>
            <View className="flex-1 border border-my-color rounded-md justify-center items-center">
              <Text>{weekday}</Text>
            </View>
          </View>
          <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="flex-1"
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex gap-5 flex-col">
            <View className="border rounded-md px-4 text-black h-[35px] flex justify-center items-center  ">
              <TextInput
                placeholder="what are you working on ?"
                className="text-md h-full"
                value={activity}

                onChangeText={(text)=>setActivity(()=>text)}
              />
            </View>
           
                <TextInput
                  placeholder="Note"
                  className="border rounded-md text-sm h-[116px] pl-2 "
                  multiline={true}
                  textAlignVertical="top"
                  value={note}
                  onChangeText={(text)=> setNote(()=> text)}
                />
            <TouchableOpacity className=" rounded-md h-[34px] flex justify-center items-center bg-my-color w-[88px] mx-auto " onPress={updateRoutine}>
              <Text className="text-white">Add</Text>
            </TouchableOpacity>
            <Text className="text-black">{error}</Text>
          </View>
          </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
        <Routine />
        {redirect && <Redirect href="/" />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
