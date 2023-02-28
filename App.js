import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContent,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import LoginScreen from "./screens/LoginScreen";
import ProfilParentScreen from "./screens/ProfilParentScreen";
import ProfilEnfantScreen from "./screens/ProfilEnfantScreen";
import DemandeScreen from "./screens/DemandeScreen";
import FAQScreen from "./screens/FAQScreen";
import HistoriqueScreen from "./screens/HistoriqueScreen";
import ProblematiqueScreen from "./screens/ProblematiqueScreen";
import { Entypo } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        style={styles.demandeButton}
        label="Nouvelle demande"
        labelStyle={(color = "#144272")}
        icon={({ focused, color, size }) => (
          <Entypo color={color} size={size} name={"plus"} />
        )}
        onPress={() => props.navigation.navigate("Profil")}
      />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props}></CustomDrawerContent>
      )}
      initialRouteName="Home"
      style={styles.header}
      screenOptions={{
        headerStyle: { backgroundColor: "#144272" },
        headerTintColor: "white",
        headerTitleStyle: {
          color: "white",
        },
        drawerStyle: {
          backgroundColor: "#144272",
        },
        drawerLabelStyle: {
          color: "white",
        },
      }}
    >
      <Drawer.Screen name="Profil" component={ProfilParentScreen} />
      <Drawer.Screen name="Historique" component={HistoriqueScreen} />
      <Drawer.Screen name="F.A.Q." component={FAQScreen} />
      <Drawer.Screen name="Demande" component={DemandeScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator name="Stack" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ProfilEnfant" component={ProfilEnfantScreen} />
        <Stack.Screen name="Problematique" component={ProblematiqueScreen} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "rgb(20, 65, 114)",
  },

  demandeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    alignSelf: "center",
    width: "90%",
    fontFamily: "OpenSans",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 30,
    shadowRadius: 2,
    color: "black",
  },
  drawer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 100,
  },
  itemDrawer: {
    backgroundColor: "#144272",
  },
  txtItemDrawer: {
    color: "white",
    fontSize: 24,
  },
});
