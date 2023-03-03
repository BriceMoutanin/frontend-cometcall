//import react-native
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";

//import react navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { getHeaderTitle } from "@react-navigation/elements";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContent,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

//import des pages
import LoginScreen from "./screens/LoginScreen";
import ProfilParentScreen from "./screens/ProfilParentScreen";
import ProfilEnfantScreen from "./screens/ProfilEnfantScreen";
import DemandeScreen from "./screens/DemandeScreen";
import FAQScreen from "./screens/FAQScreen";
import HistoriqueScreen from "./screens/HistoriqueScreen";
import ProblematiqueScreen from "./screens/ProblematiqueScreen";
import ReponseScreen from "./screens/ReponseScreen";
import MessageScreen from "./screens/MessageScreen";

//import expo
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

//import Redux
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

// redux-persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const reducers = combineReducers({ user });
const persistConfig = { key: "com-et-call", storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#144272",
          flexDirection: "column",
          justifyContent: "flex-srtart",
        }}
      >
        <TouchableOpacity
          style={styles.demandeButton}
          onPress={() => props.navigation.navigate("Login")}
        >
          <Text>Deconnexion</Text>
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} />
      {/* <DrawerItem
        itemStyle={styles.demandeButton}
        label="Nouvelle demande"
        labelStyle={(activeTintColor = "#144272")}
        iconContainerStyle={({ focused, activeTintcolor, size }) => (
          <Entypo color={activeTintcolor} size={size} name={"plus"} />
        )}
        onItemPress={() => props.navigation.navigate("Demande")}
      /> */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#144272",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={styles.demandeButton}
          onPress={() => props.navigation.navigate("DemandeStack")}
        >
          <Text>Nouvelle demande</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
//deuxieme stack enfants a partir de Demande
const StackNavigatorDemande = ({ route }) => {
  function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

    switch (routeName) {
      case "Demande":
        return "Demandes";
      case "Problematique":
        return "Problematique";
      case "Reponse":
        return "reponse";
      case "Message":
        return "Message";
    }
  }
  const title = getHeaderTitle(route.name);
  return (
    <Stack.Navigator
      name="DemandeStack"
      screenOptions={{ headerShown: false }}
      title={title}
    >
      <Stack.Screen
        name="Demande"
        component={DemandeScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}
      />
      <Stack.Screen
        name="Problematique"
        component={ProblematiqueScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}
      />
      <Stack.Screen
        name="Reponse"
        component={ReponseScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}
      />
      <Stack.Screen
        name="Message"
        component={MessageScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}
      />
    </Stack.Navigator>
  );
};

//enfant stack des profils
const StackNavigator = ({ route }) => {
  const title = getHeaderTitle(route.name);
  return (
    <Stack.Navigator
      name="ProfilStack"
      screenOptions={{ headerShown: false }}
      title={title}
    >
      <Stack.Screen name="ProfilParent" component={ProfilParentScreen} />
      <Stack.Screen name="ProfilEnfant" component={ProfilEnfantScreen} />
    </Stack.Navigator>
  );
};
//enfant drawer Navigation qui contient l'enfant Stack
const DrawerNavigator = () => {
  const [activeScreen, setActiveScreen] = useState("Profil Parent"); //creation etat nom de screen

  const handleActiveScreen = (screenName) => {
    /// fonction quiset mon etat
    setActiveScreen(screenName);
  };
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <>
          <CustomDrawerContent {...props}></CustomDrawerContent>
        </>
      )}
      initialRouteName="Home"
      // headerTitle={activeScreen}
      style={styles.header}
      screenOptions={{
        headerStyle: { backgroundColor: "#144272" },
        headerTintColor: "white",
        headerTitle: activeScreen, //////ici etat
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
      <Drawer.Screen
        name="Profil"
        component={StackNavigator}
        options={{
          tabBarLabel: "Profil ",
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="DemandeStack"
        component={StackNavigatorDemande}
        options={{
          tabBarLabel: "Profil",
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen name="Historique" component={HistoriqueScreen} />
      <Drawer.Screen name="F.A.Q." component={FAQScreen} />
      {/* <Drawer.Screen name="Demande" component={DemandeScreen} /> */}
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator name="Stack" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
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
    marginBottom: 80,
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

  DrawerItemList: {
    backgroundColor: "#144272",
  },

  itemDrawer: {
    backgroundColor: "#144272",
  },

  txtItemDrawer: {
    color: "white",
    fontSize: 24,
  },
});
