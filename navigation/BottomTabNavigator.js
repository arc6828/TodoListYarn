import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import TodoScreen from '../screens/TodoScreen';

import { AsyncStorage} from 'react-native';


import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Todo';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  let user = getUser();
  //console.log("HELLO 2 : " , user );
  
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          title: 'Todo',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Get Started',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Todo':
      return 'Todo List';
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
    case 'Login':
      return 'Login';
    case 'Register':
      return 'Register';
  }
}

async function getUser() { 
  try {
    const value = await AsyncStorage.getItem('sssuser');
    if (value !== null) {
      // We have data!!
      console.log("have data : " ,value);
      //var todos = JSON.parse(value);
      //this.setState({'todos' : todos})
    }else {
      value = null; 
      console.log("no data");
    }
    return value;
  } catch (error) {
    // Error retrieving data
    
  }

  return null;
  // This will switch to the App screen or Auth screen and this loading
  // screen will be unmounted and thrown away.
  //this.props.navigation.navigate(user ? 'Root' : 'Auth'); 
};
