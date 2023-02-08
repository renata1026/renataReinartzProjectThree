import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';

const Navbar = (props) => {
    return (
    <div className='wrapper'>
        <div className='navbar'>
             <Link to='/'className= 'makeup'>makeup</Link>
                <button onClick={props.handleOpenCart} className='cartIcon'>
                    <ShoppingCart size={32}/>
                </button>
        </div>
    </div>
    );
}

export default Navbar
