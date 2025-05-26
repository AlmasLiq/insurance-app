import { Link } from "react-router-dom"

function Header() {
  return (
  <div className="w-full h-12 border-b border-gray-300 bg-white flex justify-between p-8 items-center">
    <Link to="/">
      <img src="\src\assets\react.svg" alt="logo" />
    </Link>
  </div>
  )
}

export default Header