import { useField } from 'formik';

const CheckboxInput = ({ children, ...props }) => {
  const [field, meta] = useField({
    ...props,
    type: 'checkbox',
  });

  return (
    <div className="form__control checkbox">
      <label>
        {children}
        <input type="checkbox" {...field} {...props} />
      </label>

      {meta.touched && meta.error && <div className="form__control__error">{meta.error}</div>}
    </div>
  );
};

export default CheckboxInput;
