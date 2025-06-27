import { View , Text, TextInput, Pressable, } from "react-native";
import { Link, Redirect } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Signin (){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const loginUsers = async() => {
        const data = {email, password};
          if(!data.email || !data.password) {
            setError("failed to read email or password")
            setTimeout(()=>{
                setError("")
            },3000);
          }
        try {
            const res = await fetch("http://localhost:3000/api/user/signin", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
             });
             if(!res.ok) {
                setError("cant connect to server")
                setTimeout(()=>{
                 setError("")
                },3000);
             }
            
            const response = await res.json();
            const token = response.token;
            await AsyncStorage.setItem("user-token", token);
            console.log(token)
            setToken(token);

        } catch (error) {
          console.log(error);
        }
     
    }
    return (
        <View className="mx-2 w-full justify-center items-center ">
            <View className="flex items-center justify-center mt-4 mb-20">
            <Text className="text-my-color text-xl">LiftNRecord</Text>
          </View>
          <View className="">
          <View className="flex gap-4"> 
            <TextInput placeholder="Email" className="border border-my-color rounded-lg w-[183px] h-9 pl-2" value={email} onChangeText={(text)=> setEmail(text)}/>
            <TextInput placeholder="password" className="border border-my-color rounded-lg w-[183px] h-9 pl-2" value={password} onChangeText={(text)=> setPassword(text)}/>
          </View>
         <Pressable className="border rounded-lg h-9 mt-5 flex justify-center items-center border-my-color bg-my-color" onPress={loginUsers}>
            <Text className="text-white">Signin</Text>
         </Pressable>
         <View className="mt-4 flex flex-cols gap-3">
         <Text className="text-center text-my-color">or</Text> 
         <View className="flex flex-row gap-1 justify-center items-center">
         <Link href="/" className="border rounded-full w-[60px] text-center border-my-color text-my-color">Signup</Link>
         <Text>to get started</Text>
         </View>
         </View>
         {error && <Text>{error}</Text>}
         </View>
         {token && <Redirect href="/(logs)/home" />}
        </View>
    )

}