// import { useState } from 'react';

// const [values, onChange] = useForm({ email: "", password: "" })

// values // {email: string, password: string}
// onChange // (event) => void


// // import { useState } from 'react';

// export function useForm(inputValues = {}) {
//   const [values, setValues] = useState(inputValues);

//   const handleChange = (event) => {
//     const { value, name } = event.target;
//     setValues({ ...values, [name]: value });
//   };
//   return { values, handleChange, setValues };
// }