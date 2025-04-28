import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import Facebook from '../../assets/icons/auth-icons/facebook.svg'
import EditIcon from '../../assets/icons/tabs-icons/edit.svg'
import PhotoIcon from '../../assets/icons/tabs-icons/photo.svg'
import { Share } from 'react-native'
import { TextInput } from 'react-native'

const Profile = () => {
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [bio, setBio] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false)

  const handleShareProfile = async () => {
    try {
      const result = await Share.share({
        message: 'Check out my profile on Musicom! 🎶\nhttps://musicom.com/user/melody_maker', /*Nastavit správnou adresu*/
      })
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Sdíleno přes:', result.activityType)
        } else {
          console.log('Profil byl sdílen.')
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Sdílení bylo zrušeno.')
      }
    } catch (error) {
      console.error('Chyba při sdílení profilu:', error.message)
    }
  }
  

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })

    if (!result.canceled && result.assets.length > 0) {
      setBackgroundImage(result.assets[0].uri)
    }
  }

  const handlePickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri)
    }
  }

  return (
    <SafeAreaView className="bg-secondary h-full">
      <ScrollView>
        {/* Background Image */}
        <View className="w-full h-60 relative overflow-hidden bg-[#191919]">
          {backgroundImage && (
            <Image
              source={{ uri: backgroundImage }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
          )}
          <TouchableOpacity
            onPress={handlePickImage}
            className="absolute right-0 top-6 mr-8 z-10"
          >
            <EditIcon width={18} height={18} />
          </TouchableOpacity>
        </View>

        {/* Profile Picture */}
        <TouchableOpacity
          onPress={handlePickProfileImage}
          className="flex justify-center items-center mx-auto bg-white w-24 h-24 rounded-full -mt-12 overflow-hidden"
        >
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <PhotoIcon className="w-16 h-16" />
          )}
        </TouchableOpacity>
        <View className="flex-row justify-center items-center mt-4">
          <Text className="font-bold text-2xl text-white text-center">Melody Composer</Text>
          <View className="absolute right-0 top-1/2 -translate-y-1/2 mr-8">
            <EditIcon width={18} height={18} />
          </View>
        </View>

        <Text className="font-regular text-lg text-white text-center mt-2">@melody_maker</Text>

        {/*buttons*/}
        <View className="flex-row gap-4 justify-center">
          <TouchableOpacity
            onPress={handleShareProfile}
            className="flex justify-center items-center bg-white w-40 h-9 rounded-full mt-4"
          >
            <Text className="text-lg font-regular text-center">Share profile</Text>
          </TouchableOpacity>

          <View className="flex justify-center items-center bg-white w-40 h-9 rounded-full mt-4">
            <Text className="text-lg font-regular text-center">Notifications</Text>
          </View>
        </View>

        {/*Statistiky (časem)*/}
        <View className="hidden flex-row gap-16 justify-center mt-5">
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
          <View className={`w-full rounded-xl min-h-[64px] mt-3 px-8 py-4 relative ${isEditingBio ? 'bg-[#2A2A2A]' : 'bg-[#171717]'}`}>
            {!isEditingBio && bio.trim() === '' && (
              <View className="absolute inset-0 justify-center items-center">
                <Text className="text-[#575757] text-lg font-regular text-center">
                  Something about you
                </Text>
              </View>
            )}

            {isEditingBio ? (
              <TextInput
                value={bio}
                onChangeText={(text) => {
                  if (text.length <= 100) { // Limit bio to 100 characters
                    setBio(text);
                  }
                }}
                onBlur={() => setIsEditingBio(false)}
                className="text-[#D4D4D4] text-lg font-regular"
                placeholder="Something about you"
                placeholderTextColor="#575757"
                multiline
                style={{ textAlignVertical: 'top' }}
              />
            ) : (
              bio.trim() !== '' && (
                <Text className="text-[#D4D4D4] text-lg font-regular flex-wrap">{bio}</Text>
              )
            )}

            <TouchableOpacity
              onPress={() => setIsEditingBio(true)}
              className="absolute right-0 top-1/2 mr-4"
            >
              <EditIcon width={18} height={18} />
            </TouchableOpacity>
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