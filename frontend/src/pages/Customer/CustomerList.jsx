import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../../components/Header';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [error, setError] = useState(null);

    const fetchCustomers = async () => {
        try {
            const response = await apiFetch("/api/customer/list/dto");
            if (response.ok) {
                setCustomers(response.data);
            } else {
                throw new Error(`Hata kodu: ${response.status}`);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchCustomerById = async (id, forEdit = false) => {
        try {
            const response = await apiFetch(`/api/customer/get/${id}`);
            if (response.ok) {
                console.log(response.data);
                
                setSelectedCustomer(response.data);
                setIsEdit(forEdit);
                setShowModal(true);
            } else {
                throw new Error(`Müşteri alınamadı: ${response.status}`);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await apiFetch(`/api/customer/delete/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchCustomers();
            } else {
                throw new Error(`Silme hatası: ${response.status}`);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await apiFetch(`/api/customer/update/${selectedCustomer.id}`, {
                method: 'PUT',
                body: selectedCustomer,
            });
            if (response.ok) {
                setShowModal(false);
                fetchCustomers();
            } else {
                throw new Error(`Güncelleme hatası: ${response.status}`);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleInputChange = (e) => {
        setSelectedCustomer({
            ...selectedCustomer,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <>
            <Header />
            <div className="container mt-4">
                <h2 className="mb-4">Müşteri Listesi</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Ad</th>
                            <th>Soyad</th>
                            <th>Telefon</th>
                            <th>Email</th>
                            <th>İşletme Adı</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.phoneNumber}</td>
                                <td>{customer.email}</td>
                                <td>{customer.businessName}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => fetchCustomerById(customer.id, false)}
                                        title="Görüntüle"
                                    >
                                        <i className="bi bi-eye"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-warning me-2"
                                        onClick={() => fetchCustomerById(customer.id, true)}
                                        title="Düzenle"
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(customer.id)}
                                        title="Sil"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>




    {/* modal section*/ }
            {showModal && selectedCustomer && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isEdit ? 'Müşteri Düzenle' : 'Müşteri Detayları'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    {["tckn", "firstName", "lastName", "phoneNumber", "email", "businessName", "businessAddress"].map((field) => (
                                        <div className="mb-3" key={field}>
                                            <label className="form-label">{field}</label>
                                            <input
                                                type="text"
                                                name={field}
                                                className="form-control"
                                                value={selectedCustomer[field]}
                                                onChange={handleInputChange}
                                                placeholder={field}
                                                disabled={!isEdit}
                                            />
                                        </div>
                                    ))}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Kapat
                                </button>
                                {isEdit && (
                                    <button className="btn btn-success" onClick={handleUpdate}>
                                        Kaydet
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomerList;