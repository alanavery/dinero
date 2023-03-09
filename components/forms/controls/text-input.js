import { useField } from 'formik';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form__control">
      <label htmlFor={props.id}>{label}</label>

      <input type="text" {...field} {...props} />
      
      {meta.touched && meta.error && <div className="form__control__error">{meta.error}</div>}
    </div>
  );
};

export default TextInput;
