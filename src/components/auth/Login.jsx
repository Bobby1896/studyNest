import { useState } from "react";
import AuthInput from "./AuthInput";
import { authService } from "../../service/api";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (content) => {
    setLoading(true);
    try {
      const { data } = await authService.login(content);
      login(data.token);
    } catch (error) {
      toast.error(error?.response?.data?.error ||"login Failed")
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleLogin(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AuthInput
        icon={"mail"}
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        errors={errors.email}
      />

      <AuthInput
        icon={"lock"}
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        errors={errors.password}
      />

      <button
        disabled={loading}
        className="auth-btn first"
        type="submit"
        role="button"
      >
        {loading ? "Loading" : "Login"}
      </button>
    </form>
  );
};

export default Login;
