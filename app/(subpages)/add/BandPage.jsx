import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { BandCreatePostForm } from '../../../components/Forms/Post/Band/BandCreatePostForm';

export const BandPage = () => {
  const handleSuccess = () => { alert('Příspěvek vytvořen!'); };
  const handleCancel = () => { alert('Cancel'); };

  return (
    <SafeAreaView>
      <ScrollView className="bg-primary px-4">
        <Text className="text-white text-2xl font-semibold mt-4 mb-6">
          Napsat fanouškům
        </Text>
        <Text className="text-sm text-neutral-500 mb-8">
          Tento příspěvek se zobrazí na zdi vaší kapely.
        </Text>

        <BandCreatePostForm 
          onSuccess={handleSuccess} 
          onCancel={handleCancel} 
        />
      </ScrollView>
    </SafeAreaView>
  );
}


export default BandPage;