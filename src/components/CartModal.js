import React, { useRef, useEffect, useState, useCallback } from 'react';
import '../styles/cartModal.css';

const CartModal = ({ cartItems, onClose, onRemove, onRemoveAll }) => {
    const modalRef = useRef();
    const [isClosing, setIsClosing] = useState(false);
    const handleClickOutside = useCallback((event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsClosing(true);
            setTimeout(onClose, 300);
        }
    }, [onClose]);
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);
    const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    return (
        <div className={`cart-modal ${isClosing ? 'closing' : ''}`}>
            <div className="modal-content" ref={modalRef}>
                <span className="close" onClick={() => { setIsClosing(true); setTimeout(onClose, 300); }}>&times;</span>
                <h2>Shopping Cart</h2>
                <h3>Total Items: {totalItems}</h3>
                {totalItems === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <img src={item.product.imageUrl} alt={item.product.name} className="modal-image" />
                                <div>
                                    <h3>{item.product.name}</h3>
                                    <p>Price: ${item.product.price.toFixed(2)} x <span className="item-quantity">{item.quantity}</span></p>
                                    <button onClick={() => onRemove(item)}>
                                        {item.quantity > 1 ? 'Remove one' : 'Remove'}
                                    </button>
                                </div>
                            </li>
                        ))}
                        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                        <button onClick={onRemoveAll} className='removeAll'>Remove all</button>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CartModal;