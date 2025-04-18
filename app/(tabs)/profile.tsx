import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserProfile } from "../../lib/appwrite";
import Facebook from '../../assets/icons/auth-icons/facebook.svg';
import EditIcon from '../../assets/icons/tabs-icons/edit.svg'

const Profile = () => {
  return (
    <SafeAreaView className="bg-secondary h-full"> {/*bg-primary?*/}
      <ScrollView>
        <View className="bg-[#191919] w-full h-60 relative">
          <View className="absolute right-0 top-6 mr-8">
            <EditIcon width={18} height={18} />
          </View>
        </View>

        <View className="flex items-center mx-auto bg-white w-24 h-24 rounded-full -mt-12">
          
        </View>
        <View className="flex-row justify-center items-center mt-4">
          <Text className="font-bold text-2xl text-white text-center">Melody Composer</Text>
          <View className="absolute right-0 top-1/2 -translate-y-1/2 mr-8">
            <EditIcon width={18} height={18} />
          </View>
        </View>

        <Text className="font-regular text-lg text-white text-center mt-2">@melody_maker</Text>

        {/*buttons*/}
        <View className="flex-row gap-4 justify-center">
          <View className="flex justify-center items-center bg-white w-40 h-9 rounded-full mt-4">
            <Text className="text-lg font-regular text-center">Share profile</Text>
          </View>
          <View className="flex justify-center items-center bg-white w-40 h-9 rounded-full mt-4">
            <Text className="text-lg font-regular text-center">Notifications</Text>
          </View>
        </View>

        {/*Statistiky*/}
        <View className="flex-row gap-16 justify-center mt-5">
          <View>
            <Text className="text-2xl text-white font-semibold text-center">150</Text>
            <Text className="text-lg text-white font-regular text-center">tracks</Text>
          </View>
          <View>
            <Text className="text-2xl text-white font-semibold text-center">121</Text>
            <Text className="text-lg text-white font-regular text-center">fans</Text>
          </View>
          <View>
            <Text className="text-2xl text-white font-semibold text-center">58</Text>
            <Text className="text-lg text-white font-regular text-center">connections</Text>
          </View>
        </View>

        <View className="flex items-center w-full mx-8 bg-[#191919] h-[1px] mt-8"></View>

        {/*portfolio muzikanta*/}
        <View className="mx-8">
          <Text className="text-center font-regular text-xl text-white mt-6">Users bio</Text>
          <View className="justify-center items-center bg-[#171717] w-full rounded-xl h-16 mt-3">
            <Text className="text-[#575757] text-lg font-regular">Something about you</Text>
            <View className="absolute right-0 top-1/2 -translate-y-1/2 mr-8">
              <EditIcon width={18} height={18} />
            </View>
          </View>
          
          <Text className="text-center font-regular text-xl text-white mt-6">Music instrument</Text> 
          <View className="justify-center items-center bg-[#171717] w-full rounded-3xl h-16 mt-3">
            <View className="absolute left-4 top-1/2 -translate-y-1/2 flex-row gap-2">
              <Facebook width={30} height={30} />
              <Facebook width={30} height={30} />
            </View>
            <View className="absolute right-0 top-1/2 -translate-y-1/2 mr-8">
              <EditIcon width={18} height={18} />
            </View>
            <Text className="text-[#D4D4D4] text-lg font-regular">Vocal, Bass</Text>
          </View>

          <Text className="text-center font-regular text-xl text-white mt-6">Locality</Text> 
          <View className="justify-center items-center bg-[#171717] w-full rounded-3xl h-16 mt-3">
            <View className="absolute left-4 top-1/2 -translate-y-1/2">
              <Facebook width={30} height={30} />
            </View>
            <View className="absolute right-0 top-1/2 -translate-y-1/2 mr-8">
              <EditIcon width={18} height={18} />
            </View>
            <Text className="text-[#D4D4D4] text-lg font-regular">Czech republic, Brno</Text>
          </View>

          <Text className="text-center font-regular text-xl text-white mt-6">Age</Text> 
          <View className="justify-center items-center bg-[#171717] w-full rounded-3xl h-16 mt-3">
            <View className="absolute left-4 top-1/2 -translate-y-1/2">
              <Facebook width={30} height={30} />
            </View>
            <View className="absolute right-0 top-1/2 -translate-y-1/2 mr-8">
              <EditIcon width={18} height={18} />
            </View>
            <Text className="text-[#D4D4D4] text-lg font-regular">41 Years</Text>
          </View>

          <Text className="text-center font-regular text-xl text-white mt-6">Music genres</Text> 
          <View className="justify-center items-center bg-[#171717] w-full rounded-3xl h-16 mt-3 mb-24">
            <View className="absolute left-4 top-1/2 -translate-y-1/2">
              <Facebook width={30} height={30} />
            </View>
            <View className="absolute right-0 top-1/2 -translate-y-1/2 mr-8">
              <EditIcon width={18} height={18} />
            </View>
            <Text className="text-[#D4D4D4] text-lg font-regular">Rock, Heavy metal</Text>
          </View>


        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})