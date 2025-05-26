import type { AddOn } from "../types"

const mockAddOns: AddOn[] = [
  {
    id: 'personal-accident',
    name: 'Страхование от несчастного случая',
    description:
      'Это дополнение покрывает травмы или смерть владельца транспортного средства (сумма до ₸15 000 000).',
    price: 350,
  },
  {
    id: 'roadside-assist',
    name: 'Круглосуточная помощь на дороге',
    description:
      'Помощь при поломке, эвакуация, подвоз топлива и мелкий ремонт прямо на трассе.',
    price: 500,
  },
  {
    id: 'zero-dep',
    name: 'Zero Depreciation',
    description:
      'Полный ремонт без учёта износа комплектующих узлов и агрегатов.',
    price: 800,
  },
]

export default mockAddOns
