import { useState, useEffect } from 'react';

import { ArrCompanies } from '../arrcompanies';
import { Pagination } from '../pagination';

const Companies = ({t, language, setIdCompany}) => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [companiesPerPage] = useState(3);
  
    useEffect( () => {
      const getCompanies = async () => {
        setLoading(true);
        const res = await fetch('https://farm-kg.herokuapp.com/company/', {method: "GET"})
        .then(res => res.json())
        .then(data => setCompanies(data));
        setLoading(false)
      }
  
      getCompanies()
    }, [])
  
    const lastCompanieIndex = currentPage * companiesPerPage;
    const fistCompaniesIndex = lastCompanieIndex - companiesPerPage;
    const currentCompanies = companies.slice(fistCompaniesIndex, lastCompanieIndex);
  
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage( prev => prev + 1);
    const backPage = () => setCurrentPage( prev => prev - 1);

    return (
           <div className='companies'>
          <div className='companiesNav'>
            <div className="btnBack" onClick={backPage}></div>
              <Pagination 
            companiesPerPage={companiesPerPage}
            totalCompanies={companies.length}
            paginate={paginate}
          />
            <div className="btmNext" onClick={nextPage}></div> 
          </div>
            <ArrCompanies companies={currentCompanies} loading={loading} t={t} language={language} setIdCompany={setIdCompany} />
        </div>
  )
}

export {Companies}