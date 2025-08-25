// Simple login function without Firebase
export const login = async (email, password) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple validation - you can customize this
  if (email && password) {
    // For demo purposes, accept any non-empty email/password
    // In a real app, you'd validate against your backend
    return {
      success: true,
      user: {
        email: email,
        displayName: email.split('@')[0], // Use email prefix as display name
        uid: 'user_' + Date.now() // Generate a simple user ID
      }
    };
  } else {
    throw new Error('Email and password are required');
  }
};