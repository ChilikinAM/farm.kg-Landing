import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { Link, animateScroll as scroll } from "react-scroll";

import logo from '../img/logo.svg';
import languageBtn from '../img/language.svg';

    const Layout = ( {t, handleLanguageChange, language, onFocusImput, onInputChange, value} ) => {
    const scrollToTop = () => {
        scroll.scrollToTop();
      };
        
    const params = useParams();
    let navigate = useNavigate();

    
    const navigation = () => {
        const emptyObj = Object.keys(params).length;
        const scroll = (block) => {
            const section = document.querySelector( `#${block}` );
            section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
          };

        if (emptyObj === 0) {            
            return (<><Link activeClass="active-link" to='about' spy={true} smooth={true} offset={-80} duration={500}>{t('menuAbout')}</Link>
            <Link activeClass="active-link" to='companies' spy={true} smooth={true} offset={-80} duration={500}>{t('menuCompanies')}</Link>
            <Link activeClass="active-link" to='contacts' spy={true} smooth={true} offset={-80} duration={500}>{t('menuContacts')}</Link></>)
        } 
        if (emptyObj) {
            return (<><div onClick={() => {navigate("/"); setTimeout(() => {scroll('about')}, 500);}}><a>{t('menuAbout')}</a></div>
            <div onClick={() => {navigate("/"); setTimeout(() => {scroll('companies')}, 500);}}><a>{t('menuCompanies')}</a></div>
            <div onClick={() => {navigate("/"); setTimeout(() => {scroll('contacts')}, 500);}}><a>{t('menuContacts')}</a></div></>)

        }
    }

    //https://farm-kg.herokuapp.com/company/?search=


    return (
      <>
      <header>
            <div className='logo'><img src={logo} onClick={scrollToTop}></img></div>
                <div className='mainMenu'>
                {navigation()}
                </div>  
            <div className='headerRight'>
                <div className='search'>
                    <input value={value} onFocus={onFocusImput} onChange={onInputChange} placeholder={t('Search')}></input>
                    {/*
                        <ul>
                            {result.map((res) => (
                            <li key={res.id}><div className='searchSinglResult' onClick={() => redirectToResul(res.id, res.name)}><img className='searchCompanyLogo' src={res.photo}></img><h3>{language === 'ru' ? res.name_ru : res.name_en}</h3></div></li>))}
                            </ul>*/}
                </div>
                <div className='language' onClick={handleLanguageChange}>
                    <img src={languageBtn} alt='Сменить язык' onClick={handleLanguageChange}></img>
                </div>
            </div>
        </header>
        <main>
        <Outlet t={t} language={language} />
        </main>
      </>
    )
}

export {Layout}