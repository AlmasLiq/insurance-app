import React from 'react'

export type VehicleType = 'bike' | 'car'

export interface SelectedProps {
  selected: VehicleType
}

export interface SetSelectedProps {
  setSelected: React.Dispatch<React.SetStateAction<VehicleType>>
}

export interface VehicleSelectorProps
  extends SelectedProps,
          SetSelectedProps {}

export interface VehicleDetails {
  makeModel:       string
  manufactureYear: string
  regDate:         string
  policyStatus:    string
}

export interface PlanSelection {
  planId:   string
  tenure:   number | null
  idv:      number | null
}

export interface AddOnsSelection {
  addOns:      string[]
  addOnsTotal: number | null
}

export interface PersonalDetails {
  fullName:    string
  email:       string
  mobilePhone: string
  pincode:     string
  iin:         string
}

export interface VehicleInfo {
  registration: string
  year:         number
  make:         string
  model:        string
}

export interface PolicyDetails {
  insurer:       string
  policyNumber:  string
  fullName:      string
  iin:           string
  issueDate:     string
  startDate:     string
  endDate:       string
  status:        string
  makeModel:     string
  tenure:        number | null
  manufactureYear: string
}

export type InsuranceModel =
  VehicleDetails &
  PlanSelection &
  AddOnsSelection &
  PersonalDetails &
  PolicyDetails

export interface SidebarStepsProps {
  steps:       string[]
  currentStep: number
  onStepChange: (idx: number) => void
}

export interface StepOneProps {
  makeModel:       string
  manufactureYear: string
  regDate:         string
  policyStatus:    string

  onChange: (fields: Partial<VehicleDetails>) => void

  onNext: () => void
}

export interface Plan {
  id:           string
  name:         string
  features:     { description: string; covered: boolean }[]
  benefits:     {
    covered:    { title: string; description: string }[]
    notCovered: { title: string; description: string }[]
  }
  pricePerYear: number
}

export interface AddOn {
  id:          string
  name:        string
  description: string
  price:       number
}

export interface StepFourProps {
  fullName:    string
  email:       string
  mobilePhone: string
  pincode:     string
  iin:         string

  onBack:   () => void
  onSubmit: (fields: PersonalDetails) => void
}

export interface Option {
  value: string;
  label: string;
}

export interface SharedDataContext {
  cars: Option[];
  motos: Option[];
}