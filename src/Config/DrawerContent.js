import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import database from "@react-native-firebase/database";
import { changeiscart} from '../Store/action';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect } from "react-redux"


function DrawerContent(props) {
    const [Photo,setPhoto]=useState("https://png.pngtree.com/png-vector/20190225/ourlarge/pngtree-vector-avatar-icon-png-image_702436.jpg")
    const [Name,setName]=useState("Name")
    const [Email,setEmail]=useState("Email")
    const [Disable,setDisable]=useState(true)

useEffect(()=>{
    
    
    if(props.userInfo!={} && props.userInfo!=null){
        setPhoto(props.userInfo.photoURL),
        setName(props.userInfo.displayName),
        setEmail(props.userInfo.email),
        setDisable(false)
    }
        else{
            setPhoto("https://png.pngtree.com/png-vector/20190225/ourlarge/pngtree-vector-avatar-icon-png-image_702436.jpg")
            setName("Name")
            setEmail("Email")
            setDisable(true)
        }
})





const toCart=()=>{
    // database().ref(`Cart/${props.userInfo.displayName}`).once("value").then(snapshot => {
    //     // console.log(snapshot.val())
    //     if (snapshot.val()!=undefined || snapshot.val()!=null ){
    //     // setitems(Object.values(snapshot.val()))
    //     props.changeiscart(Object.values(snapshot.val()))
    //     }
    
    // }

    // )
    props.navigation.navigate('Cart')



}
    return(
        <View style={{flex:1,}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: Photo
                                }}
                                size={55}
                            />
        
                            <View style={{marginLeft:7, flexDirection:'column'}}>
                                <Title style={styles.title}>{Name}</Title>
                                <Caption style={styles.caption}>{Email}</Caption>
                            </View>
                        </View>


                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={"#ff6600"}
                                size={30}
                                />
                            )}
                            labelStyle={styles.label}
                            label="Home"
                            onPress={() =>Disable ? alert("Please Sign-in first"):props.navigation.navigate('Home')}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="grid"
                                color={"#ff6600"}
                                size={30}
                                />
                            )}
                            labelStyle={styles.label}
                            label="Categories"
                            onPress={() => Disable ? alert("Please Sign-in first"):props.navigation.navigate('Categories')}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cart-outline" 
                                color={"#ff6600"}
                                size={30}
                                />
                            )}
                            labelStyle={styles.label}
                            label="Cart"
                            onPress={() => Disable ? alert("Please Sign-in first"):toCart()}
                        />
                      
                       <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="magnify"
                                color={"#ff6600"}
                                size={30}
                                />
                            )}
                            labelStyle={styles.label}
                            label="Search Product"
                            onPress={() => Disable ? alert("Please Sign-in first"):props.navigation.navigate('Search')}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="history"
                                color={"#ff6600"}
                                size={30}
                                />
                            )}
                            
                            labelStyle={styles.label}
                            label="Order History"
                            onPress={() => Disable ? alert("Please Sign-in first"):props.navigation.navigate('OrderHistory')}
                        />

<DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="star"
                                color={"#ff6600"}
                                size={30}
                                />
                            )}
                            labelStyle={styles.label}
                            label="App Review"
                            onPress={() => Disable ? alert("Please Sign-in first"):props.navigation.navigate('AppReview')}
                        />
                    </Drawer.Section>
                   </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    label:{
        fontSize:16
    },
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 10,
      paddingTop:20
    },
    title: {
      fontSize: 18,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 35,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

  function mapStateToProps(state) {
    return {
        userInfo:state.userInfo
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      changeiscart:(Cart)=>dispatch(changeiscart(Cart))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(DrawerContent)
