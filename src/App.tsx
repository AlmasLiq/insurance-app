import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import SharedLayout from './pages/SharedLayout'
import HomePage from './pages/HomePage'
import VehicleInsuranceForm from './pages/VehicleInsuranceForm'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="insurance-detail" element={<VehicleInsuranceForm />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App