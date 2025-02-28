import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { AuthHeader } from '../../components/authFront/AuthHeader';
import { Input } from '../../components/authFront/Input';
import { SidePicture } from '../../components/authFront/SidePicture';
import { Button } from '../../components/authFront/Button';

const Auth = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showLogin, setShowLogin] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Form submitted:', formData);
      
    }
  };



  const handleCreateAccount = () => {
    if( showLogin)
    {
      setShowLogin(false);
      console.log("showLogin", formData);
    }
    else{
      setShowLogin(true);
      console.log("showLogin", formData);

    }

  };

  return (
    <section className="login-section">
      <div className="login-container">
        <SidePicture/>
        
        <div className="login-form-container">
          <AuthHeader showLogin={showLogin} />
          
          <form className="login-form" onSubmit={handleSubmit}>
            {!showLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input param={'email'} type={'email'} formData={formData} handleChange={handleChange} errors={errors} />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input param={'password'} type={'password'} formData={formData} handleChange={handleChange} errors={errors} />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            {showLogin ? (
              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
              </div>
            ) : (
              <div className="form-group">
                <div className="terms-agreement">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms || false}
                    onChange={handleChange}
                    className={errors.agreeTerms ? 'error' : ''}
                  />
                  <label htmlFor="agreeTerms">I agree to the Terms and Privacy Policy</label>
                </div>
                {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
              </div>
            )}
            
            <button type="submit" className="login-button">
              {showLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          
            <>
              <div className="login-separator">
                <span>Or</span>
              </div>
              
              <div className="create-account-container">
                <Button showLogin={showLogin} handler={handleCreateAccount} type={'button'} className={'create-account-button'} />
              </div>
            </>
        </div>
      </div>
    </section>
  );
};

export default Auth;