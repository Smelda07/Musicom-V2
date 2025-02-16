import { create } from 'zustand';

export const useSurveyStore = create((set) => ({
  chosenInstruments: [],
  chosenGenres: [],
  chosenOtherData: {}, // Pokud máš další sekce dotazníku

  setChosenInstruments: (instruments) => set({ chosenInstruments: instruments }),
  setChosenGenres: (genres) => set({ chosenGenres: genres }),
  
  // Přidání/odebrání nástroje
  toggleInstrument: (instrument) =>
    set((state) => ({
      chosenInstruments: state.chosenInstruments.includes(instrument)
        ? state.chosenInstruments.filter((item) => item !== instrument)
        : [...state.chosenInstruments, instrument],
    })),

  // Přidání/odebrání žánru
  toggleGenre: (genre) =>
    set((state) => ({
      chosenGenres: state.chosenGenres.includes(genre)
        ? state.chosenGenres.filter((item) => item !== genre)
        : [...state.chosenGenres, genre],
    })),

  // Uložení dalších odpovědí (např. preferovaný styl hraní apod.)
  setOtherData: (key, value) =>
    set((state) => ({
      chosenOtherData: { ...state.chosenOtherData, [key]: value },
    })),

  // Reset dat po odeslání
  resetSurvey: () => set({ chosenInstruments: [], chosenGenres: [], chosenOtherData: {} }),
}));
