import React, { useState, useEffect, useRef } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput, ToastAndroid, Alert, Animated, Image, ImageBackground

} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Button
} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import { connect } from "react-redux"
import Icon from 'react-native-vector-icons/Ionicons';
import { changeisuser } from "../Store/action/index"





import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';



GoogleSignin.configure({
  webClientId: '564106818309-d11gl37eoujl5g7bi4u87oa4ch48rvu0.apps.googleusercontent.com',


});

async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}


const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])


  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

function GoogleSignIn(props) {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);


  const signout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    GoogleSignin.signOut()
    setUser("")
    props.changeisuser({})
  }


  function onAuthStateChanged(user) {
    setUser(user);
    props.changeisuser(user)
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    props.changeisuser(user)

    return subscriber; // unsubscribe on unmount

  }, []);


  if (!user) {
    return (
      < >
        <View style={{ backgroundColor: "rgb(80, 80, 90)" }}>
          <View style={{ margin: 7 }}>
            <Icon name='menu-sharp'
              size={40}
              color='#ff6600'
              onPress={() => props.navigation.openDrawer()}
            />
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "white" }}>
          <FadeInView >
            <Image style={{ alignSelf: "center" }} source={require("../Images/Logo.png")} />
            <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: '#ff6600',
                textShadowColor: "rgb(106, 109, 124)",
                textShadowOffset: { width: 5, height: 5 },
                textShadowRadius: 15,
                margin: 30,
                textAlign: "center"
              }}>
              SHOPPING APP
            </Text>
            <GoogleSigninButton style={{ margin: 30, backgroundColor: "white", alignSelf: "center", height: 65 }}
              size={GoogleSigninButton.Size.Wide}

              onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!')).catch((err) => console.log(err))}
            />
          </FadeInView>

        </View>
        <View>

        </View>
      </>
    );
  }

  else {

    return (

      <>

        <View style={{ backgroundColor: "rgb(80, 80, 90)" }}>
          <View style={{ margin: 7 }}>
            <Icon name='menu-sharp'
              size={40}
              color='#ff6600'
              onPress={() => props.navigation.openDrawer()}
            />

          </View>
        </View>

        <View style={{ flex: 1, alignItems: 'center', paddingTop: 70 }}>


          <Avatar.Image
            source={{
              uri: user.photoURL
            }}
            size={200}
          />
          <Text style={{
            fontSize: 35,
            fontWeight: 'bold',
            color: '#ff6600',
            textShadowColor: "rgb(106, 109, 124)",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 15,
            marginTop: 25
          }}>WELCOME</Text>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#ff6600',
            textShadowColor: "rgb(106, 109, 124)",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 15,
            margin: 20,
            textDecorationLine: "underline",
            textTransform: "uppercase",
          }}>{user.displayName}</Text>


          <View style={{ margin: 55 }}>
            <Button icon="logout"
              mode="contained"
              labelStyle={{ color: "white", fontSize: 20 }}
              color="#ff6600"
              title="SignOut"
              onPress={() => signout()}
            >SIGN OUT</Button>
          </View>

        </View>

      </>
    )
  }

}




function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  }
}


function mapDispatchToProps(dispatch) {
  return {
    changeisuser: (userInfo) => dispatch(changeisuser(userInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleSignIn)



