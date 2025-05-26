import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/react.svg'

export default function Header() {
  const { i18n, t } = useTranslation()

  return (
    <div className="w-full h-12 border-b border-gray-300 bg-white flex justify-between p-8 items-center">
      <Link to="/">
        <img src={logo} alt="logo" className="h-full" />
      </Link>
      <div className="flex gap-2">
        <button
          onClick={() => i18n.changeLanguage('ru')}
          className="px-2 py-1 rounded hover:bg-gray-100"
        >
          {t('header.lang_ru')}
        </button>
        <button
          onClick={() => i18n.changeLanguage('en')}
          className="px-2 py-1 rounded hover:bg-gray-100"
        >
          {t('header.lang_en')}
        </button>
        <button
          onClick={() => i18n.changeLanguage('kk')}
          className="px-2 py-1 rounded hover:bg-gray-100"
        >
          {t('header.lang_kz')}
        </button>
      </div>
    </div>
  )
}
