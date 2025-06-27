import React, { useEffect } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { Link } from "expo-router";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Logs() {
  interface LogType {
    dateDay: string;
    dateMonth: string;
    dateYear: string;
    workout: string;
    activities: string[];
    note: string[];
  }
  const [logs, setLogs] = useState<LogType[]>([]);
  const [error, setError] = useState("");
  const selectedActvities: string[] = ["inlcine", "decline"];

  useEffect(() => {
    const GetRoutineActivities = async () => {
      try {
        const token = await AsyncStorage.getItem("user-token");
        if (!token) {
          setError("authentication failed");
        }

        const response = await fetch(
          "http://localhost:3000/api/routine/GetAllRoutines",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          setError("failed, server error");
        }
        const res = await response.json();
        const days = [
          "sundaySchema",
          "mondaySchema",
          "tuesdaySchema",
          "wednesdaySchema",
          "thursdaySchema",
          "fridaySchema",
          "saturdaySchema",
        ];
        const dateFun = new Date();
        const todayDate = days[dateFun.getDay()];
        const schemaType = res[todayDate];

        const updatedDate = new Date(schemaType.updatedAt);

        const newLog = {
          dateDay: String(updatedDate.getDate()).padStart(2, "0"),
          dateMonth: String(updatedDate.getMonth() + 1).padStart(2, "0"),
          dateYear: String(updatedDate.getFullYear()).slice(-2),
          workout: schemaType.workout,
          activities: schemaType.activity,
          note: schemaType.note,
        };

        setLogs((prev) => [...prev, newLog]);
      } catch (error) {
        console.log(error);
        setError(`failed to fetch, ${error}`);
      }
    };
    GetRoutineActivities();
  }, []);

  return (
    <View className="mx-2">
      <View className="flex flex-row items-center mb-[30px] w-full gap-4">
        <Link
          className="text-[16px] flex-1  h-[26px] text-center text-my-color"
          href="/home"
        >
          LiftNRecord
        </Link>
        <View className=" border rounded-xl flex-1 justify-center items-center h-[36px] border-my-color ">
          <Link href="/gains" className="text-xs text-center text-my-color">
            GainsWBriez
          </Link>
        </View>
        <View className="flex-1 flex-row gap-3  h-[36px] items-center ">
          <FontAwesome5
            name="dumbbell"
            size={12}
            className="text-white"
            color="#A18D8D"
          />
          <View className="border rounded-xl justify-center items-center flex-1 h-[36px] bg-my-color  ">
            <Link href="/(logs)/allLogs" className="text-xs text-white">
              View Log
            </Link>
          </View>
        </View>
        <View className=" flex-1 items-center justify-center">
          <FontAwesome name="user" size={22} color="#A18D8D" />
        </View>
      </View>
      <View className="flex flex-row h-[30px] gap-2 ">
        <View className="flex-1 h-full bg-my-color rounded-md items-center justify-center">
          <Text className="text-white font-semibold text-lg">Workout Logs</Text>
        </View>
        <Pressable className="flex-1 text-center border rounded-md h-full flex items-center justify-center  ">
          <Link href="/(logs)/allLogs">All Logs</Link>
        </Pressable>
      </View>
      <View className="border border-my-color rounded-md flex flex-row h-[32px] items-center justify-center mt-8 px-2">
        <TextInput placeholder="search" className="flex-1" />
        <FontAwesome name="search" size={20}  color="#A18D8D"/>
      </View>
      <View className="flex flex-row gap-2 mt-5">
        <View className="w-[88px] flex-1 flex-row border rounded-md border-my-color h-[28px]">
          <Text className="flex-1 text-center pt-1 my-auto text-base font-bold">
            {String(new Date().getDay()).padStart(2, "0")}
          </Text>
          <Text className="flex-1 flex text-center pt-1 border-l border-my-color my-auto text-base font-bold">
            {String(new Date().getMonth()).padStart(2, "0")}
          </Text>
          <Text className="flex-1 text-center pt-1 border-l border-my-color my-auto text-base font-bold">
            {String(new Date().getFullYear()).slice(-2)}
          </Text>
        </View>
        <View className="flex-1 border rounded-md h-[28px] border-my-color">
          <Text className="text-center my-auto font-bold text-base text-my-color">{logs[0]?.workout || "Workout"}</Text>
        </View>
      </View>
      {logs.some((log) => log.activities.length > 0) ? (
        logs.map((log, index) => (
          <View key={index} className="mt-8 border rounded-md p-2 border-my-color">
            <View className="mb-2">
              <Text className="text-center text-base border border-my-color bg-my-color text-white rounded-md h-[28px] font-bold ">{log.activities}</Text>
            </View>
            <View className="flex flex-row gap-4 my-3">
                <Text className="text-my-color">{log.dateDay}</Text>
                <Text className="text-my-color">{log.dateMonth}</Text>
                <Text className="text-my-color">{log.dateYear}</Text>
                  </View>
            <View>
              <Text className="h-40 border  border-my-color rounded-md mb-2 pt-5 pl-2 font-bold">{log.note}</Text>
              <View className="flex flex-row justify-between">
                <FontAwesome name='heart' color="#A18D8D"/>
                <FontAwesome name='trash' size={16} color="#A18D8D"/>
                {/* <FaRegHeart />
                <RiDeleteBin6Line /> */}
              </View>
            </View>
          </View>
        ))
      ) : (
        <View className="w-full mt-5">
          <Text className="text-center">No logs recorded</Text>
        </View>
      )}
    
      {error && (
        <View>
          <Text>{error}</Text>
        </View>
      )}
    </View>
  );
}
