import { View, Text, Pressable, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { Link, Redirect } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function UploadDisplayPic() {
  const [image, setImage] = useState<null | string>("");
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const saveImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveDisplayImage = async ()=> {
    const token = await AsyncStorage.getItem("user-token");
    if(!token) {
         setError("No token")
        setTimeout(()=>{
            setError("")
           },3000)
           return;
    }
     if(!image) {
        setError("no image selected");
        setTimeout(()=>{
        setError("")
        },3000)
     return ;
     }
    try {
        const res = await fetch('http://localhost:3000/api/user/profilePic', {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify({profilePic: image})
           });
           if(!res.ok){
            setError("network error")
            setTimeout(()=>{
                setError("")
               },3000)
               return error;
           }
           const data = await res.json();
           console.log(data);
           return setRedirect(true)

    } catch (error) {
        setError(`network err ${error}`)
        setTimeout(()=>{
         setError("")
        },3000)
    }
  
  }
  return (
    <View className="flex gap-10 justify-center items-center">
      <View className="flex items-center justify-center mt-4">
        <Text className="text-my-color text-xl">LiftNRecord</Text>
      </View>
      <View className="flex justify-center items-center">
        <Text className="h-20"></Text>
        <Pressable
          className="flex flex-cols justify-center items-center border border-my-color rounded-md h-[160px] w-[183px] gap-4"
          onPress={saveImage}
        >
          <AntDesign name="pluscircle" size={24} color="#A18D8D" />
          <Text className="text-my-color">Add display picture</Text>
        </Pressable>
      </View>

      <View className="flex flex-row gap-2 w-[183px] h-[28px] ">
        <View className="flex-1 justify-center items-center border border-my-color rounded-md">
          <Link href="/home" className="text-my-color">
            Skip
          </Link>
        </View>
        <TouchableOpacity className="flex-1 bg-my-color rounded-md justify-center items-center" onPress={saveDisplayImage}>
          <Text className="text-white">Next</Text>
        </TouchableOpacity>
      </View>
      {redirect && <Redirect href="/(logs)/home"/>}
      {error && <Text>{error}</Text>}
    </View>
  );
}
