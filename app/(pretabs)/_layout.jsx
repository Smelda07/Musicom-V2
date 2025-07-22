import { useRouter, usePathname, Stack } from 'expo-router';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BackArrow from '../../assets/icons/auth-icons/BackArrow.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import NextPageButton from '../../components/NextPageButton';
import NextPageArrow from '../../assets/icons/pretabs-icons/NextPageArrow';
import { useSurveyStore } from "../../context/useSurveyStore"; // Import store
import { updateUserProfile } from '../../lib/appwrite';
import { Platform } from 'react-native';
import { StyleSheet } from 'nativewind';

const Wrapper = Platform.OS === 'web' ? View : SafeAreaView;

const OnBoardingLayout = ({ children, totalSteps = 6 }) => {
  const router = useRouter();
  const pathname = usePathname();

  const stepsMapping = {
    '/onBoarding_instruments': 1,
    '/onBoarding_genres': 2,
    '/onBoarding_locality': 3,
    '/onBoarding_gender': 4,
    '/onBoarding_age': 5,
    '/summaryScreen': 6,
  };

  const currentStep = stepsMapping[pathname] || 1;

  const questions = {
    1: 'What instruments do you play?',
    2: 'What genre do you prefer?',
    3: 'Where are you located?',
    4: 'Are you male or female?',
    5: 'How old are you?',
    6: 'Recapitulation of the questionnaire',
  };

  const question = questions[currentStep];

  const isFirstPage = currentStep === 1;
  const isLastPage = currentStep === totalSteps;

  const { chosenInstruments, chosenGenres, chosenGender, birthYear, locality } = useSurveyStore();

  const isStepCompleted = () => {
    switch (currentStep) {
      case 1:
        return chosenInstruments.length > 0;
      case 2:
        return chosenGenres.length > 0;
      case 3:
        return locality.country && locality.state && locality.city;
      case 4:
        return chosenGender;
      case 5:
        let actualDate = new Date()
        return birthYear > actualDate.getFullYear()-100 && (actualDate.getFullYear() - birthYear) > 13;
      default:
        return true;
    }
  };

  // Přechod na další stránku s validací
  const goToNextPage = () => {
    if (!isStepCompleted()) {
      Alert.alert("Incomplete", "Please fill in all required fields before proceeding.");
      return;
    }

    const nextStep = Object.keys(stepsMapping).find(
      (key) => stepsMapping[key] === currentStep + 1
    );
    if (nextStep) router.push(nextStep);
  };

  const goToLastPage = () => {
    const lastStep = Object.keys(stepsMapping).find(
      (key) => stepsMapping[key] === currentStep - 1
    );
    if (lastStep) router.push(lastStep);
  };

  const submitSurvey = () => {
    console.log("Submitting survey..."); // Tady zavoláš Appwrite API
<<<<<<< Updated upstream
    console.log(chosenInstruments)
    updateUserProfile({
      
    })
=======
    router.push(1);
>>>>>>> Stashed changes
    /*submitToAppwrite*/
  };

  const styles = StyleSheet.create({
    outer: {
      flex: 1,
    },
    inner: {
      flex: 1
    }
  });
  

  return (
    <SafeAreaView style={styles.outer}>
        <View className="bg-primary h-full px-7" style={styles.inner}>
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

          <View className="h-[1px] bg-[#1D1D1D] w-full mt-10 rounded-full"></View>

          {/* Obsah podstránky */}
          <View className="flex-1">    
            <Stack screenOptions={{ headerShown: false }} />
            {children}
          </View>

          {/* Navigační tlačítka */}
          <View className={`bg-primary flex py-10 flex-row ${isFirstPage ? "justify-end" : "justify-between"}`}>
            {!isFirstPage && (
              <NextPageButton
                title="Last page"
                handlePress={goToLastPage}
                containerStyles="w-48"
                Icon={<NextPageArrow width={16} height={16} style={{ transform: [{ rotate: '180deg' }] }} />}
                iconPosition="left"
              />
            )}

            {isLastPage ? (
              <TouchableOpacity 
                onPress={submitSurvey}
                className="w-48 bg-blue-500 p-3 rounded-lg"
              >
                <Text className="text-white text-center">Submit</Text>
              </TouchableOpacity>
            ) : (
              <NextPageButton
                title="Next page"
                handlePress={goToNextPage}
                containerStyles="w-48"
                Icon={<NextPageArrow width={16} height={16} />}
                iconPosition="right"
              />
            )}
          </View>

          <StatusBar backgroundColor="#060606"/>
        </View>
    </SafeAreaView>
  );
};

export default OnBoardingLayout;
