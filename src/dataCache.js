let carOptionsCache = null;
let motoOptionsCache = null;

export async function getCarOptions() {
  if (!carOptionsCache) {
    const res = await fetch('http://localhost:4000/cars');
    if (!res.ok) throw new Error('Failed to fetch cars');
    carOptionsCache = await res.json();
  }
  return carOptionsCache;
}

export async function getMotoOptions() {
  if (!motoOptionsCache) {
    const res = await fetch('http://localhost:4000/motos');
    if (!res.ok) throw new Error('Failed to fetch motos');
    motoOptionsCache = await res.json();
  }
  return motoOptionsCache;
}

// src/dataCache.js

const cache = {};

/**
 * Generic GET + cache function.
 * @param {string} endpoint — путь после хоста, например 'cars' или 'motos'
 * @returns {Promise<any>} — распарсенный JSON из ответа, результат кэшируется
 */
export async function get(endpoint) {
  if (!cache[endpoint]) {
    const url = `http://localhost:4000/${endpoint}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`);
    }
    cache[endpoint] = await res.json();
  }
  return cache[endpoint];
}

// Алиасы для удобства:
export const getCarOptions  = () => get('cars');
export const getMotoOptions = () => get('motos');
``` реакция: при первом вызове `get('cars')` или `get('motos')` будет HTTP-запрос и сохранение в `cache`, а последующие — уже вернут данные из памяти без новых запросов.

