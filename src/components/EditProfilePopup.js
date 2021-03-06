import { Input } from './Input';
import { PopupWithForm } from './PopupWithForm';
import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const EditProfilePopup = ({ isOpen, onUpdateUser, isLoading, onClose }) => {
	const currentUser = useContext(CurrentUserContext);
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [validly, setValidly] = useState({});

	useEffect(() => {
		setValues({ name: currentUser.name, about: currentUser.about });
		setErrors({ name: '', about: '' });
		setValidly({ name: true, about: true });
	}, [currentUser, isOpen]);

	const handleChange = event => {
		const { name, value, validity, validationMessage } = event.target;
		setValues({ ...values, [name]: value });
		setErrors({ ...errors, [name]: validationMessage });
		setValidly({ ...validly, [name]: validity.valid });
	};

	const handleSubmit = e => {
		e.preventDefault();
		onUpdateUser(values, e);
	};

	const buttonText = isLoading ? 'Сохранение...' : 'Сохранить';

	return (
		<PopupWithForm
			isOpen={isOpen}
			name="profile"
			title="Редактировать профиль"
			buttonText={buttonText}
			onSubmit={handleSubmit}
			onClose={onClose}
			isDisabled={!(validly.name && validly.about)}
		>
			<Input
				className="profile-name"
				name="name"
				placeholder="Введите имя"
				type="text"
				value={values.name}
				handleChange={handleChange}
				required
				minLength={2}
				maxLength={40}
				autoComplete="off"
				validationMessage={errors.name}
			/>

			<Input
				className="profile-info"
				name="about"
				placeholder="Введите профессию"
				type="text"
				value={values.about}
				handleChange={handleChange}
				required
				minLength={2}
				maxLength={200}
				autoComplete="off"
				validationMessage={errors.about}
			/>
		</PopupWithForm>
	);
};
