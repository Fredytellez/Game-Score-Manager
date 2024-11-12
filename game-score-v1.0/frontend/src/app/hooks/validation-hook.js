import { useState } from 'react';

const useValidationHook = () => {
  const [errors, setErrors] = useState({});

  const validate = (fields) => {
    const newErrors = {};
    if (fields.username && fields.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
    }
    if (fields.password && fields.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (fields.password && fields.confirmPassword && fields.password !== fields.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default useValidationHook;
