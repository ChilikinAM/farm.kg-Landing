import { useState, useEffect } from 'react';

const Contacts = ({t, language}) => {
    const [textContact, setTextContact] = useState([]);
    useEffect(() => {
      const getContact = async () => {
        const res = await fetch('https://farm-kg.herokuapp.com/contacts/', {method: "GET"});
        const data = await res.json();
        setTextContact(data[0]);
      }
      getContact()
    }, [])

    // 2GIS map


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

                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}

export {Contacts}