import React from 'react';
import "./FooterNav.css";


const FooterNav = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  

  return (

<footer id='fn_footer_container'>

    <div className="pagination-footer">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>&lt;</button>
      )}

      {pageNumbers.map((number, index) => {
        if (
          number === 1 ||
          number === totalPages ||
          Math.abs(number - currentPage) <= 1
        ) {
          return (
            <button
              key={index}
              className={number === currentPage ? 'active' : ''}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          );
        } else if (
          (index > 1 && index === currentPage - 2) ||
          (index < totalPages - 2 && index === currentPage + 1)
        ) {
          return <span key={index}>...</span>;
        } else {
          return null;
        }
      })}

      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>&gt;</button>
      )}
    </div>


          


</footer>

  );


  
};

export default FooterNav;