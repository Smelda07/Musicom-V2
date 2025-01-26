import { useRouter, usePathname, Stack } from 'expo-router';
import { Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BackArrow from '../../assets/icons/auth-icons/BackArrow.svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnBoardingLayout = ({ children, totalSteps = 5 }) => {
  const router = useRouter();
  const pathname = usePathname();

  const stepsMapping = {
    '/onBoarding_instruments': 1,
    '/onBoarding_genres': 2,
    '/onBoarding_locality': 3,
    '/onBoarding_gender': 4,
    '/onBoarding_age': 5,
  };

  const currentStep = stepsMapping[pathname] || 1;

  const questions = {
    1: 'What instruments do you play?',
    2: 'What genre do you play?',
    3: 'Where are you located?',
    4: 'Are you male or female?',
    5: 'How old are you?',
  };

  const question = questions[currentStep];

  return (
    <SafeAreaView>
      <View className="bg-primary h-full px-7">
        {/* Header */}
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            className="pt-8" 
            onPress={() => router.push('/sign-in')}
          >
            <BackArrow width={30} height={30} />
          </TouchableOpacity>
        </View>

        {/* Step Counter */}
        <View className="flex items-center px-4 pt-2">
          <Text className="text-md font-semibold text-white">
            {currentStep}/{totalSteps} steps
          </Text>
        </View>

        <View className="h-1.5 bg-[#2D2D2D] rounded-full mt-4">
          <View
            style={{
              width: `${(currentStep / totalSteps) * 100}%`,
              backgroundColor: '#7D7D7D',
              height: '100%',
              borderRadius: 5,
            }}
          />
        </View>

        <View>
          <Text className="text-3xl text-[#3CFFDF] text-roboto font-medium text-center mt-12">Musicom</Text>
          <Text className="text-white text-xl font-semibold text-center mt-6">{question}</Text>  
        </View>

        <View className="h-[2px] bg-[#2D2D2D] w-full mt-10 rounded-full"></View>

        {/* Obsah podstránky */}
        <View className="flex-1">    
          <Stack screenOptions={{ headerShown: false }} />
          {children}
        </View>

        <StatusBar backgroundColor="#060606"/>

      </View>
    </SafeAreaView>
  );
};


export default OnBoardingLayout;
