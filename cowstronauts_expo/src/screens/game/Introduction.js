import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const Introduction = ({ navigation }) => {
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [text3, setText3] = useState("");
    const [text4, setText4] = useState("");
    const [ textButton, setTextButton ] = useState("")

    const texts = [
        "Discovering new planets is an important commitment with our society",
        "So, my occupation is exploring the space and find new resources",
        "But my spaceship broke and I am trapped in this planet",
        "Now, I need to fix my spaceship with the help of the locals!"
    ]
    
    useEffect(() => {

        setText1(texts[0]);
        setTimeout(() => {
            setText1(texts[0]);
        }, 500);
        setTimeout(() => {
            setText2(texts[1])
        }, 2000);

        setTimeout(() => {
            setText3(texts[2])
        }, 4000);
        
        setTimeout(() => {
            setText4(texts[3])
        }, 6000);

        setTimeout(() => {
            setTextButton("Tap to continue...")
        }, 7000);
    }, []);
    return (
        <ImageBackground source={require("../../../assets/img/backgrounds/TapBackground.png")} style={styles.background}>
            <View style={{flex: 1, margin: 20, marginTop: 100}}>
                <Text style={ styles.text }>{text1}</Text>
                <Text style={ styles.text }>{text2}</Text>
                <Text style={ styles.text }>{text3}</Text>
                <Text style={ styles.text }>{text4}</Text>
                <TouchableOpacity style={{ marginTop: 40}} onPress={() => navigation.navigate("TabsGame")}><Text style={ styles.text }>{textButton}</Text></TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      backgroundColor: '#393939',
    },
    text: {
        color: "white",
        padding: 20,
        fontSize: 20,
        textAlign: "center",
        fontWeight: "700"
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    firstContainer: {
      flex: 1.25,
      width: '100%',
    },
    secondContainer: {
      flex: 1,
      flexDirection: 'column-reverse',
    },
    moonImage: {
      top: 150,
      width: '125%',
      height: '125%',
      alignSelf: 'center',
    },
    txtCoins: {
      color: "white",
      top: 70,
      fontSize: 30,
      textAlign: "center",
    },
    coinImage:{
      width:30,
      height:30,
    }
  });
export default Introduction;