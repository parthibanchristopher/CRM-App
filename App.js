import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from './components/IconButton';
import AddCustomerScreen from './screens/AddCustomerScreen';
import HomeScreen from './screens/HomeScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "grey",
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="CRM App"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <IconButton
                name="add-circle"
                size={24}
                color="white"
                onPress={() => {
                  navigation.navigate("Add Customers");
                }}
              />
            ),
          })}
        />
        <Stack.Screen name="Add Customers" component={AddCustomerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

