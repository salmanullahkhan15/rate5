import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'
import PostScreen from './screens/PostScreen'
import ProfileScreen from './screens/ProfileScreen'
import Register from './screens/Register'
import Login from './screens/Login'
import SplashScreen from './screens/SplashScreen'
import RestaurantDetail from './screens/RestaurantDetail'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';


const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const PostStach = createStackNavigator();
const ProfileStack = createStackNavigator();
const AuthStack = createStackNavigator();
console.disableYellowBox = true;

const HomeStackScreen = () => (
  <HomeStack.Navigator  >
    <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }} />
    <HomeStack.Screen name="Restaurant Detail" component={RestaurantDetail}
      options={({ route }) => ({ title: route.params.name })} options={{ headerShown: false }} />

    <HomeStack.Screen name="Profile" component={ProfileScreen} options={({ route }) => ({ userID: route.params.name })} options={{ headerShown: false }} />

  </HomeStack.Navigator>
)

const PostStackScreen = () => (
  <PostStach.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <PostStach.Screen name="Post" component={PostScreen} />
  </PostStach.Navigator>
)

const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <ProfileStack.Screen name="Home" component={ProfileScreen} />
  </ProfileStack.Navigator>
)



function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'Post') {
            iconName = focused ? 'clipboard' : 'clipboard';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'settings' : 'settings';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FF5A65',
        inactiveTintColor: 'gray',
      }} >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Post" component={PostStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />


    </Tab.Navigator>
  );
}

function AuthNav() {
  // AuthStachScreen
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="Home" component={AppTabs} options={{ headerShown: false }} />
    </AuthStack.Navigator >)
}


const theme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF5A65',
    accent: '#FFFFFF',
    text: "#808285",

  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthNav />
      </NavigationContainer>
    </PaperProvider>
  );
}
