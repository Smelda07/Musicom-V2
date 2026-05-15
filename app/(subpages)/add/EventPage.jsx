import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { EventCreatePostForm } from '../../../components/Forms/Post/Event/EventCreatePostForm';

export const EventPage = () => {
  const handleSuccess = () => { alert('Akce vytvořena!'); };
  const handleCancel = () => { alert('Cancel vole'); };

  return (
    <SafeAreaView>
      <ScrollView className="bg-primary px-4">
        <EventCreatePostForm 
          onSuccess={handleSuccess} 
          onCancel={handleCancel} 
        />
      </ScrollView>
    </SafeAreaView>
  );
}


export default EventPage;