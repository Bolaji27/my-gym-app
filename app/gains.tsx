import React from "react";
import { View, Text, TextInput } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image } from "react-native";
import likebriez from "../assets/images/likebriez.png";
import { useState } from "react";

export default function Gains() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <View className="mx-2">
      <View className="flex flex-row items-center mb-[30px] w-full gap-4">
        <Link href="/home" className="text-[16px] flex-1  h-[26px] text-center text-my-color">
          LiftNRecord
        </Link>
        <View className=" border rounded-xl flex-1 justify-center items-center h-[36px] border-my-color ">
          <Link href="/gains" className="text-xs text-center text-my-color">
            GainsWBriez
          </Link>
        </View>
        <View className="flex-1 flex-row gap-3  h-[36px] items-center ">
          <FontAwesome5 name="dumbbell" size={12} className="text-white" />
          <View className="border rounded-xl justify-center items-center flex-1 h-[36px] bg-my-color  ">
            <Link href="/(logs)/recentLogs" className="text-xs text-white">
              View Log
            </Link>
          </View>
        </View>
        <View className=" flex-1 items-center justify-center">
          <FontAwesome name="user" size={22} color="#A18D8D" />
        </View>
      </View>
      <View className="flex flex-row w-[88px] gap-1">
        <FontAwesome name="bookmark" size={20} color="#A18D8D" />
        <Text className="flex-1">BookMark</Text>
      </View>

      <View className="flex justify-center items-center flex-row gap-[30px] mt-10">
        <Text>Workout</Text>
        <Text>Like</Text>
        <Text>Briez</Text>
      </View>
      <Image source={likebriez} resizeMode="contain" className="w-full mt-4" />

      <View className="flex flex-row mt-4 gap-2 h-[28px] justify-center items-center">
        <Text className="text-my-color">Find your next workout</Text>
        <View className="flex-1 flex-row items-center border px-1 rounded-md bg-my-color">
          <TextInput
            placeholder="Search"
            className="flex-1 h-[28px] text-sm px-2  text-white"
          />
          <FontAwesome name="search" size={20} color="#fff"/>
        </View>
      </View>
      <View className="flex justify-center items-center w-[88px] h-[22px] border mt-14 bg-my-color rounded-md">
      <Text className="  text-xs text-white ">Chest</Text>
      </View>
     
    </View>
  );
}
