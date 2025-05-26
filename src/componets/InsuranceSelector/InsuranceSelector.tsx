import type { VehicleSelectorProps } from "../../types"
import VehicleSelector from "./VehicleSelector/VehicleSelector"

function InsuranceSelector({ selected, setSelected }: VehicleSelectorProps) {
  return (<>
  <div className="w-110 flex justify-center flex-col">
      <div className="flex flex-col gap-4 text-start">
        <div className="text-6xl text-indigo-600 font-light" >Авто/Мото <br /> Страхование</div>
        <div className="text-2xl">Оформить страховку — просто</div>
        <div className="text-2xl">Больше никакой бумажной волокиты! <br />Застрахуйте свой автомобиль и <br /> мотоцикл уже сегодня.</div>
      </div>
      <div className="flex justify-evenly pt-8 text-indigo-600 mr-30">
        <VehicleSelector selected={selected} setSelected={setSelected}></VehicleSelector>
      </div>
    </div>
  </>
  )
}

export default InsuranceSelector 