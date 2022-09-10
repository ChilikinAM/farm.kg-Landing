import { Link } from 'react-router-dom';

const Notfoundpage = ({ t, language }) => {
    return (
        <div className='notFoundPage'>
            <div className="arnamentLeft"></div>
            <div className="arnamentRight"></div>
            <div className='nfpContent'>
                <div className='num'>{t('404')}</div>
                <div className='pnf'>{t('PageNotFound')}</div>
                <div className='lnk'>{t('ReturnTo')} <Link to='/'>{t('HomePage')}</Link></div>
            </div>
        </div>
    )
}

export {Notfoundpage}