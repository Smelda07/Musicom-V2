import { postSchema } from './EventSchemaPost';
import { DynamicForm } from '../../DynamicForm';

export const EventCreatePostForm = () => {
  const handleCreate = (formData) => {
    console.log("Vytvářím příspěvek o akci:", formData);
  };

  return (
    <DynamicForm 
      schema={postSchema} 
      onSubmit={handleCreate} 
      submitText="Publikovat akci" 
    />
  );
};