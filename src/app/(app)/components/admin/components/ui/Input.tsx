interface InputProps {
  className: string,
  value: any,
  placeholder: string,
  disable_value: boolean,
  onHandleChange: any
}

const Input = ({ className, value, placeholder, disable_value, onHandleChange }: InputProps) => {
  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      value={value}
      disabled={disable_value === true ? true : false}
      onChange={(e) => {
        onHandleChange(e);
      }}
    />
  );
};

export default Input;
