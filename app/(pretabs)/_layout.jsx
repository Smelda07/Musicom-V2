import { useRouter, usePathname, Stack } from 'expo-router';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import BackArrow from '../../assets/icons/auth-icons/BackArrow.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import NextPageButton from '../../components/NextPageButton';
import NextPageArrow from '../../assets/icons/pretabs-icons/NextPageArrow';
import { useSurveyStore } from "../../context/useSurveyStore";
import { Platform } from 'react-native';

const Wrapper = Platform.OS === 'web' ? View : SafeAreaView;

const OnBoardingLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { role, chosenInstruments, chosenGenres, chosenGender, birthYear, locality, organizationNames, chosenEvents } = useSurveyStore();

  // Tři různé mapy kroků podle role
  const stepsMappingByRole = {
    musician: {
      '/onBoarding_instruments': 1,
      '/onBoarding_genres': 2,
      '/onBoarding_locality': 3,
      '/onBoarding_gender': 4,
      '/onBoarding_age': 5,
      '/summaryScreen': 6,
    },
    organizer: {
      '/onBoarding_organization': 1,
      '/onBoarding_locality': 2,
      '/onBoarding_events': 3,
      '/onBoarding_genres': 4,
      '/summaryScreen': 5,
    },
    fan: {
      '/onBoarding_genres': 1,
      '/onBoarding_locality': 2,
      '/summaryScreen': 3,
    }
  };

  const stepsMapping = stepsMappingByRole[role] || stepsMappingByRole["fan"];
  const totalSteps = Object.keys(stepsMapping).length;
  const currentStep = stepsMapping[pathname] || 1;

  // Otázky dynamicky podle role
  const questionsByRole = {
    musician: {
      1: 'What instruments do you play?',
      2: 'What genre do you prefer?',
      3: 'Where are you located?',
      4: 'Are you male or female?',
      5: 'How old are you?',
      6: 'Recapitulation of the questionnaire',
    },
    organizer: {
      1: 'What is the name of your organization?',
      2: 'Where is your venue located?',
      3: 'What type of events do you organize?',
      4: 'Which genres do you prefer?',
      5: 'Recapitulation of the questionnaire',
    },
    fan: {
      1: 'What genre do you prefer?',
      2: 'Where are you from?',
      3: 'Recapitulation of the questionnaire',
    },
  };

  const question = questionsByRole[role]?.[currentStep];

  // Validace podle role
  const isStepCompleted = () => {
    if (role === "musician") {
      switch (currentStep) {
        case 1: return chosenInstruments.length > 0;
        case 2: return chosenGenres.length > 0;
    //  case 3: return locality.country && locality.state && locality.city;
        case 4: return chosenGender;
        case 5:
          let actualDate = new Date();
          return birthYear > actualDate.getFullYear()-100 && (actualDate.getFullYear() - birthYear) > 13;
        default: return true;
      }
    }

    // Organizer
    if (role === "organizer") {
      switch (currentStep) {
        case 1: return (organizationNames?.[0] || "")?.length > 2;
        case 2: return locality.country && locality.state && locality.city;
        case 3: return chosenEvents?.length > 0;
        case 4: return chosenGenres?.length > 0;
        default: return true;
      }
    }

    // Fan
    if (role === "fan") {
      switch (currentStep) {
        case 1: return chosenGenres.length > 0;
        case 2: return locality.country && locality.state && locality.city;
        default: return true;
      }
    }
  };

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
    router.push('/home');
  };

  return (
    <SafeAreaView className="bg-primary h-full px-7">

      {/* Header */}
      <TouchableOpacity onPress={() => router.push('/selection')} className="pt-8">
        <BackArrow width={30} height={30} />
      </TouchableOpacity>

      {/* Progress */}
      <Text className="text-md font-semibold text-white text-center mt-4">
        {currentStep}/{totalSteps} steps
      </Text>

      <View className="h-1.5 bg-[#2D2D2D] rounded-full mt-2">
        <View
          style={{
            width: `${(currentStep / totalSteps) * 100}%`,
            backgroundColor: '#7D7D7D',
            height: '100%',
            borderRadius: 5,
          }}
        />
      </View>

      <Text className="text-3xl text-[#3CFFDF] font-medium text-center mt-12">Musicom</Text>
      <Text className="text-white text-xl font-semibold text-center mt-6">{question}</Text>

      <View className="h-[1px] bg-[#1D1D1D] w-full mt-10 rounded-full"></View>

      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }} />
        {children}
      </View>

      {/* Buttons */}
      <View className={`py-10 flex-row ${currentStep === 1 ? "justify-end" : "justify-between"}`}>
        {currentStep > 1 && (
          <NextPageButton
            title="Last page"
            handlePress={goToLastPage}
            containerStyles="w-48"
            Icon={<NextPageArrow width={16} height={16} style={{ transform: [{ rotate: '180deg' }] }} />}
            iconPosition="left"
          />
        )}

        {currentStep === totalSteps ? (
          <TouchableOpacity onPress={submitSurvey} className="w-48 bg-blue-500 p-3 rounded-lg">
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
    </SafeAreaView>
  );
};

export default OnBoardingLayout;