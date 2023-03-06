import {
  StyleSheet,
  View,
  Image,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  Stack,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { Skeleton } from "@rneui/themed";
import Animated from "react-native-reanimated";
import { SlideInLeft, FlipInYRight } from "react-native-reanimated";

const AnimatedViewPager = Animated.createAnimatedComponent(View);

export default function ChatGPTScreen({ route, navigation }) {
  const { enfant } = route.params;
  const [question, setQuestion] = useState("");
  const [reponse, setReponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleQuestion() {
    setShowResponse(true);
    setIsLoading(true);
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Tu es une intelligence artificielle destinée à expliquer aux parents d'élèves français quelles sont les personnes à contacter en fonction du problème qu'ils te donneront. Si l'on te pose une question qui ne concerne pas un enfant à l'école, au collège ou au lycée, tu ne dois pas y répondre et rappeler que tu es une IA qui sert uniquement à ce but. Tu dois d'abord donner un petit texte explicatif sur le problème qu'ils t'expliqueront. Tu dois ensuite donner, dans l'ordre à contacter, les différents organismes et établissements à contacter pour résoudre le problème. Voici un message de parent auquel tu vas devoir répondre de la façon dont je t'ai expliqué : '${question}'`,
        temperature: 1,
        max_tokens: 456,
        top_p: 0.3,
        frequency_penalty: 1.23,
        presence_penalty: 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setReponse(data.choices[0].text);
        setIsLoading(false);
      });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.scrollContainer}>
        <ScrollView
          style={{ height: "100%", width: "100%" }}
          contentContainerStyle={{
            alignItems: "center",
            maxHeight: "10000%",
          }}
        >
          <AnimatedViewPager
            entering={SlideInLeft.delay(250).duration(1000)}
            style={styles.card}
          >
            <Text style={styles.h5}>Bienvenue sur IASchool</Text>
            <Text style={styles.h6}>
              Cette intelligence artificielle est programmée pour répondre à
              toute question posée par les parents concernant les problèmes de
              leurs enfants à l'école.
            </Text>
            <Text style={styles.h6}>
              Vous pouvez décrire ci-dessous le problème de votre enfant, et
              IASchool génèrera une réponse.
            </Text>
          </AnimatedViewPager>
          <AnimatedViewPager
            entering={SlideInLeft.delay(800).duration(1000)}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              style={styles.input}
              multiline={true}
              onChangeText={(value) => setQuestion(value)}
              value={question}
              onBlur={() => Keyboard.dismiss()}
              keyboardType="default"
              returnKeyType="done"
              onKeyPress={(keyPress) => {
                if (keyPress.nativeEvent.key === "Enter") {
                  Keyboard.dismiss();
                  handleQuestion();
                }
              }}
            ></TextInput>
            <TouchableOpacity
              style={styles.askButton}
              onPress={() => handleQuestion()}
            >
              <Text style={styles.buttonText}>Demander</Text>
            </TouchableOpacity>
          </AnimatedViewPager>
          {showResponse && (
            <AnimatedViewPager
              entering={FlipInYRight}
              style={styles.responseCard}
            >
              {isLoading ? (
                <>
                  <Skeleton
                    animation="pulse"
                    style={{ marginTop: 0, marginBottom: 15 }}
                    width={"80%"}
                    height={40}
                  />
                  <Skeleton
                    animation="pulse"
                    style={{ marginTop: 5, marginBottom: 5 }}
                    width={"90%"}
                    height={10}
                  />
                  <Skeleton
                    animation="pulse"
                    style={{ marginTop: 5, marginBottom: 5 }}
                    width={"90%"}
                    height={10}
                  />
                  <Skeleton
                    animation="pulse"
                    style={{ marginTop: 5, marginBottom: 5 }}
                    width={"90%"}
                    height={10}
                  />
                  <Skeleton
                    animation="pulse"
                    style={{ marginTop: 5, marginBottom: 5 }}
                    width={"90%"}
                    height={10}
                  />
                  <Skeleton
                    animation="pulse"
                    style={{ marginTop: 5, marginBottom: 5 }}
                    width={"90%"}
                    height={10}
                  />
                  <Skeleton
                    animation="pulse"
                    style={{ marginTop: 5, marginBottom: 5 }}
                    width={"90%"}
                    height={10}
                  />
                </>
              ) : (
                <>
                  <Text style={styles.h5}>Réponse de IASchool</Text>
                  <Text style={styles.h6}>
                    {reponse.slice(2, reponse.length - 1)}
                  </Text>
                </>
              )}
            </AnimatedViewPager>
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  card: {
    backgroundColor: "#144272",
    borderRadius: 12,
    width: "80%",
    padding: 15,
    marginTop: 40,
    paddingBottom: 20,
  },
  responseCard: {
    backgroundColor: "#144272",
    borderRadius: 12,
    width: "80%",
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  h5: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  h6: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  input: {
    padding: 10,
    marginTop: 20,
    marginTop: 20,
    height: 250,
    width: "70%",
    borderWidth: 3,
    backgroundColor: "white",
    borderColor: "#144272",
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 18,
    color: "black",
  },
  askButton: {
    width: "50%",
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 30,
    shadowRadius: 2,
  },
  buttonText: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 20,
    color: "#144272",
    textAlign: "center",
  },
});
