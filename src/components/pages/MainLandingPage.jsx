import { Homepage } from './Homepage';
import { About } from './Aboutpage';
import { Companies } from './Companies';
import { Contacts } from './Contacts';


const MainLandingPage = ({ t, language }) => {

    return (
        <>
        <section id='first'><Homepage t={t} language={language} /></section>
        <section id='about'><About t={t} language={language} /></section>
        <section id='companies'><Companies t={t} language={language} /></section>
        <section id='contacts'><Contacts t={t} language={language} /></section>
        </>
    )
}

export {MainLandingPage}