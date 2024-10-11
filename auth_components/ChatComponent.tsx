import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type chatScreenProp = NativeStackNavigationProp<RootStackParamList, "Chat">

export function ChatComponent(){
    const navigation = useNavigation<chatScreenProp>();
    return (
        <View>
            <Text>Life </Text>
            <Button title="Go back" onPress={()=>{navigation.goBack();}}/>
        </View>
    )
} 