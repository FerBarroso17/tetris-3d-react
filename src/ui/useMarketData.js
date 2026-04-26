import { create } from 'zustand';

export const useMarketData = create((set) => ({
  quotes: [],
  isLoading: true,
  error: null,
  fetchData: async () => {
    try {
      // Usamos un proxy CORS gratuito por si la API de Ambito restringe las peticiones desde localhost
      const response = await fetch('https://corsproxy.io/?https://mercados.ambito.com/home/general');
      const data = await response.json();
      
      // Filtramos solo las cotizaciones del Dólar
      const dollarQuotes = data.filter(item => item.nombre.includes('Dólar'));
      
      set({ quotes: dollarQuotes, isLoading: false, error: null });
    } catch (err) {
      set({ isLoading: false, error: err.message });
    }
  }
}));
