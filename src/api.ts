export type Option = { value: string; label: string };

const cache: Record<string, Option[]> = {};

export async function get<T extends Option[]>(endpoint: string): Promise<T> {
  if (!cache[endpoint]) {
    const res = await fetch(`http://localhost:4000/${endpoint}`);
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
    cache[endpoint] = await res.json();
  }
  return cache[endpoint] as T;
}

export const getCars  = () => get<Option[]>('cars');
export const getMotos = () => get<Option[]>('motos');
