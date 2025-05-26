import { Link } from "react-router-dom"

function Header() {
  return (
  <div className="w-full h-12 border-b border-gray-300 bg-white flex justify-between p-8 items-center">
    <Link to="/">
      <img src="\src\assets\vinsurance_logo.svg" alt="logo" />
    </Link>
    <button className="w-20 h-12 bg-amber-900 font-">Найти страховку</button>
  </div>
  )
}

export default Header