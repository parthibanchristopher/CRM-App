import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    Button,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DATA_KEY } from "../config";
import RoundButton from "../components/RoundButton";

export default function AddCustomerScreen({ navigation }) {
    const [inputName, setInputName] = useState("");
    const [inputNumber, setInputNumber] = useState("");
    const [inputLocation, setInputLocation] = useState("");

    function handleInputName(name) {
        setInputName(name);
    }

    function handleInputNumber(number) {
        setInputNumber(number);
    }

    function handleInputLocation(location) {
        setInputLocation(location);
    }

    async function addEntry() {
        if (inputName === "" || inputNumber === "" || inputLocation === "") return;

        let entries = [];

        try {
            entries = await AsyncStorage.getItem(DATA_KEY);
        } catch (error) { }

        if (entries) {
            //load existing data
            entries = JSON.parse(entries);

            //append input to it
            entries = [...entries, { inputName, inputNumber, inputLocation }];
        } else {
            //first time usage
            //i.e. an array with input as single entry
            entries = [input];
        }

        //save entries using AsyncStorage
        entries = JSON.stringify(entries);
        try {
            console.log(entries)
            await AsyncStorage.setItem(DATA_KEY, entries);
        } catch (error) {
            Alert.alert("Unable to save the entry. Please try again");
            return;
        }

        setInputName("");
        setInputNumber("");
        setInputLocation("");
        navigation.navigate("CRM App");
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={styles.container}
            >
                <TextInput
                    style={styles.textInput}
                    value={inputName}
                    onChangeText={handleInputName}
                    placeholder="Enter Name"
                />

                <TextInput
                    style={styles.textInput}
                    value={inputNumber}
                    onChangeText={handleInputNumber}
                    placeholder="Enter Mobile Number"
                />

                <TextInput
                    style={styles.textInput}
                    value={inputLocation}
                    onChangeText={handleInputLocation}
                    placeholder="Enter Location"
                />

                <RoundButton title="Add" onPress={addEntry} color="grey" />
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
        marginVertical: 40,
        marginHorizontal: 20,
    },
    textInput: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        minHeight: 80,
        backgroundColor: "white",
        fontSize: 15,
        marginBottom: 10,
    },
    entryButton: {
        flex: 1,
        justifyContent: "center",
    },
});
