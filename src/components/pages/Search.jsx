import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Search = ({ t, language, result, setValue }) => {

    let navigate = useNavigate();

    const onImputActive = (id, name) => {
        navigate(`/${id}/${name}`);
        setValue('');
    }  
  

    return (
        <div className='companieRotate'>
            <div className="headPadding"></div>
             {result.map(companie => { return (
                  <div id={companie.id} className='companie' key={companie.id}><h1>{language === 'ru' ? companie.name_ru : companie.name_en}</h1>
                  <img src={companie.photo} alt={language === 'ru' ? companie.name_ru : companie.name_en}></img>
                  <div className='morebutton' onClick={() => onImputActive(companie.id, companie.name)}><h3>{t('companiesMore')}</h3></div></div>
                  )})}
            <div className="headPadding"></div>
        </div>
    )
}

export {Search};