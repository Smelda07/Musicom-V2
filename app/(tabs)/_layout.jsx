import { Text, View, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router';
import { icons } from '../../constants/icons';
import React from 'react';

import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from 'react-native-safe-area-context';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2 w-16 pt-8">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-semibold' : 'font-regular'} text-xs`} style={{ color: color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  setTimeout(() => {
    if (!loading && !isLogged) { 
      
      return <Redirect href="/sign-in" />; 
    }
  }, 1000)

    return (
      <>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#00D2A1',
            tabBarInactiveTintColor: '#ffffff',
            tabBarStyle: {
              backgroundColor: '#060606',
              borderTopWidth: 1,
              borderColor: '#151515',
              height: 72,
            }
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon  
                  icon={icons.home}
                  color={color}
                  name="Home"
                  focused={focused}
                />
              )
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: 'Search',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.search}
                  color={color}
                  name="Search"
                  focused={focused}
                />
              )
            }}
          />
          <Tabs.Screen
            name="add"
            options={{
              title: 'Add',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.add}
                  color={color}
                  name="Add"
                  focused={focused}
                />
              )
            }}
          />
          <Tabs.Screen
            name="groups"
            options={{
              title: 'Groups',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.groups}
                  color={color}
                  name="Groups"
                  focused={focused}
                />
              )
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.profile}
                  color={color}
                  name="Profile"
                  focused={focused}
                />
              )
            }}
          />
        </Tabs>
      </>
    )
}

export default TabsLayout