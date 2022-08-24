import { useState, useEffect } from 'react';

const About = ({ t, language }) => {
    const [textAboutUs, setTextAboutUs] = useState([]);
    useEffect(() => {
      const getAboutUs = async () => {
        const res = await fetch('https://farm-kg.herokuapp.com/about_us/', {method: "GET"})
        .then(res => res.json())
        .then(data => setTextAboutUs(data[0]))
      }
      getAboutUs()
    }, [])

    return (
        <>
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
        </>
    )
}

export {About}