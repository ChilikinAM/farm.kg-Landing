import { useState, useEffect } from 'react';

import { ArrCompanies } from '../arrcompanies';
import { Pagination } from '../pagination';

const Companies = ({t, language, setIdCompany}) => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [companiesPerPage] = useState(6);
  
    useEffect( () => {
      const getCompanies = async () => {
        setLoading(true);
        const res = await fetch('https://farmkg1.herokuapp.com/company/', {method: "GET"});
        const data = await res.json();
        setCompanies(data);
        setLoading(false)
      }
  
      getCompanies()
    }, [])

    const totalCompanies = companies.length
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalCompanies / companiesPerPage); i++) {
        pageNumbers.push(i);
    }
  
    const lastCompanieIndex = currentPage * companiesPerPage;
    const fistCompaniesIndex = lastCompanieIndex - companiesPerPage;
    const currentCompanies = companies.slice(fistCompaniesIndex, lastCompanieIndex);
  
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage( prev => prev + 1);
    const backPage = () => setCurrentPage( prev => prev - 1);

    return (
           <div className='companies'>
          <div className='companiesNav'>
            <div className="btnBack" disabled={(currentPage === 1 ? "disabled" : "")} onClick={backPage}></div>
              <Pagination 
            paginate={paginate}
            currentPage={currentPage}
            pageNumbers={pageNumbers}
          />
            <div className="btmNext" disabled={(currentPage === (pageNumbers.length) ? "disabled" : "")} onClick={nextPage}></div> 
          </div>
            <ArrCompanies companies={currentCompanies} loading={loading} t={t} language={language} setIdCompany={setIdCompany} />
        </div>
  )
}

export {Companies}