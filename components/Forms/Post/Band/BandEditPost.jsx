import { postSchema } from '../CreatePost/BandSchemaPost';
import { DynamicForm } from '../../components/DynamicForm';

export const EditPostForm = ({ postData }) => {
  const handleUpdate = (formData) => {
    console.log("Upravuji příspěvek ID", postData.id, "Nová data:", formData);
  };

  return (
    <DynamicForm 
      schema={postSchema} 
      initialData={postData} 
      onSubmit={handleUpdate} 
      submitText="Uložit změny" 
    />
  );
};