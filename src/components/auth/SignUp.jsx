import { useState } from "react";
import AuthInput from "./AuthInput";
import SelectInput from "./SelectInput";
import { authService } from "../../service/api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const SignUp = () => {
  const courses = [
    { value: "Business Management", label: "Business Management" },
    { value: "Cyber Security", label: "Cyber Security" },
    { value: "Software Engineering", label: "Software Engineering" },
  ];

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    courseOfStudy: "",
    password: "",
    confirmPassword: "",
  });

  // State for errors
  const [errors, setErrors] = useState({});

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

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Institution validation
    if (!formData.institution.trim()) {
      newErrors.institution = "Institution is required";
    }

    // Course validation
    if (!formData.courseOfStudy) {
      newErrors.courseOfStudy = "Please select a course";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const response = await authService.register(data);

      if (response.status === 200) {
        toast.success("Sign up successfull");
        navigate("/login");
      } else {
        throw response;
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          "An error occured while registering, try again"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...dataToSubmit } = formData;
      handleRegister(dataToSubmit);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="name-wrapper">
        <AuthInput
          icon={"person"}
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          errors={errors.firstName}
        />
        <AuthInput
          icon={"person"}
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          errors={errors.lastName}
        />
      </div>

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
        icon={"institution"}
        name="institution"
        type="text"
        placeholder="Institution"
        value={formData.institution}
        onChange={handleChange}
        errors={errors.institution}
      />
      <SelectInput
        icon="course"
        name="courseOfStudy"
        placeholder="Select A Course"
        data={courses}
        value={formData.courseOfStudy}
        onChange={handleChange}
        errors={errors.courseOfStudy}
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

      <AuthInput
        icon={"lock"}
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        errors={errors.confirmPassword}
      />

      <button
        disabled={loading}
        className="auth-btn first"
        type="submit"
        role="button"
      >
        {loading ? "loading" : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUp;
