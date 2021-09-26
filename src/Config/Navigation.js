import * as React from 'react';
import { Button, View,Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Cart from '../Components/Cart';
import Categories from '../Components/Categories';
import Products from '../Components/Products';
import Home from '../Components/Home';
import Detail from '../Components/Details';
import Checkout from '../Components/Checkout';
import Cards from '../Components/Cards';
import Search from '../Components/Search';
import AppReview from '../Components/AppReview';
import OrderHistory from '../Components/OrderHistory';




import DrawerContent from "./DrawerContent"







const Drawer = createDrawerNavigator();

export default function App(props) {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props=> <DrawerContent {...props}  />}>
                <Drawer.Screen name="Home" component={Home} options={{drawerLabel:"Home"}}  />
                <Drawer.Screen name="Cart" component={Cart} options={{drawerLabel:"Cart"}}  />
                <Drawer.Screen name="Cards" component={Cards} />
                <Drawer.Screen name="Products" component={Products} options={{headerTitle:"Products"}} />
                <Drawer.Screen name="Categories" component={Categories} />
                <Drawer.Screen name="Checkout" component={Checkout} />
                <Drawer.Screen  name="Detail" component={Detail}  />
                <Drawer.Screen  name="Search" component={Search}  />
                <Drawer.Screen  name="AppReview" component={AppReview}  />
                <Drawer.Screen  name="OrderHistory" component={OrderHistory}  />





            </Drawer.Navigator>
        </NavigationContainer>
    );
}