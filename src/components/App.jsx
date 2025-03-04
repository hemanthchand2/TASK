import React, { useEffect, useState } from 'react';
import Table from './Table.jsx';
import '../styles.css';

function App() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        product_id: '',
        title: '',
        price: '',
        sku: ''
    });

    const loadProducts = async () => {
        try {
            const data = await window.api.readProduct();
            setProducts(data);
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    };
    useEffect(() => {
        loadProducts();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({
            product_id: '',
            title: '',
            price: '',
            sku: ''
        });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await window.api.addProduct(form);
            resetForm();
            await loadProducts(); 
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    };

    const inputFields = [
        { name: 'product_id', type: 'number', placeholder: 'Product ID' },
        { name: 'title', type: 'text', placeholder: 'Title' },
        { name: 'price', type: 'number', placeholder: 'Price' },
        { name: 'sku', type: 'text', placeholder: 'SKU' }
    ];

    return (
        <div className="App">
            <h1>Product Table</h1>
            <Table products={products} />
            <form id='frm' onSubmit={handleAddProduct}>
                <div>
                    {inputFields.map(({ name, type, placeholder }) => (
                        <input
                            key={name}
                            id='inp'
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            value={form[name]}
                            onChange={handleChange}
                            required
                        />
                    ))}
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default App;
