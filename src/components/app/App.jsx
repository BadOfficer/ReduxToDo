import { useState } from 'react';
import { useSelector } from 'react-redux';
import Item from '../item/Item';
import Modal from '../modal/Modal';
import classes from './App.module.sass';

function App() {
	const list = useSelector((store) => store.list.items);

	const [showModal, setShowModal] = useState(false);

	function handleShowModal() {
		setShowModal(true);
	}

	const activeTasks = list.filter((item) => item.status === 'active');
	const completedTasks = list.filter((item) => item.status === 'done');

	return (
		<>
			<div className={classes.container}>
				<div className={classes.content}>
					<header className={classes.content__header}>
						<h1>Redux ToDo List</h1>
					</header>
					<div
						style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
					>
						<div className={classes.list}>
							<h2>In Process</h2>
							<div className={classes.list__items}>
								{activeTasks.length !== 0 &&
									activeTasks.map((item) => (
										<Item
											title={item.title}
											description={item.description}
											date={item.date}
											completed={item.status === 'done'}
											id={item.id}
											key={item.id}
										/>
									))}
								{activeTasks.length === 0 && (
									<p style={{ textAlign: 'center', fontSize: '25px' }}>
										List is empty!
									</p>
								)}
							</div>
						</div>
						<div className={classes.list}>
							<h2>Completed</h2>
							<div className={classes.list__items}>
								{completedTasks.length !== 0 &&
									completedTasks.map((item) => (
										<Item
											title={item.title}
											description={item.description}
											date={item.date}
											completed={item.status === 'done'}
											id={item.id}
											key={item.id}
										/>
									))}
								{completedTasks.length === 0 && (
									<p style={{ textAlign: 'center', fontSize: '25px' }}>
										List is empty!
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<button className='add-button' onClick={handleShowModal}>
				+
			</button>
			<Modal state={showModal} setState={setShowModal} />
		</>
	);
}

export default App;
