import React from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { MainLandingPage } from './components/pages/MainLandingPage';
import { Layout } from './components/pages/Layout';
import { Companies } from './components/pages/Companies';
import { Search } from './components/pages/Search';
import { CompanieSinglPage } from './components/pages/CompanieSinglPage';
import { Notfoundpage } from './components/pages/Notfoundpage';

import useLocalStorage from './components/hooks/use-localstorage';
import i18n from './i18n';


function App() {

  // Function Translate
  const {t} = useTranslation();
  const [language, setLanguage] = useLocalStorage('language', 'ru');
  const handleLanguageChange = () => {
    if (language === 'en'){
      i18n.changeLanguage('ru');
      setLanguage('ru')
    }
    if (language === 'ru'){
      i18n.changeLanguage('en');
      setLanguage('en')
    }
  }

  //Модалка - Пока не нужна

  /*const [modalActive, setModalActive] = useState(false);
  const [companieID, setCompanieID] = useState('');
  const openModalId = (id) => {
    setModalActive(true);
    setCompanieID(id);
  }*/

  // Search
  const [value, setValue] = useState('');
  const [result, setResult] = useState([]);
  let navigate = useNavigate();
 
  const getResult = async (search) => {
      const res = await fetch(`https://farm-kg.herokuapp.com/company/?search=${search}`, {method: "GET"});
      const data = await res.json();
      setResult(data);
  }

  const onInputChange = (event) => {
      setValue(event.target.value);
      getResult(event.target.value);
    }
  
  const onFocusImput = (event) => {
      navigate(`Search=1${value}`);
      getResult(event.target.value);
  }  

  return (
    <>
 
 <Routes>
        <Route path='/' element={< Layout t={t} language={language} handleLanguageChange={handleLanguageChange} onFocusImput={onFocusImput} onInputChange={onInputChange} value={value} />}>
          <Route index element={<MainLandingPage 
          t={t}
          language={language} />} />
          <Route path='Companies' element={<Companies t={t} language={language} />} />
          <Route path='Search=:value' element={<Search t={t} language={language} setValue={setValue} result={result} />} />
          <Route path=':id/:title' element={<CompanieSinglPage t={t} language={language} />} />
          <Route path='*' element={<Notfoundpage t={t} language={language} />} />
        </Route>
      </Routes>


 
 {/* Old landing */}
 
   {/* <header>
        <div className='logo'><a href='/'><img src={logo} alt="{text.mainHeader}"></img></a></div>
        <div className='mainMenu'>
                <a href='/#about'>{t('menuAbout')}</a>
                <a href='/#companies'>{t('menuCompanies')}</a>
                <a href='/#contacts'>{t('menuContacts')}</a>
        </div>
        <div className='search'>
            <input></input>
        </div>
        <div className='language' onClick={handleLanguageChange}>
            <img src={languageBtn} alt='Сменить язык' onClick={handleLanguageChange}></img>
        </div>
    </header>
    <main>
{/* Блок первый 
    <section id='first'>
      <div className='content'>
        <div className="arnamentLeft"></div>
        <div className="arnamentRight"></div>
        <div className="homepageMain">
            <div className='mainContent'>
                <div className='slogan'><h1>{t('mainHeader')}</h1>
                <h3>{t('mainSlogan')}</h3>
                </div>
                <div className='mainBrandsPhoto'>
                    <div className='mainBrand1'></div>
                    <div className='mainBrand2'></div>
                    <div className='mainBrand3'></div>
                    <div className='mainBrand4'></div>
                </div>
            </div>    
        </div>
      </div>
      </section>
{/*  Конец первого блока 
{/*  Блок о нас  
    <section id='about'>
      <div className='content'>
        <div className="arnamentRight"></div>
        <div className="aboutMain">
            <div className="aboutLeft">
                <h1>{language === 'ru' ? textAboutUs.name_ru : textAboutUs.name_en}</h1>
                <h3>{language === 'ru' ? textAboutUs.text_ru : textAboutUs.text_en}</h3>
            </div>
            <div className="aboutRight">
                <div className='aboutImg1'></div>
                <div className='aboutImg2'></div>               
            </div>
        </div>
      </div>
      </section>
{/*  Конец блока о нас  
{/*  Блок компании  
    <section id='companies'>
      <div className='content'>
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
{/*              {companies.map(post => { return (
                  <div id={post.id} className='companie'><h1>{post.name}</h1>
                  <img src={post.logoMainPage} alt={post.name}></img>
                  <div className='morebutton'><h3>{text.companiesMore}</h3></div></div>
              )})}

                <Companies companies={currentCompanies} loading={loading} t={t} language={language} />
          </div>
      </div>
{/* Модалка Компании 
      <Modal active={modalActive} setActive={setModalActive} id={companieID}>
                <div className='singlCompanie'>
                  <div className='left'>
                    <h1>Supara</h1>
                    <h3>Products "Supara talkan" from natural organic products in Belgian chocolate.
Supara talkan chocolates made from barley oatmeal, ghee, honey and local organic walnuts, prunes and pistachios are covered with high quality Belgian chocolate. Contains no sugar, colors, flavors or preservatives.</h3>
                  </div>
                  <div className='right'>
                    <div className='logo'></div>
                    <div className='url'><p>Supara</p></div>
                  </div>
                </div>
                <div className='companieSlided'></div>
      </Modal>
{/* Конец модалки Компании 
</section>
{/*  Конец блока компании  
{/*  Блок Контакты  
      <section id='contacts'>
        <div className='content'>
          <div className="contactsMain">
            <div className="contactsContent">
                <div className='leftColumn'>
                    <div className='contactHeader'><p>{t('contactContactUs')}</p></div>
                    <div className='callUs'>
                        <h3>{t('contactCallUs')}</h3>
                        <h1>{textContact.phone_number}</h1>
                    </div>
                    <div className='contactIcon'>
                        <div className='contactLineItems'>
                            <div className='mailIcon'></div>
                            <h3>{textContact.email}</h3>
                        </div>
                        <div className='contactLineItems'>
                            <div className='addressIcon'></div>
                            <h3>{language === 'ru' ? textContact.address_ru : textContact.address_en}</h3>
                        </div>
                    </div>
                </div>
                <div className='rightColumn'>
                    <div className='contactMap'></div>
                </div>
            </div>
        </div>
      </div>
      </section>
{/*  Конец блока контакты  
    </main>*/}
  </>
  );
}

export default App;
