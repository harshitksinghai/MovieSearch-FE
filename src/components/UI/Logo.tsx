import { useTranslation } from 'react-i18next'
import './Logo.css'

const Logo = () => {
const {t} = useTranslation();

  return (
    <div>
      <p className="logo">{t('navbar.appName')}</p>
    </div>
  )
}

export default Logo
