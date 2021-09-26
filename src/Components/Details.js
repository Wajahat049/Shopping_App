import * as React from 'react';
import { Component,useState } from 'react';
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
    Button,Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from "react-redux"
import database from "@react-native-firebase/database";


const AddToCart=(user,title,price,url,quantity,detail,rating)=>{
  
    database().ref(`/Cart/${user}/${title}`).update({title,price,url,quantity,detail})
    database().ref(`/Ratings/${user}/${title}`).update({rating})
    // console.log(user,title,price,url)
  
  }

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 2.5
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    render() {
        return (
            <>
            <View style={{ backgroundColor: "rgb(106, 109, 124)" }}>
            <View style={{ margin: 7 }}>
                <Icon name='menu-sharp'
                    size={40}
                    color='#ff6600'
                    onPress={() => this.props.navigation.openDrawer()}
                />
            </View>
        </View>
            <ScrollView style={{ backgroundColor: "white" }}>
               
                <Image source={{uri:this.props.product[2].uri}} style={{ borderColor: '#ff6600', borderRadius: 10, borderWidth: 5, width: 250, height: 330, marginTop: 30, margin: 53, }} />

                <View style={{ borderColor: '#ff6600', borderRadius: 10, borderWidth: 3, margin: 11, backgroundColor: 'white', padding: 10, }}>
                    <Text style={{ fontWeight: 'bold', color: '#ff6600',fontSize:18 }}>{this.props.product[0]}</Text>
                </View>

                {/* <View style={{ borderColor: '#ff6600', borderRadius: 10, borderWidth: 5, margin: 15, backgroundColor: 'white', padding: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: '#ff6600' }}> Category</Text>
                </View> */}

                <View style={{ borderColor: '#ff6600', borderRadius: 10, borderWidth: 3, margin: 11, backgroundColor: 'white', padding: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: '#ff6600',fontSize:18  }}>{this.props.product[1]}</Text>
                </View>

                <View style={{ borderColor: '#ff6600', borderRadius: 10, borderWidth: 3, margin: 11, backgroundColor: 'white', padding: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: '#ff6600',fontSize:18  }}>{this.props.product[3]}</Text>
                </View>

                <View style={{ margin: 30 }}>
                    <StarRating
                        fullStarColor={'#ff6600'}
                        disabled={false}
                        maxStars={5}
                        rating={this.state.starCount}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                    {/* {console.log(this.state.starCount)} */}
                </View>

                <View>
                    <Text style={{ textAlign: 'center', color: '#ff6600', fontWeight: 'bold', fontSize: 25, bottom: 20 }}>Rating</Text>
                </View>

                <View style={{ margin: 30 }}>
                    <Button
                        color="#ff6600"
                        title="Add to Cart"
                        onPress={()=>AddToCart(this.props.userInfo.displayName,this.props.product[0],this.props.product[1],this.props.product[2].uri,1,this.props.product[3],this.state.starCount)}
                       
                    />
                </View>

            </ScrollView>
            </>

        )

    }
}
function mapStateToProps(state) {
    return {
        product:state.product,
        userInfo:state.userInfo
    }
  }
  
export default connect(mapStateToProps)(Details);