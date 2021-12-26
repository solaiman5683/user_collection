import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [users, setUsers] = useState(null);
	const [activeUser, setActiveUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	useEffect(() => {
		fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users')
			.then(response => response.json())
			.then(data => setUsers(data))
			.catch(error => setError(error))
			.finally(() => setIsLoading(false));
	}, []);
	if (isLoading) {
		return (
			<div className='loader'>
				<div></div>
			</div>
		);
	}
	if (error) {
		return (
			<div>
				<h1>Something went wrong, the user did not load from the API</h1>
			</div>
		);
	}
	console.log(activeUser);
	return (
		<div className='container'>
			<div>
				<div className='users'>
					<h2>Users List</h2>
					{users.length &&
						users.map(user => (
							<h3
								className={activeUser?.id === user.id ? 'active' : ''}
								key={user.id}
								onClick={() => setActiveUser(user)}>
								<img src='./avatar.svg' alt='' height='25px' width='25px' />
								{user.profile.firstName} {user.profile.lastName}
							</h3>
						))}
				</div>
				<div className='user-details'>
					<h2 className='title'>Users Details</h2>
					{activeUser?.id ? (
						<div className='user'>
							<p>
								<img src={activeUser?.avatar} alt='' className='userImage' />
							</p>
							<h4>@{activeUser?.profile.username}</h4>
							<textarea
								type='text'
								className='bio'
								placeholder={activeUser?.Bio}
							/>
							<div className='name-field'>
								<label htmlFor='fullName'>Full Name:</label>
								<input
									type='text'
									placeholder={`${activeUser?.profile.firstName} ${activeUser?.profile.lastName}`}
								/>
							</div>
							<div className='jobTitle'>
								<label htmlFor='job'>Job Title:</label>
								<input type='text' placeholder={activeUser?.jobTitle} />
							</div>
							<div className='email'>
								<label htmlFor='email'>Email:</label>
								<input
									type='text'
									placeholder={`${activeUser?.profile.firstName} ${activeUser?.profile.email}`}
								/>
							</div>
						</div>
					) : (
						<h1>No user Selected</h1>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
