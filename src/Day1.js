import { useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const defaultLogin = {
        email: 'example@gmail.com',
        password: '123456',
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            if (password) {
                if (
                    email === defaultLogin.email &&
                    password === defaultLogin.password
                ) {
                    setIsLoggedIn(true);
                } else {
                    alert('Invalid email or password');
                    setIsLoggedIn(false);
                }
            } else {
                alert('Password is required');
            }
        } else {
            alert('Email is required');
        }
    };

    const handleEmailOnChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <div>
            {!isLoggedIn && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Email:</label>
                    <input
                        type='email'
                        id='name'
                        value={email}
                        onChange={handleEmailOnChange}
                    />
                    <label htmlFor='password'>Password:</label>
                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type='password'
                        id='password'
                    />
                    <button type='submit'>Form</button>
                </form>
            )}
            <div>
                {isLoggedIn && (
                    <button
                        onClick={() => {
                            setIsLoggedIn(false);
                        }}
                    >
                        Logout
                    </button>
                )}
                <h1>{isLoggedIn ? 'Logged in' : 'Not logged in'}</h1>
                <h1>{email}</h1>
                <h1>{password}</h1>
            </div>
        </div>
    );
}
