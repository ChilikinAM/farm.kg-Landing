import { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from "react-yandex-maps";

const mapData = {
    center: [42.87736994858796, 74.59217561950685],
    zoom: 17,
    controls: ['zoomControl', 'fullscreenControl']
  };
  
  const coordinates = [42.877729948588, 74.59210561950685];
  

const Contacts = ({t, language}) => {
    const [textContact, setTextContact] = useState([]);
    useEffect(() => {
      const getContact = async () => {
        const res = await fetch('https://farmkg1.herokuapp.com/contacts/', {method: "GET"});
        const data = await res.json();
        setTextContact(data[0]);
      }
      getContact()
    }, [])
    

    return (
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
                    <div className='contactMap'>
                    {/*<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Abe20b7f06ce4ac2f72ff17bcd466cf8a63b4b2c8043c66a8f6c4df0b3575d031&amp;source=constructor" width="420" height="472" frameborder="0"></iframe>*/}
                    <YMaps>
                        <Map defaultState={mapData} modules={['control.ZoomControl', 'control.FullscreenControl']} className='yaMap'>
                            <Placemark geometry={coordinates} />
                        </Map>
                    </YMaps>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}

export {Contacts}