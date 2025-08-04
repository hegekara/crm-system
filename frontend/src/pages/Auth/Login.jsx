import React, { useState } from 'react';
import { apiFetch } from '../../api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await apiFetch("/api/auth/login", {
                method: "POST",
                body: {
                    "username": username,
                    "password": password
                }
            });

            console.log(response);

            if (response.status === 200 && response.data) {
                const { id, token } = response.data;

                localStorage.setItem('userId', id);
                localStorage.setItem('token', token);

                navigate("/home");
            } else if (response.status === 204) {
                console.log("Kullanıcı bulunamadı.");
            } else {
                throw new Error(`Hata kodu: ${response.status}`);
            }
        } catch (err) {
            console.error("Giriş hatası:", err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" value={username}
                            onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
