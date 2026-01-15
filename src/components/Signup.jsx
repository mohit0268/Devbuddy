import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
import BASE_URL from '../../utils/CONSTANTS';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    password: '',
    age: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!nameRegex.test(formData.firstName.trim())) {
      newErrors.firstName = "First name must be at least 2 letters.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Invalid email address.";
    }

    if (!["male", "female", "other"].includes(formData.gender)) {
      newErrors.gender = "Please select a gender.";
    }

    const ageNum = Number(formData.age);
    if (!ageNum || ageNum < 18 || ageNum > 100) {
      newErrors.age = "Age must be between 18 and 100.";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must include 8+ chars, uppercase, lowercase, number & special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const signupHandler = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      const res = await axios.post(BASE_URL + '/signup', formData, {
        withCredentials: true,
      });

      const userData = res.data?.data || res.data;
      dispatch(addUser(userData));
      navigate('/feed');
    } catch (err) {
      setServerError(err.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center py-8 px-4">
      <div className="card bg-neutral max-w-md w-full shadow-xl">
        <div className="card-body p-8">
          <h2 className="card-title justify-center text-2xl font-bold">Create Account</h2>

          <div className="grid grid-cols-2 gap-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                name="firstName"
                type="text"
                className="input w-full"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className="text-error text-xs">{errors.firstName}</p>}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                name="lastName"
                type="text"
                className="input w-full"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className="text-error text-xs">{errors.lastName}</p>}
            </fieldset>
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email address</legend>
            <input
              name="email"
              type="email"
              className="input w-full"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-error text-xs">{errors.email}</p>}
          </fieldset>

          <div className="grid grid-cols-2 gap-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <select
                name="gender"
                className="select select-bordered w-full"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-error text-xs">{errors.gender}</p>}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                name="age"
                type="number"
                className="input w-full"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <p className="text-error text-xs">{errors.age}</p>}
            </fieldset>
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              name="password"
              type="password"
              className="input w-full"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-error text-xs">{errors.password}</p>}
          </fieldset>

          {serverError && <p className="text-error text-sm mt-2">{serverError}</p>}

          <div className="card-actions justify-center mt-4">
            <button
              className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
              onClick={signupHandler}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Sign Up'}
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
