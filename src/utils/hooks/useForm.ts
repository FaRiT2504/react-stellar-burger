import { useState, FormEvent } from 'react';
import { Dispatch, SetStateAction } from "react";

interface IUseFormHook {
  [name: string]: string
}

type TUseFormHookReturn = [
  values: IUseFormHook,
  onChange: (event: FormEvent) => void,
  setValues: Dispatch<SetStateAction<IUseFormHook>>,
];

export const useForm = (inputValues: IUseFormHook = {}): TUseFormHookReturn => {
  const [values, setValues] = useState(inputValues);

  const onChange = (e: FormEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
    // setValue({ ...value, [e.target.name]: e.target.value });
  };

  return [values, onChange, setValues];
};


