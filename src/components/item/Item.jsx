/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { done, remove } from '../../features/list/listSlice';
import { getCurrentDate } from '../../utils/getDate';
import classes from './Item.module.sass';

function Item({ title, description, date, id, completed = false }) {
	const [currentDate, setCurrentDate] = useState(getCurrentDate(new Date()));

	const dispatch = useDispatch();

	function handleDone() {
		dispatch(done(id));
	}

	function handleDelete(id) {
		dispatch(remove(id));
	}

	useEffect(() => {
		const updateDate = () => {
			setCurrentDate(getCurrentDate(new Date()));
		};

		updateDate();

		const now = new Date();
		const msUntilMidnight =
			new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0) -
			now;

		const midnightInterval = setTimeout(() => {
			updateDate();
			setInterval(updateDate, 24 * 60 * 60 * 1000);
		}, msUntilMidnight);

		return () => {
			clearTimeout(midnightInterval);
		};
	}, []);

	return (
		<div style={{ display: 'block' }}>
			<div className={classes.item}>
				<div
					className={classes.item__status}
					style={
						!completed
							? { backgroundColor: 'aquamarine' }
							: { backgroundColor: 'red' }
					}
				></div>
				<div className={classes.item__date}>
					{date === currentDate
						? 'TODAY'
						: `${date.split('-')[0] + '.' + date.split('-')[1]}`}
				</div>
				<div className={classes.item__data}>
					<h2 style={completed ? { textDecoration: 'line-through' } : {}}>
						{title}
					</h2>
					<p style={completed ? { textDecoration: 'line-through' } : {}}>
						{description}
					</p>
				</div>
				<div className={classes.item__buttons}>
					{!completed && (
						<button className={classes.item__done} onClick={handleDone}>
							Done
						</button>
					)}
					<button className={classes.item__delete} onClick={handleDelete}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default Item;
