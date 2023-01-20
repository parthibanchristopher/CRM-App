import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RoundButton({ title, onPress }) {
    return (
        <View style={styles.buttonView}>
            <Pressable
                style={({ pressed }) => [
                    styles.buttonPressable,
                    Platform.OS == "ios" && {
                        opacity: pressed ? 0.5 : 1,
                    },
                ]}
                onPress={onPress}
                android_ripple={{ color: "#AA336A" }}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonView: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        backgroundColor: "#b6b6b6",

        elevation: 8, //shadow for android
        //shadow for iOS
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.25,

        // //for iOS need to be visible to show the shadow
        overflow: Platform.OS == "android" ? "hidden" : "visible",
    },
    buttonPressable: { padding: 10, width: "100%" },
    buttonText: { fontSize: 16, textAlign: "center" },
});
