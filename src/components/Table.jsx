import React from 'react';

function Table({ products }) {
    return (
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Title</th>
                    <th>Price (INR)</th>
                    <th>SKU</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                        <td>{product.product_id}</td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.sku}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
