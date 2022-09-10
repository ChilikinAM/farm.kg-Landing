import React from "react";
import "./modal.css";

const Modal = ({active, setActive, children}) => {
    return (
        <div className={active ? "modal active" : "modal"}>
            <div className={active ? "modal__content active" : "modal_content"}>
                <div className="backicon" onClick={() => setActive(false)}></div>
                {children}
            </div>
        </div>
    );
};

export {Modal}