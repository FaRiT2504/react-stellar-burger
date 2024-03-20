import { useState, FormEvent } from 'react';
import { Dispatch, SetStateAction } from "react";


export const useForm = <T>(inputValues: T) => {
  const [values, setValues] = useState<T>(inputValues);

  const onChange = (e: FormEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };

  return { values, onChange, setValues };
};


