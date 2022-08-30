import React from "react";
import { Link } from "react-scroll";

const Pagination = ({ pageNumbers, paginate, currentPage}) => {
    return (
           <ul className="pagination">
            {
                pageNumbers.map(number => (
                    <li className={(currentPage == number ? "pagination-item-active" : "")} onClick={() => paginate(number)} key={number}>
                        <Link className={(currentPage == number ? "pagination-link-active" : "")} to='companies' spy={true} smooth={true} offset={-80} duration={500} onClick={() => paginate(number)}>{number}</Link>
                    </li>
                ))
            }
            </ul>
        
    )
}

export {Pagination}