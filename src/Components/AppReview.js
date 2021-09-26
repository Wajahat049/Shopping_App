import * as React from 'react';
import {useState, useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import {
  flex,
  FormRow,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  TextInput,
  Alert,
  ToastAndroid,
  Dimensions,
  FlatList,Animated
} from 'react-native';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';



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
      <Image source={require("../Images/done.png")}></Image>
    </Animated.View>
  );
}


export const AppReview = (props) => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [starRating, setStarRating] = useState(2.5);


  const Submit_Review=()=>{
    database().ref(`AppReview/${props.userInfo.displayName}`).update({Name:name,Review:review,StarRating:starRating})
    setName("")
    setReview("")
    setStarRating(2.5)
    FadeInView()
  }

  return (
    <>
    <View  style={{backgroundColor:"rgb(80, 80, 90)"}}>
            <View style={{ margin: 7 }}>
                    <Icon name='menu-sharp'
                        size={40}
                        color='#ff6600'
                        onPress={() => props.navigation.openDrawer()}
                    />
           
                </View>
        </View>
        
    <View style={{marginTop: 80}}>
      <Text
        style={{
          color: 'black',
          fontSize: 40,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#ff6600',
          marginTop: 10,
          marginBottom: 10,
        }}>
        Review About the App
      </Text>
      <View
        style={{
          borderColor: '#ff6600',
          borderRadius: 10,
          borderWidth: 3,
          margin: 15,
          backgroundColor: 'white',
        }}>
        <TextInput
          value={name}
          onChangeText={e => setName(e)}
          placeholder="Password"
          placeholder="Enter your Name"
          style={{fontWeight: 'bold', color: '#ff6600', fontSize: 18}}
        />
      </View>
      <View
        style={{
          borderColor: '#ff6600',
          borderRadius: 10,
          borderWidth: 3,
          margin: 15,
          backgroundColor: 'white',
        }}>
        <TextInput
          multiline
          numberOfLines={2}
          value={review}
          onChangeText={e => setReview(e)}
          placeholder="Your Review"
          style={{fontWeight: 'bold', color: '#ff6600', fontSize: 18}}
        />
      </View>
      <View style={{margin: 30}}>
        <StarRating
          fullStarColor={'#ff6600'}
          disabled={false}
          maxStars={5}
          rating={starRating}
          selectedStar={rating => setStarRating(rating)}
        />
      </View>
      <View style={{margin:10}}>
        <Button color='#ff6600' title="Submit" onPress={()=>Submit_Review()}/>
        </View>

    </View>
    </>
  );
};

function mapStateToProps(state) {
  return {
      userInfo:state.userInfo
  }
}

export default connect(mapStateToProps)(AppReview)


