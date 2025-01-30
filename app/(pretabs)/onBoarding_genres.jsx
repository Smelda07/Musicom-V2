import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import NextPageButton from '../../components/NextPageButton';
import NextPageArrow from '../../assets/icons/pretabs-icons/NextPageArrow';
import StepBackArrow from '../../assets/icons/pretabs-icons/StepBackArrow';

const genres = [
  "Rock", "Heavy metal", "Jazz", "Hip hop", "Blues",
  "Death metal", "Thrash metal", "Reggae", "Classical"
];

const OnBoardingGenres = () => {
  return (
    <>
      <ScrollView className="bg-primary">
        <View className="mx-4">
          <Text className="text-lg text-white mt-6">
            The most common
          </Text>
          <View className="flex-row flex-wrap gap-x-2 gap-y-3 mt-5">
            {genres.map((genre, index) => (
              <TouchableOpacity 
                key={index} 
                className="bg-[#00836D] rounded-full px-4 py-2 w-auto"
              >
                <Text className="text-white font-semibold text-center text-base">
                  {genre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text className="text-lg text-white mt-8">
            Something else?
          </Text>
        </View>
      </ScrollView>
      
      <View className="bg-primary flex justify-center py-10">
        <View className=" flex flex-row justify-between">
          <NextPageButton
            title="Step back"
            handlePress={() => router.push('/onBoarding_instruments')}
            containerStyles="w-48"
            Icon={<StepBackArrow width={16} height={16} />}
            iconPosition="left"
          />
          <NextPageButton
            title="Next page"
            handlePress={() => router.push('/onBoarding_locality')}
            containerStyles="w-48"
            Icon={<NextPageArrow width={16} height={16} />}
            iconPosition="right"
          />
        </View>
      </View>
    </>
  );
};

export default OnBoardingGenres;
