import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { Link } from "expo-router";

export default function HeightNWeight() {
  const [bodyMass, setBodyMass] = useState({
    height: "",
    weight: "",
  });

  const [error, setError] = useState("");

  const [goal, setGoal] = useState("");
  const [redirect, setRedirect] = useState(false);

  const saveHeightWeight = async () => {
    if (!bodyMass.height || !bodyMass.weight || !goal) {
      setError("please fill all");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      const token = await AsyncStorage.getItem("user-token");
      if (!token) {
        setError("token is empty");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/user/heightWeight",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`,
          },
          body: JSON.stringify({
            height: bodyMass.height,
            weight: bodyMass.weight,
            goal,
          }),
        }
      );
      if (!response.ok) {
        setError("failed to update user details");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }

      const res = await response.json();
      console.log(res.updatedUser);
      return setRedirect(true);

     
    } catch (error) {
      console.log(`failed nertwork error ${error}`);
    }
  };

  return (
    <View className="flex flex-col">
      <View className="flex items-center justify-center mt-4">
        <Link href="/" className="text-my-color text-xl">LiftNRecord</Link>
      </View>
      <View className=" flex justify-center items-center flex-col ">
        <View className="h-[100px]"></View>

        <View className=" w-[183px] flex gap-2">
          <View className=" flex flex-row h-8 border border-my-color items-center justify-center gap-1 rounded-md">
            <TextInput
              placeholder="Height"
              className="text-my-color flex-1 h-full pl-1 "
              value={bodyMass.height}
              onChangeText={(text) =>
                setBodyMass((prev) => ({
                  ...prev,
                  height: text,
                }))
              }
            />
            <Text className="text-my-color  pr-1">FT</Text>
          </View>
          <View className="flex flex-row h-8 border border-my-color items-center justify-center gap-1 rounded-md">
            <TextInput
              placeholder="Weight"
              className="text-my-color flex-1 h-full pl-1"
              value={bodyMass.weight}
              onChangeText={(text) => {
                setBodyMass((prev) => ({
                  ...prev,
                  weight: text,
                }));
              }}
            />
            <Text className="text-my-color pr-1">KG</Text>
          </View>
          <View className="flex flex-col gap-2">
            <Text className="text-my-color text-[12px] flex justify-center items-center">
              Select a goal
            </Text>
            <View className="flex flex-row gap-1">
              <TouchableOpacity
                className="flex-1 border-my-color border text-[12px] items-center justify-center h-8 text-my-color rounded-md"
                onPress={() => setGoal("Weight loss")}
              >
                <Text className="text-my-color"> Weight Loss</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 border-my-color border text-[12px] items-center justify-center h-8 text-my-color rounded-md"
                onPress={() => setGoal("Bulky build")}
              >
                <Text className="text-my-color"> Bulky Build </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="flex flex-row items-center justify-center gap-2 border rounded-lg w-[183px] bg-my-color h-[28px] mt-4"
            onPress={saveHeightWeight}
          >
            <Text className="text-white">Next</Text>
            <AntDesign name="arrowright" size={20} color="white" />
          </TouchableOpacity>
        </View>
        {error && (
          <Text className="flex items-center justify-center mt-4 text-my-color">
            {error}
          </Text>
        )}
        {redirect && <Redirect href="/(signup)/picture" />}
      </View>
    </View>
  );
}
