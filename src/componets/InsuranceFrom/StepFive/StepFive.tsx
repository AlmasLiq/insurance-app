import type { PolicyDetails } from '../../../types'
import { addYearToDate } from '../../../utils/addYearToDate';
import getTodayData from '../../../utils/getTodayData';

export type StepFiveProps = PolicyDetails

export default function StepFive({
  insurer,
  policyNumber,
  iin,
  status,
  makeModel,
  fullName,
  tenure,
  manufactureYear,
}: StepFiveProps) {
  const todayDate = getTodayData()
  return (
    <div className="p-6 w-full max-w-2xl mx-auto space-y-6">
      {/* Заголовок */}
      <h2 className="text-base font-semibold text-gray-700">
        Сведения о страховом полисе ОСГПО ТС / КҚҚ сақтандыру полисі туралы мәліметтер
      </h2>

      {/* Общие данные */}
      <div className="space-y-4">
        <DataRow label="Страховая компания / Сақтандыру компаниясы" value={insurer} />
        <DataRow label="Номер полиса / Полис номері" value={policyNumber} />
        <DataRow label="ФИО / ТАҚ" value={fullName} />
        <DataRow label="ИИН / ЖСН" value={iin} />
        <DataRow label="Дата выдачи / Берілген күні" value={todayDate} />
        <DataRow label="Дата начала / Басталу күні" value={todayDate} />
        <DataRow label="Дата окончания / Аяқталу күні" value={addYearToDate(todayDate, tenure as number)} />
        <DataRow label="Статус" value={status} />
      </div>

      <hr className="border-gray-200" />

      {/* Данные по транспортному средству */}
      <h3 className="text-base font-semibold text-gray-700">
        Транспортные средства / Көлік құралдары
      </h3>
      <div className="border border-gray-200 rounded-lg p-4 flex items-center space-x-6">
        {/* Иконка автомобиля */}
        <svg
          className="w-10 h-6 text-green-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M3 9l1-3h12l1 3v6a1 1 0 01-1 1h-1a1 1 0 01-2 0H6a1 1 0 01-2 0H3a1 1 0 01-1-1V9z" />
        </svg>
        {/* Сетка с данными */}
        <div className="flex-1 grid grid-cols-3 gap-x-4">
          <div className="text-sm text-gray-500">ГРНЗ / Т№</div>
          <div className="text-sm text-gray-500">Год / Жыл</div>
          <div />
          <div className="text-lg font-medium">{sessionStorage.getItem("registrationNumber")}</div>
          <div className="text-lg font-medium">{manufactureYear}</div>
          <div />
          <div className="text-sm text-gray-500">Транспорт</div>
          <div className="text-sm text-gray-500">Модель</div>
          <div />
          <div className="text-lg font-medium">{sessionStorage.getItem("vehicleType") === 'car' ? 'Авто' : 'Мото'}</div>
          <div className="text-lg font-medium">{makeModel}</div>
          <div />
        </div>
      </div>

      {/* Источник */}
      <div className="text-xs text-gray-500">
        Предоставлено источником / Көзінен алынған: Государственное кредитное бюро / Мемлекеттік кредиттік бюро
      </div>
    </div>
  )
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-x-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="col-span-2 text-sm font-medium">{value}</div>
    </div>
  )
}
