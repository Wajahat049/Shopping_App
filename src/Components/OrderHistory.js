import React,{useState,useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Image,Button,FlatList

  
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import database from "@react-native-firebase/database";
import {connect } from "react-redux"
import { changeisorder } from '../Store/action';




function OrderHistory(props){
    const [items, setitems] = useState([]);
    
   


    useEffect(()=>{
        database().ref(`OrderHistory/${props.userInfo.displayName}`).once("value").then(snapshot => {
            // console.log(Object.values(snapshot.val()))
            
            if (snapshot.val()!=undefined || snapshot.val()!=null ){
            setitems(Object.values(snapshot.val()))
            }
        
        })
    })
    


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

        {(items.length==0) ? <View style={{marginTop:5}}>
                <Text style={{color:'#ff6600',fontSize:50,fontWeight:"bold",margin:"10%",marginTop:"50%",textAlign:"center"}}>Order History is Empty</Text>
            </View> :

        <FlatList data={items}
      renderItem={(element)=>{
          var pro=Object.keys(element.item.Products)
          var quan=Object.values( Object.values(element.item)[6])[0]

        //   console.log(pro)
        return(
            <>
            <View key={element.item.index} style={{borderRadius:5,borderColor:'#ff6600',borderWidth:3,padding:5,margin:10}}>
               {/* {console.log(element.item)} */}
               <View>
                    <Text style={{color:'#ff6600',fontSize:20}}>Name:   {element.item.Name}</Text>
                    <Text style={{color:'#ff6600',fontSize:20}}>City:   {element.item.City}</Text>
                    <Text style={{color:'#ff6600',fontSize:20}}>Phone Number:   {element.item.PhoneNumber}</Text>
                    <Text style={{color:'#ff6600',fontSize:20}}>Address:    {element.item.Address}</Text>
                    <Text style={{color:'#ff6600',fontSize:20}}>SubTotal:   {element.item.SubTotal}</Text>
                    <Text style={{color:'#ff6600',fontSize:20}}>Tax:    {element.item.Tax}</Text>
                    <Text style={{color:'#ff6600',fontSize:20}}>Total:  {element.item.TotalPrice}</Text>
                    </View>
                    <View>
                   
                    {pro.map((ele,index)=>
                    
                    <View key={index}>
                        {/* {console.log(quan)} */}
                        <Text style={{fontSize:18,marginLeft:5,marginRight:10,marginTop:5}}>{index+1}. {ele} ( {quan.quantity} )</Text>
                    </View>
                    )}
                    </View>
                   
                    
                    


               
            </View>
            
        </>
               )
              }
      
      }
      keyExtractor={(element)=>element.Title}
      
      ></FlatList>
    }

</>
    )  
}



function mapStateToProps(state) {
    return {
        Order:state.Order,
        userInfo:state.userInfo
    }
  }
  
  
  function mapDispatchToProps(dispatch) {
    return {
      changeisorder:(Order)=>dispatch(changeisorder(Order))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
