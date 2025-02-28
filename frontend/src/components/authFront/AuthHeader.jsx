
export  const AuthHeader = ({showLogin}) => {
return(
    <div className="login-header">
            <span className="welcome-text">{showLogin ? 'Welcome Back' : 'Join Us'}</span>
            <h2>{showLogin ? 'Sign In to Your Ramadan Journey' : 'Create Your Ramadan Account'}</h2>
            <p>{showLogin ? 'Continue your spiritual path and make the most of this blessed month.' : 'Begin your spiritual journey and connect with our Ramadan community.'}</p>
          </div>
)
}