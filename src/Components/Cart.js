import React,{useState,useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Image,Button,FlatList,Alert

  
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import database from "@react-native-firebase/database";
import {connect } from "react-redux"
import { changeisorder } from '../Store/action';
import { changeiscart} from '../Store/action';





function Cart(props){
    const [items, setitems] = useState([]);
    const [data, setData] = useState({});
    const [thedata, settheData] = useState({});

   


    useEffect(()=>{

        database().ref(`Cart/${props.userInfo.displayName}`).on("value",snapshot => {
            // console.log(snapshot.val())
            if (snapshot.val()!=undefined || snapshot.val()!=null ){
            setitems(Object.values(snapshot.val()))
            // console.log("items",items)
            // props.changeiscart(Object.values(snapshot.val()))
            } })
    })
        



const GoToCheckout=()=>{
    database().ref(`Cart/${props.userInfo.displayName}`).once("value").then(snapshot => {
       
    props.changeisorder(snapshot.val())})
    // database().ref(`Cart/${props.userInfo.displayName}/`).remove()
    props.navigation.navigate("Checkout")
}

const ClearCart=()=>{
    Alert.alert(
        "Clear Cart",
        "Are you sure you want to clear cart?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "YES", onPress: () => database().ref(`Cart/${props.userInfo.displayName}`).remove().then(setitems([])) }
          
        ]
      );
    
}
   
    
const deleteItem=(uid)=>{
    database().ref(`Cart/${props.userInfo.displayName}/`+uid).remove()


}


const increase=(uid)=>{

    // console.log(uid)
    let quan=uid.quantity+1
    
    database().ref(`Cart/${props.userInfo.displayName}/${uid.title}`).update({"quantity":quan})

}


const decrease=(uid)=>{


    if(uid.quantity>1){
        let quan=uid.quantity-1
    database().ref(`Cart/${props.userInfo.displayName}/${uid.title}`).update({"quantity":quan})
    }
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
        {/* {console.log(items.length)} */}
        
        {(items.length==0) ? <View style={{marginTop:5}}>
                <Text style={{color:'#ff6600',fontSize:50,fontWeight:"bold",margin:"10%",marginTop:"50%",textAlign:"center"}}>The Cart is Empty</Text>
            </View> :
            
<>

        <FlatList data={items}
      renderItem={(element)=>{
        return(
            
            <View key={element.index} style={{marginTop:10}}>

            <Image source={{uri:element.item.url}} style={{ borderColor: '#ff6600', borderRadius: 10, borderWidth: 5, width: 150, height: 160, marginLeft: 100, marginTop: 20 }} />
            <Text style={{ color: "black", fontSize: 25, fontWeight: 'bold', textAlign: 'center',margin:10 }}>{element.item.title}</Text>
            <Text style={{ color: "black", fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>RS: {element.item.price}</Text>

            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 110, }}>
                <View style={{ margin: 12 }}>
                    <Icon name='remove-circle-sharp'
                        size={30}
                        color='#ff6600'
                        onPress={()=>decrease(element.item)}
                    />
                </View>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25,marginTop:12 }}>{element.item.quantity}</Text>
                <View style={{ margin: 12 }}>
                    <Icon name='add-circle-sharp'
                        size={30}
                        color='#ff6600'
                        onPress={()=>increase(element.item)}

                    />
                </View>
                <View style={{ margin: 10,marginLeft:20 }}>
                    <Icon name='trash-sharp'
                        size={30}
                        color='#ff6600'
                        onPress={()=>deleteItem(element.item.title)}
                    />
                </View>
            </View>
            </View>
            
        
               )
              }
      
      }
      keyExtractor={(element)=>element.Title}
      
      ></FlatList>
      <View style={{margin:10}}>
        <Button color='#ff6600' title="Clear Cart" onPress={()=>ClearCart()}/>
        </View>
       <View style={{margin:10}}>
        <Button color='#ff6600' title="Checkout" onPress={()=>GoToCheckout()}/>
        </View>
        </>
}
</>

    
    )


    
}



function mapStateToProps(state) {
    return {
        Order:state.Order,
        userInfo:state.userInfo,
        Cart:state.Cart
    }
  }
  
  
  function mapDispatchToProps(dispatch) {
    return {
      changeisorder:(Order)=>dispatch(changeisorder(Order)),
      changeiscart:(Cart)=>dispatch(changeiscart(Cart))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Cart)
