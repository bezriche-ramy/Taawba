export const Button = ({ showLogin, handler, type, className }) => {
    return (
        <button onClick={handler} className={className} type={type}>
            {showLogin ? 'Create Account' : 'Sign In'}
        </button>
    )
}