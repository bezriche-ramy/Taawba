// Simple signup function without Firebase
export const signUp = async (email, password, displayName) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple validation - you can customize this
  if (email && password && displayName) {
    // For demo purposes, accept any non-empty values
    // In a real app, you'd validate and save to your backend
    return {
      success: true,
      user: {
        email: email,
        displayName: displayName,
        uid: 'user_' + Date.now() // Generate a simple user ID
      }
    };
  } else {
    throw new Error('Email, password, and display name are required');
  }
};