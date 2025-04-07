import { useState } from "react";
import Icon from "../Icon";

const AuthInput = ({
  type,
  value,
  name,
  placeholder,
  icon,
  onChange,
  errors,
}) => {
  const [showPswrd, setShowPswrd] = useState(false);

  const togglePassword = () => {
    setShowPswrd(!showPswrd);
  };
  return (
    <div className="input-wrapper">
      <input
        type={showPswrd ? "text" : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Icon icon={icon} />
      {name?.toLowerCase().includes("password") && <button type="button" onClick={togglePassword}><Icon icon="eye" /></button>}
      {errors && <span className="error">{errors}</span>}
    </div>
  );
};

export default AuthInput;
