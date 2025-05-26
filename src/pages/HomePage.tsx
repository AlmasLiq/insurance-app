import { useState } from "react"
import InsuranceSelector from "../componets/InsuranceSelector/InsuranceSelector"
import type { VehicleType } from "../types";
import InsuranceCard from "../componets/InsuranceCard/InsuranceCard";

function HomePage() {
  const [selected, setSelected] = useState<VehicleType>('car');

  return (
    <>
    <div className="bg-gray-50 w-full h-lvh flex justify-around items-center pb-20">
      <InsuranceSelector selected={selected} setSelected={setSelected} />
      <InsuranceCard selected={selected} />
    </div>
    </>
  )
}

export default HomePage