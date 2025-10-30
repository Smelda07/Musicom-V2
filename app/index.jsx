import { ScrollView, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Musicom from '../assets/images/auth/letter-M-2.svg';
import CustomButton from '../components/CustomButton';
import SpotifyButton from '../components/SpotifyButton';
import FacebookButton from '../components/FacebookButton';
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { setUser } = useGlobalContext();

  const loginAsTestUser = () => {
    setUser({
      id: "test-user",
      email: "test@musicom.dev",
      username: "TestUser",
      firstname: "Corey",
      lastname: "Patton",
      role: "musician",
    });
    router.push('/selection');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="flex items-center">
          <ImageBackground 
            source={require('../assets/images/auth/artists-bg-2.png')}
            style={{ width: '100%', height: 350, justifyContent: 'center', alignItems: 'center' }}
          >
            <View className="flex items-center">
              <View className="mt-[280px]">
                <Musicom width={55} height={55}/>
              </View>
              <View>
                <Text className="text-white font-bold text-4xl text-center mt-9">Join the Musician</Text>
                <Text className="text-white font-bold text-4xl text-center mt-1"> Community</Text>
              </View>
            </View>
          </ImageBackground>

          <CustomButton
            title="Sign up for free"
            handlePress={() => router.push('/sign-up')}
            containerStyles="w-[85%] mt-24"
          />

          <SpotifyButton
            title="Continue with Spotify"
            handlePress={() => router.push('')}
            containerStyles="w-[85%] mt-3"
          />

          <FacebookButton
            title="Continue with Facebook"
            handlePress={() => router.push('')}
            containerStyles="w-[85%] mt-3"
          />

          <TouchableOpacity 
            activeOpacity={0.5} 
            onPress={() => router.push('/sign-in')}
          >
            <Text className="text-[#979797] text-lg font-medium mt-4">
              Already have an Account?
            </Text>
          </TouchableOpacity>

          {/* Testovací tlačítko pro rychlé přihlášení */}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={loginAsTestUser}
            style={{
              marginTop: 20,
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: '#3CFFDF',
              borderRadius: 8
            }}
          >
            <Text style={{ color: '#000', fontWeight: 'bold' }}>Login as Test User</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
