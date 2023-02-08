//read to tutorial how to make a scroll to top
// https://stackabuse.com/how-to-scroll-to-top-in-react-with-a-button-component/
import React from 'react';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'phosphor-react';

const ScrollToTop = () => {
// control the visibility of the "scroll-to-top" button,
const [showTopBtn, setShowTopBtn] = useState(false);
useEffect(() => {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    });
}, []);
const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

    return (
        <div className="topToBtn">
            {" "}
            {showTopBtn && (
                <ArrowUp className="iconPosition iconStyle" size={32} onClick={goToTop} />
            )}{" "}
        </div>
    );
};

export default ScrollToTop;

