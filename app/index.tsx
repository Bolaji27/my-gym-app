import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Link } from "expo-router";

const Signup = () => {
  const [error, setError] = useState<null | string>(null);
  const [redirect, setRedirect] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const getAuth = await AsyncStorage.getItem("user-token");
      if (!getAuth) {
        setError("no token attached");
        setTimeout(()=>{
          setError('')
        }, 3000)
        return;
      }
      return setHasToken(true);
    };
    getToken();
  }, []);

  const [dataCollect, setDataCollect] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const submitData = async () => {
    if (
      !dataCollect.firstName ||
      !dataCollect.lastName ||
      !dataCollect.email ||
      !dataCollect.password
    ) {
      return setError("Please fill all the form input");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: dataCollect.firstName,
          lastName: dataCollect.lastName,
          email: dataCollect.email,
          password: dataCollect.password,
        }),
      });
      if (!response.ok) {
        setError("internal server error");
        return;
      }
      const data = await response.json();
      await AsyncStorage.setItem("user-token", data.token);
      console.log(data);
      return setRedirect(true);
    } catch (error) {
      setError("network err");
      console.log(error);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="mx-2 justify-center">
          <View className="flex items-center justify-center mt-4">
            <Text className="text-my-color text-xl">LiftNRecord</Text>
          </View>
          <View className="flex justify-center items-center mt-20">
            <View className="w-[183px] flex gap-8">
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#A18D8D"
                className="border rounded-md h-9 border-my-color text-my-color pl-1"
                value={dataCollect.firstName}
                onChangeText={(text) =>
                  setDataCollect((prev) => ({ ...prev, firstName: text }))
                }
              />
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#A18D8D"
                className="border rounded-md h-9 border-my-color text-my-color pl-1"
                value={dataCollect.lastName}
                onChangeText={(text) =>
                  setDataCollect((prev) => ({ ...prev, lastName: text }))
                }
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#A18D8D"
                className="border rounded-md h-9 border-my-color text-my-color pl-1"
                value={dataCollect.email}
                onChangeText={(text) =>
                  setDataCollect((prev) => ({ ...prev, email: text }))
                }
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#A18D8D"
                className="border rounded-md h-9 border-my-color text-my-color pl-1"
                value={dataCollect.password}
                onChangeText={(text) =>
                  setDataCollect((prev) => ({ ...prev, password: text }))
                }
              />
            </View>

            <TouchableOpacity
              className="flex flex-row items-center justify-center w-[183px] gap-3 mt-8 rounded-full bg-my-color h-10"
              onPress={submitData}
            >
              <Text className="text-white">SignUp</Text>
              <AntDesign name="arrowright" size={24} color="white" />
            </TouchableOpacity>
            {error && <Text className="mt-4 text-xs">{error}</Text>}
            {redirect && <Redirect href="/(signup)/heightWeight" />}
            {hasToken && <Redirect href="/(logs)/home" />}
          </View>
          <View className="flex flex-row gap-2 justify-center mt-5 text-lg">
            <Link href="/signin" className="text-my-color border rounded-full w-[60px] text-center border-my-color">Signin</Link>
            <Text>if you already registered</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Signup;
