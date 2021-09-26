
import React,{useState,useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Button,FlatList
  
} from 'react-native';
import Cards from "./Cards"
import Icon from 'react-native-vector-icons/Ionicons';
import database from "@react-native-firebase/database";
import {connect } from "react-redux"






function Products(props){

  const [items,setItems]=useState([])
  database().ref(`/Products/${props.Category}/`).once("value").then(snapshot=>{
    // setItems(snapshot.val())
    setItems(Object.values(snapshot.val()))
  })

  return(
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
        <View style={{backgroundColor:"white"}} >
                  <Text style={{color:'#ff6600',fontSize:50,marginTop:8,textAlign:"center",fontWeight:"bold",textDecorationLine:"underline"}}>{props.Category}</Text>
                </View>
        <FlatList data={items}
      renderItem={(element)=>{
        return(
          <Cards key={element.index} navigation={props.navigation} TITLE={element.item.Title} PRICE={element.item.Price} DETAILS={element.item.Description} IMAGE={{uri:element.item.Url}} />
               )
              }
      
      }
      keyExtractor={(element)=>element.Title}
      
      ></FlatList>
        
       {/* <ScrollView>

         {items.map((element,index)=>{
           return(
      <Cards key={index} navigation={props.navigation} TITLE={element.Title} PRICE={element.Price} DETAILS={element.Description} IMAGE={{uri:element.Url}} />
           )})}
      </ScrollView> */}
      
      </>
    )


}



function mapStateToProps(state) {
  return {
      Category:state.Category,
      userInfo:state.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // changeisuser:(userInfo)=>dispatch({type:"CHANGE_USER",userInfo:userInfo})
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Products)
