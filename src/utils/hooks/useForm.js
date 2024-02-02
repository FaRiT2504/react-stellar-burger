import { useState } from 'react';

export const useForm = (inputValues = {}) => {
  const [value, setValue] = useState(inputValues);

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return { value, setValue, onChange };
};