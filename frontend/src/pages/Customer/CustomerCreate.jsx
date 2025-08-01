import React, { useState } from 'react';
import { apiFetch } from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../../components/Header';

const CreateCustomer = () => {
    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '',
        tckn: '',
        phoneNumber: '',
        email: '',
        businessName: '',
        businessAddress: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
    };

    const checkUserValidation = () => {

        const isOnlyDigits = (str, length) => {
            if (str.length !== length) return false;
            for (let char of str) {
                if (isNaN(char) || char === ' ') return false;
            }
            return true;
        };

        if (!isOnlyDigits(customer.tckn, 11)) {
            setError("TCKN 11 haneli ve sadece rakamlardan oluşmalıdır.");
            return false;
        }

        if (!isOnlyDigits(customer.phoneNumber, 11)) {
            setError("Telefon numarası 11 haneli ve sadece rakamlardan oluşmalıdır.");
            return false;
        }

        setError(null);
        return true;
    };


    const handleCreate = async () => {
        setError(null)
        setSuccess(null)
        if(!checkUserValidation()){
            alert("Geçersiz alan var");
            return;
        } 
        
        try {
            const response = await apiFetch(`/api/customer/create`, {
                method: 'POST',
                body: customer
            });
            if (response.ok) {
                setSuccess(true);
                setCustomer({
                    firstName: '',
                    lastName: '',
                    tckn: '',
                    phoneNumber: '',
                    email: '',
                    businessName: '',
                    businessAddress: ''
                });
            } else {
                if(response.status == 400){
                    throw new Error(`Müşteri oluşturulamadı: Geçersiz Alan`);
                }
                
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h3 className="mb-4">Yeni Müşteri Oluştur</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">Müşteri başarıyla oluşturuldu.</div>}
                <div className="card m-4 p-4 shadow">
                    <div className="mb-3">
                        <label className="form-label">Müşteri Adı</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            placeholder="Müşteri Adı"
                            value={customer.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Müşteri Soyadı</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            placeholder="Müşteri Soyadı"
                            value={customer.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">TCKN</label>
                        <input
                            type="text"
                            className="form-control"
                            name="tckn"
                            placeholder="TCKN"
                            value={customer.tckn}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Telefon Numarası</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            placeholder="Telefon Numarası"
                            value={customer.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">E-posta</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="E-posta"
                            value={customer.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">İşyeri Adı</label>
                        <input
                            type="text"
                            className="form-control"
                            name="businessName"
                            placeholder="İşyeri Adı"
                            value={customer.businessName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">İşyeri Adresi</label>
                        <input
                            type="text"
                            className="form-control"
                            name="businessAddress"
                            placeholder="İşyeri Adresi"
                            value={customer.businessAddress}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleCreate}>Oluştur</button>
                </div>
            </div>
        </>
    );
};

export default CreateCustomer;
