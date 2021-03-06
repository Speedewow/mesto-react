export const Input = ({ className, name, value, handleChange, validationMessage, ...props }) => {
	return (
		<>
			<input
				{...props}
				className={`popup__input ${className}-input`}
				name={name}
				value={value || ''}
				onChange={handleChange}
			/>
			<span name={name} className={`popup__error ${className}-error`}>
				{validationMessage}
			</span>
		</>
	);
};
