import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { DATA_KEY } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "../components/IconButton";


export default function HomeScreen() {

    const [data, setData] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            readData();
        }
    }, [isFocused]);

    async function readData() {
        //cater for first load
        let entries = [];

        try {
            entries = await AsyncStorage.getItem(DATA_KEY);
            entries = JSON.parse(entries);
        } catch (error) { console.log("error"); console.log(error) }

        setData(entries);
    }

    async function saveData(updatedData) {
        const entries = JSON.stringify(updatedData);
        try {
            await AsyncStorage.setItem(DATA_KEY, entries);
        } catch (error) {
            Alert.alert("Unable to save the entry. Please try again");
        }
    }

    function deleteEntry(index) {
        const newData = [...data.slice(0, index), ...data.slice(index + 1)];
        setData(newData);
        saveData(newData);
    }


    const randomData = [];

    for (let i = 0; i < 8; i++) { randomData.push(`item ${i}`); }

    function renderEntry({ item, index }) {
        return (
            <View key={index} style={styles.customerContainer}>
                <View style={styles.customerContainerText}>
                    <Text style={styles.customerNameText}>
                        {item.inputName}
                    </Text>
                    <Text style={styles.customerDetailsText}>
                        +65 {item.inputNumber}
                    </Text>
                    <Text style={styles.customerDetailsText}>
                        {item.inputLocation}, Singapore
                    </Text>
                </View>

                <View style={styles.customerContainerButton}>
                    <IconButton
                        name="person-remove"
                        size={24}
                        color="red"
                        onPress={() =>
                            Alert.alert("Delete", "Do you want to delete this entry?", [
                                { text: "NO" },
                                {
                                    text: "YES",
                                    onPress: () => {
                                        deleteEntry(index)
                                    }
                                }
                            ])
                        }
                    />
                </View>

            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <FlatList
                data={data}
                renderItem={renderEntry}
                style={styles.flatViewContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    customerContainer: {
        padding: 10,
        margin: 5,
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#a4a4a4",
    },
    flatViewContainer: {
        width: "100%",
        maxHeight: "100%",
    },
    customerNameText: {
        padding: 5,
        flex: 3,
        fontSize: 16,
        fontWeight: "bold"
    },
    customerDetailsText: {
        padding: 5,
        flex: 3,
    },
    customerContainerText: {
        flex: 6,
    },
    customerContainerButton: {
        flex: 1,
        justifyContent: "center",
    },
});