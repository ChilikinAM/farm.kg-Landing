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

  // Search
  const [value, setValue] = useState('');
  const [result, setResult] = useState([]);
  let navigate = useNavigate();
 
  const getResult = async (search) => {
      const res = await fetch(`https://farmkg1.herokuapp.com/company/?search=${search}`, {method: "GET"});
      const data = await res.json();
      setResult(data);
  }

  const onInputChange = (event) => {
      setValue(event.target.value);
      getResult(event.target.value);
    }
  
  const onFocusImput = (event) => {
      navigate(`Search=${value}`);
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
          <Route path='Search:value' element={<Search t={t} language={language} setValue={setValue} result={result} />} />
          <Route path=':id/:title' element={<CompanieSinglPage t={t} language={language} />} />
        </Route>
        <Route path='*' element={<Notfoundpage t={t} language={language} />} />
      </Routes>
  </>
  );
}

export default App;
