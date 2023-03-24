import { registerRootComponent } from "expo";
//import react-native
import "react-native-gesture-handler";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
//import react navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { getHeaderTitle } from "@react-navigation/elements";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { MenuProvider } from "react-native-popup-menu";
import { useEffect, useState } from "react";

//import des pages
import LoginScreen from "./screens/LoginScreen";
import ProfilParentScreen from "./screens/ProfilParentScreen";
import ProfilEnfantScreen from "./screens/ProfilEnfantScreen";
import DemandeScreen from "./screens/DemandeScreen";
import FAQScreen from "./screens/FAQScreen";
import HistoriqueScreen from "./screens/HistoriqueScreen";
import ProblematiqueScreen from "./screens/ProblematiqueScreen";
import ReponseScreen from "./screens/ReponseScreen";
import ReponseHistScreen from "./screens/ReponseHistScreen";
import MessageScreen from "./screens/MessageScreen";

//import expo
import { Entypo } from "@expo/vector-icons";

//import Redux
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Reducers
import user from "./reducers/user";
import historique from "./reducers/historique";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./reducers/user";

// redux-persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatGPTScreen from "./screens/ChatGPTScreen";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

const reducers = combineReducers({ user, historique });
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
  const userReducer = useSelector((state) => state.user.value);
  const [imageSource, setImageSource] = useState(
    userReducer.photoURI !== null
      ? { uri: userReducer.photoURI }
      : require("./assets/Avatar.Appli.jpeg")
  );
  useEffect(() => {
    setImageSource(
      userReducer.photoURI !== null
        ? { uri: userReducer.photoURI }
        : require("./assets/Avatar.Appli.jpeg")
    );
  }, [userReducer]);
  // console.log(userReducer);
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 2,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image style={styles.image} source={imageSource} />

        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginBottom: 5,
            marginTop: 10,
          }}
        >
          {userReducer.prenom} {userReducer.nom}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            marginBottom: 10,
          }}
        >
          {userReducer.email}
        </Text>
        <TouchableOpacity
          style={styles.demandeButton}
          onPress={() => {
            dispatch(logout());
            props.navigation.navigate("Login");
          }}
        >
          <Text style={{ color: "red", fontWeight: "bold" }}>Deconnexion</Text>
        </TouchableOpacity>
      </View>
      <DrawerItemList style={{ flex: 3 }} {...props} />
      <View
        style={{
          flex: 2,
          backgroundColor: "#144272",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={styles.demandeButton}
          onPress={() =>
            props.navigation.navigate("Com-et-Call", {
              screen: "Com-et-Call-Demande",
            })
          }
        >
          <Text>Nouvelle demande</Text>
          <Entypo
            style={{ marginLeft: 15 }}
            color={"#144272"}
            size={20}
            name={"plus"}
          />
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
//deuxieme stack enfants a partir de Demande
const StackNavigatorDemande = ({ route }) => {
  const title = getHeaderTitle(route.name);
  return (
    <Stack.Navigator
      name="DemandeStack"
      screenOptions={{ headerShown: false }}
      title={title}
    >
      <Stack.Screen name="Com-et-Call-Demande" component={DemandeScreen} />
      <Stack.Screen name="Problematique" component={ProblematiqueScreen} />
      <Stack.Screen name="Reponse" component={ReponseScreen} />
      <Stack.Screen name="Autre" component={ChatGPTScreen} />
      <Stack.Screen name="Message" component={MessageScreen} />
    </Stack.Navigator>
  );
};

//deuxieme stack enfants a partir de Demande
const StackNavigatorHist = ({ route }) => {
  const title = getHeaderTitle(route.name);
  return (
    <Stack.Navigator
      name="HistoriqueStack"
      screenOptions={{ headerShown: false }}
      title={title}
    >
      <Stack.Screen name="Historique" component={HistoriqueScreen} />
      <Stack.Screen name="Affichage Historique" component={ReponseHistScreen} />
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
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <>
          <CustomDrawerContent {...props}></CustomDrawerContent>
        </>
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
        drawerActiveTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="Profil"
        component={StackNavigator}
        options={{
          tabBarLabel: "Profil",
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Com-et-Call"
        component={StackNavigatorDemande}
        options={{
          tabBarLabel: "Nouvelle demande",
          unmountOnBlur: true,
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        name="Historiques"
        component={StackNavigatorHist}
        options={{
          tabBarLabel: "Historique",
          unmountOnBlur: true,
        }}
      />
      {/*<Drawer.Screen name="Historique" component={HistoriqueScreen} />*/}
      <Drawer.Screen name="F.A.Q." component={FAQScreen} />
      {/* <Drawer.Screen name="Demande" component={DemandeScreen} /> */}
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <MenuProvider>
      <ToastProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <NavigationContainer>
              <Stack.Navigator
                name="Stack"
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen
                  name="DrawerNavigator"
                  component={DrawerNavigator}
                  options={{ gestureEnabled: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </ToastProvider>
    </MenuProvider>
  );
}

registerRootComponent(App);

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
    marginTop: 20,
    marginBottom: 80,
    alignSelf: "center",
    width: "90%",
    // fontFamily: "OpenSans",
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 50,
    borderWidth: 1,
    borderColor: "white",
  },
});
