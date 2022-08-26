import { Outlet } from 'react-router-dom';
import { Link, animateScroll as scroll } from "react-scroll";

import logo from '../img/logo.svg';
import languageBtn from '../img/language.svg';

const Layout = ( {t, handleLanguageChange, language} ) => {
    const scrollToTop = () => {
        scroll.scrollToTop();
      };
    

    return (
      <>
      <header>
            <div className='logo'><img src={logo} onClick={scrollToTop}></img></div>
                <div className='mainMenu'>
                    <Link activeClass="active-link" to='about' spy={true} smooth={true} offset={-80} duration={500}>{t('menuAbout')}</Link>
                    <Link activeClass="active-link" to='companies' spy={true} smooth={true} offset={-80} duration={500}>{t('menuCompanies')}</Link>
                    <Link activeClass="active-link" to='contacts' spy={true} smooth={true} offset={-80} duration={500}>{t('menuContacts')}</Link>
                </div>  
            <div className='headerRight'>
                <div className='search'>
                    <input placeholder='Search'></input>
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