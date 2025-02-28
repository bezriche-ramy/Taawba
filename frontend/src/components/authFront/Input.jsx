export const Input = ({type, formData, param, handleChange, errors,placeholder}) => {
    return (
        <input
            type={type}
            id={param}
            name={param}
            placeholder={placeholder}
            value={formData[param] || ''}
            onChange={handleChange}
            className={errors[param] ? 'error' : ''}
        />
    )
}