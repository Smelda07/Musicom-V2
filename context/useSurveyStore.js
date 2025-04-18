import { create } from 'zustand';

export const useSurveyStore = create((set) => ({
  chosenInstruments: [],
  chosenGenres: [],
  chosenGender: null,
  birthYear: "",
  locality: { country: "", state: "", city: "" },

  setChosenInstruments: (instruments) => set({ chosenInstruments: instruments }),
  setChosenGenres: (genres) => set({ chosenGenres: genres }),
  setGender: (gender) => set({ chosenGender: gender }),
  setBirthYear: (year) => set({ birthYear: year }),

  setLocality: (countryKey, countryLabel, stateKey, stateLabel, cityKey, cityLabel) =>
    set({ locality: { country: { key: countryKey, label: countryLabel }, state: { key: stateKey, label: stateLabel }, city: { key: cityKey, label: cityLabel } } }),

  toggleInstrument: (instrument) =>
    set((state) => ({
      chosenInstruments: state.chosenInstruments.includes(instrument)
        ? state.chosenInstruments.filter((item) => item !== instrument)
        : [...state.chosenInstruments, instrument],
    })),

  toggleGenre: (genre) =>
    set((state) => ({
      chosenGenres: state.chosenGenres.includes(genre)
        ? state.chosenGenres.filter((item) => item !== genre)
        : [...state.chosenGenres, genre],
    })),

  resetSurvey: () =>
    set({
      chosenInstruments: [],
      chosenGenres: [],
      chosenGender: null,
      birthYear: "",
      locality: { country: "", state: "", city: "" },
    }),
}));
