import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import NextPageButton from '../../components/NextPageButton';
import NextPageArrow from '../../assets/icons/pretabs-icons/NextPageArrow';
import StepBackArrow from '../../assets/icons/pretabs-icons/StepBackArrow';

const OnBoardingAge = () => {
  return (
    <>
      <ScrollView className="bg-primary">
        <View>

        </View>
      </ScrollView>
      <View className="bg-primary flex justify-center py-10">
        <View className=" flex flex-row justify-between">
          <NextPageButton
            title="Step back"
            handlePress={() => router.push('/onBoarding_gender')}
            containerStyles="w-48"
            Icon={<StepBackArrow width={16} height={16} />}
            iconPosition="left"
          />
          <NextPageButton
            title="Next page"
            handlePress={() => router.push('')}
            containerStyles="w-48"
            Icon={<NextPageArrow width={16} height={16} />}
            iconPosition="right"
          />
        </View>
      </View>
    </>
  );
};

export default OnBoardingAge;
