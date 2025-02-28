export const Input = ({type, formData, param, handleChange, errors}) => {
    return (
        <input
            type={type}
            id={param}
            name={param}
            placeholder="Enter your email"
            value={formData[param] || ''}
            onChange={handleChange}
            className={errors[param] ? 'error' : ''}
        />
    )
}