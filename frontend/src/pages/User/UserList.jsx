import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { apiFetch } from '../../api';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await apiFetch("/api/user/list");
            console.log(response);

            setUsers(response.data)

        } catch (error) {
            console.error("Kullanıcılar alınırken hata oluştu:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await apiFetch(`/api/user/delete/${id}`, {
                method: 'DELETE',
            });
            if (response.status == 200) {
                fetchUsers();
            } else if (response.status == 204) {
                setError("Müşteri Bulunamadı")
            } else {
                throw new Error(`Hata kodu: ${response.status}`);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Header />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Kullanıcı Listesi</h2>
                    <button className="btn btn-primary" onClick={() => navigate('/user-create')}>Kullanıcı Oluştur</button>
                </div>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr className="text-center">
                            <th>Kullanıcı Adı</th>
                            <th>Ad</th>
                            <th>Soyad</th>
                            <th>Email</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">Kullanıcı bulunamadı</td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.userName}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => {
                                                const confirmed = window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?");
                                                if (confirmed) {
                                                    handleDelete(user.id);
                                                }
                                            }}
                                            title="Sil"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>

    );
}

export default UserList;
