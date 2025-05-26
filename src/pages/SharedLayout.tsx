// src/pages/SharedLayout.tsx
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getCars, getMotos, type Option } from '../api';
import Header from '../componets/Header/Header';

function SharedLayout() {
  // Явно указываем, что это Option[]
  const [cars,  setCars]  = useState<Option[]>([]);
  const [motos, setMotos] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    Promise.all([ getCars(), getMotos() ])
      .then(([carsData, motosData]) => {
        setCars(carsData);
        setMotos(motosData);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading data...</div>;
  if (error)   return <div>Error: {error}</div>;

  return (
    <>
      <Header />

      {/* Дочерние роуты получат cars/motos через useOutletContext */}
      <Outlet context={{ cars, motos }} />
    </>
  );
}

export default SharedLayout;
