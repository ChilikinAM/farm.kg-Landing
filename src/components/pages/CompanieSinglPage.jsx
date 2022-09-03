import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";

import '../style/slick-theme.min.css';
import '../style/slick.min.css';


const CompanieSinglPage = ({language, t }) => {
    const {id} = useParams();
    const [textCompany, setTextCompany] = useState('');
    
    const getContact = async () => {
      const res = await fetch(`https://farmkg1.herokuapp.com/company/${id}`, {method: "GET"});
      const data = await res.json();
      setTextCompany(data);
    }

    useEffect(() => {
        getContact()
    }, [])

   /* const [imgCompany, setImgCompany] = useState([]);
    useEffect(() => {
      const getContact = async () => {
        const res = await fetch(`https://farm-kg.herokuapp.com/company/${id}`, {method: "GET"})
        .then(res => res.json())
        .then(data => setImgCompany(data.products_photos))
      }
      getContact()
    }, [])*/

    // Слайдер продуктов
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      };
    // Конец слайдера продуктов

    return (
    <div className='content'>
      <div className='singlPageComanie'><Link to="/"><div className="backicon"></div></Link>
            <div className='singlCompanie'>
            <div className='left'>
            <h1>{language === 'ru' ? textCompany.name_ru : textCompany.name_en}</h1>
            <h3>{language === 'ru' ? textCompany.information_ru : textCompany.information_en}</h3>
            </div>
            <div className='right'>
            <div className='companyLogo'><img className='img' src={textCompany.logo}></img></div>
            <div className='url'><a href={textCompany.web_site} target="blank">{language === 'ru' ? textCompany.name_ru : textCompany.name_en}</a></div>
            </div>
        </div>
        <div className='url-mobile'><a href={textCompany.web_site} target="blank">{language === 'ru' ? textCompany.name_ru : textCompany.name_en}</a></div>
        <div className='companieSlided'>
          <div className='nameProducts'><h3>{t('nameProducts')}</h3></div>
                <Slider {...settings}>
                {textCompany.products_photos?.map(companie => { return (
                    <div key={companie.id} className='imgSlider'>
                      <img src={companie.photo}></img>
                    </div>
                  )})}
                </Slider>                

        </div>
      </div>
    </div>
)
}

export {CompanieSinglPage}