import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { FormGroup } from './FormGroup';

export const DynamicForm = ({ schema, onSubmit, submitText = 'Odeslat' }) => {
  const initialState = schema.reduce((acc, field) => {
    acc[field.name] = field.defaultValue || '';
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialState);
  const handleChange = (text, name) => {
    setFormData({ ...formData, [name]: text });
  };
  const handleSubmit = () => {
    onSubmit(formData);
  };
  return (
    <View className="p-4 w-full max-w-sm border border-gray-300 rounded-lg">
      {schema.map((field) => (
        <FormGroup key={field.name} label={field.label}>
          {field.type === 'textarea' ? (
            <TextInput
              className="border border-gray-400 p-2 rounded-md text-black"
              value={formData[field.name]}
              onChangeText={(text) => handleChange(text, field.name)}
              multiline={true}
              numberOfLines={4}
            />
          ) : (
            <TextInput
              className="border border-gray-400 p-2 rounded-md text-black"
              value={formData[field.name]}
              onChangeText={(text) => handleChange(text, field.name)}
              secureTextEntry={field.type === 'password'}
              keyboardType={field.type === 'number' ? 'numeric' : 'default'}
            />
          )}
        </FormGroup>
      ))}
      <TouchableOpacity onPress={handleSubmit} className="bg-blue-500 p-3 rounded-md items-center mt-2">
        <Text className="text-white font-bold">{submitText}</Text>
      </TouchableOpacity>
    </View>
  );
};