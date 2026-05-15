import { postSchema } from './BandSchemaPost';
import { DynamicForm } from '../../DynamicForm';

export const BandCreatePostForm = () => {
  const handleCreate = (formData) => {
    console.log("Vytvářím příspěvek:", formData);
  };

  return (
    <DynamicForm 
      schema={postSchema} 
      onSubmit={handleCreate} 
      submitText="Publikovat příspěvek" 
    />
  );
};