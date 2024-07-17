import { useDispatch } from 'react-redux';
import { add } from '../../features/list/listSlice';
import classes from './Modal.module.sass';

// eslint-disable-next-line react/prop-types
export default function Modal({ state, setState }) {
	function toggleModal() {
		setState((prevState) => !prevState);
	}

	const dispatch = useDispatch();

	function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		dispatch(
			add({
				id: new Date().toLocaleString(),
				title: formData.get('title'),
				description: formData.get('description'),
				date: formData.get('date'),
				status: 'active',
			})
		);

		setState(false);
	}

	return (
		state && (
			<div className={classes.modal}>
				<form className={classes.modal__content} onSubmit={handleSubmit}>
					<div className={classes.modal__close_container}>
						<div className={classes.modal__close} onClick={toggleModal}></div>
					</div>
					<div className={classes.modal__input}>
						<label>Title:</label>
						<input placeholder='task title...' name='title' required />
					</div>
					<div className={classes.modal__textarea}>
						<label>Description:</label>
						<textarea
							placeholder='task description...'
							name='description'
							required
						/>
					</div>
					<div className={classes.modal__input}>
						<label>Date:</label>
						<input type='date' name='date' required />
					</div>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<button className={classes.modal__button}>Add task</button>
					</div>
				</form>
			</div>
		)
	);
}
