import {Stack} from "expo-router"
export default function LogLayout() {
    return(
    <Stack>
         <Stack.Screen name="home" />
        <Stack.Screen name="recentLogs" />
        <Stack.Screen name="allLogs" />
    </Stack>
    );
    
}