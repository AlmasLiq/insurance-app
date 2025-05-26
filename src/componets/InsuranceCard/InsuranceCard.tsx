import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { SelectedProps } from '../../types'
import carImg from '../../assets/car.jpg'
import bikeImg from '../../assets/bike.jpg'

export default function InsuranceCard({ selected }: SelectedProps) {
  const navigate = useNavigate()
  const isCar = selected === 'car'
  const IMAGE_SRC = isCar ? carImg : bikeImg
  const label = isCar ? 'Авто' : 'Мото'

  const [regNo, setRegNo] = useState('')
  const [touched, setTouched] = useState(false)

  // шаблон: 3 цифры, 3 буквы A–Z, 2 цифры, без пробелов
  const plateRegex = /^\d{3}[A-Z]{3}\d{2}$/
  const normalized = regNo.trim().toUpperCase()
  const isValid = plateRegex.test(normalized)

  const handleSubmit = () => {
    setTouched(true)
    if (!isValid) return
    sessionStorage.setItem('registrationNumber', normalized)
    navigate('/insurance-detail')
  }

  return (
    <div className="w-full max-w-3xl h-158 bg-white p-6 rounded-lg
                    shadow-[0_4px_12px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.1)]">
      <div className="w-full h-100 overflow-hidden rounded-md">
        <img
          src={IMAGE_SRC}
          alt={`Изображение ${label}`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-y-5 mt-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold">Страхование {label}</h2>
          <p className="text-xl">
            Введите регистрационный номер вашего {label} ниже, чтобы начать.
          </p>
        </div>

        <div className="inline-flex w-full max-w-lg">
          <input
            type="text"
            value={normalized}
            onChange={e => {
              setRegNo(e.target.value.toUpperCase())
            }}
            onBlur={() => setTouched(true)}
            placeholder="000AAA01"
            maxLength={8}
            className={`flex-1 px-4 py-2.5 border rounded-l-md focus:outline-none
              ${touched && !isValid ? 'border-red-500' : 'border-gray-300'}`}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className={`px-4 py-2.5 -ml-px border rounded-r-md font-bold transition-colors
              ${isValid
                ? 'border-indigo-500 bg-indigo-50 text-indigo-500 hover:bg-indigo-500 hover:text-white'
                : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            Рассчитать
          </button>
        </div>
      </div>
    </div>
  )
}
