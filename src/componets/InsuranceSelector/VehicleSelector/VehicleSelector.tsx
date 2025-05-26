import { useEffect } from "react";
import type { VehicleSelectorProps } from "../../../types";

export default function VehicleSelector({ selected, setSelected }: VehicleSelectorProps) {
  useEffect(() => {
    const saved = sessionStorage.getItem('vehicleType')
    if (saved === 'car' || saved === 'bike') {
      setSelected(saved)
    }
  }, [setSelected])

  useEffect(() => {
    sessionStorage.setItem('vehicleType', selected)
  }, [selected])

  return (
    <div className="flex space-x-4 gap-4">
      <button
        onClick={() => setSelected('car')}
        className={`
          flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-md border border-indigo-200
          transition-colors duration-200 ease-in-out w-20 h-20
          ${selected === 'car' 
            ? 'bg-indigo-600 text-white' 
            : 'bg-white text-indigo-600'}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
        <span className="text-sm font-medium">Car</span>
      </button>

      <button
        onClick={() => setSelected('bike')}
        className={`
          flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-md border border-indigo-200
          transition-colors duration-200 ease-in-out w-20 h-20
          ${selected === 'bike' 
            ? 'bg-indigo-600 text-white' 
            : 'bg-white text-indigo-600'}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <circle cx="18.5" cy="17.5" r="3.5" />
          <circle cx="5.5" cy="17.5" r="3.5" />
          <circle cx="15" cy="5" r="1" />
          <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
        </svg>
        <span className="text-sm font-medium">Bike</span>
      </button>

      
    </div>
  );
}
