import { inputLabelClasses, TextField, TextFieldProps } from '@mui/material';

const FormInput = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      sx={{
        width: '100%',
        height: '56px',
        '& .MuiOutlinedInput-root': {
          color: '#101112',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E1E1E1',
            borderWidth: '1px',
            borderRadius: '8px',
          },
        },
        '& .MuiFormLabel-root.Mui-error': {
          color: '#A6ABB0',
        },
        '& .MuiInputLabel-outlined': {
          color: '#A6ABB0',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#526ED3',
        },
        '& label.Mui-focused': {
          color: '#A6ABB0'
        },
      }}
    />
  );
}

export default FormInput;
