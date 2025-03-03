import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';
import { AuthHeader } from '../../components/authFront/AuthHeader';
import { Input } from '../../components/authFront/Input';
import { SidePicture } from '../../components/authFront/SidePicture';
import { Button } from '../../components/authFront/Button';
import { signUp } from '../../utils/signUp';
import { login } from '../../utils/login';


const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showLogin, setShowLogin] = useState(true);
  
  useEffect(() => {
    // Check URL query parameters for mode
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get('mode');
    if (mode === 'signup') {
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  }, [location]);

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setIsLoading(true); // Set loading state to true
      
      try {
        if(showLogin){
          const user = await login(formData.email, formData.password);
          if( user){
            const userData = sessionStorage.getItem("user");
            const user2 = userData ? JSON.parse(userData) : null;
            navigate('/')
          }
          else{
            alert("it didnt happen well ")
          }
        } else {
          //handle Signup
         
          const user = await signUp(formData.email, formData.password, formData.name);
          if(user){
            alert("Welcome " + user.displayName);
            navigate('/')
          } else {
            alert("Error creating user");
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setIsLoading(false);
      }
      finally{
        setIsLoading(false);
      }
    }
  };

  const handleCreateAccount = () => {
    if(showLogin) {
      setShowLogin(false);
      console.log("showLogin", formData);
    } else {
      setShowLogin(true);
      console.log("showLogin", formData);
    }
  };

  // CSS for the spinner


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
              <Input param={'email'} type={'email'} formData={formData} handleChange={handleChange} errors={errors} placeholder={'Enter Your Email'} />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input param={'password'} type={'password'} formData={formData} handleChange={handleChange} errors={errors} placeholder={'Enter Your Password'} />
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
                  <label htmlFor="rememberMe" style={{color: "#00875A"}}>Remember me</label>
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
                  <label htmlFor="agreeTerms" style={{margin:'0px'}}>I agree to the Terms and Privacy Policy</label>
                </div>
                {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
              </div>
            )}
            
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div 
                    className="spinner spinner-style" 
                  
                  />
                </>
              ) : (
                showLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>
          
          <>
            <div className="login-separator">
              <span>Or</span>
            </div>
            
            <div className="create-account-container">
              <Button 
                showLogin={showLogin} 
                handler={handleCreateAccount} 
                type={'button'} 
                className={'create-account-button'} 
                disabled={isLoading}
              />
            </div>
          </>
        </div>
      </div>

  
    </section>
  );
};

export default Auth;