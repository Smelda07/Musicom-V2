import { create } from 'zustand';

export const useSurveyStore = create((set) => ({
  // ROLE UŽIVATELE
  role: null,
  setRole: (role) => set({ role }),

  // DATA PRO VŠECHNY ROLE
  chosenGenres: [],
  locality: { country: "", state: "", city: "" },

  // MUZIKANT
  chosenInstruments: [],
  chosenGender: null,
  birthYear: "",

  setChosenInstruments: (instruments) => set({ chosenInstruments: instruments }),
  toggleInstrument: (instrument) =>
    set((state) => ({
      chosenInstruments: state.chosenInstruments.includes(instrument)
        ? state.chosenInstruments.filter((item) => item !== instrument)
        : [...state.chosenInstruments, instrument],
    })),

  setGender: (gender) => set({ chosenGender: gender }),
  setBirthYear: (year) => set({ birthYear: year }),

  // ORGANIZÁTOR
  organizationNames: [""],
  chosenEvents: [],

  setOrganizationNames: (names) => set({ organizationNames: names }),

  toggleEvent: (event) =>
    set((state) => ({
      chosenEvents: state.chosenEvents.includes(event)
        ? state.chosenEvents.filter((item) => item !== event)
        : [...state.chosenEvents, event],
    })),

  // FAN / USER
  setChosenGenres: (genres) => set({ chosenGenres: genres }),
  toggleGenre: (genre) =>
    set((state) => ({
      chosenGenres: state.chosenGenres.includes(genre)
        ? state.chosenGenres.filter((item) => item !== genre)
        : [...state.chosenGenres, genre],
    })),

  // LOKALITA
  setLocality: (countryKey, countryLabel, stateKey, stateLabel, cityKey, cityLabel) =>
    set({
      locality: {
        country: { key: countryKey, label: countryLabel },
        state: { key: stateKey, label: stateLabel },
        city: { key: cityKey, label: cityLabel },
      },
    }),

  // RESET VŠEHO
  resetSurvey: () =>
    set({
      role: null,
      chosenInstruments: [],
      chosenGenres: [],
      chosenGender: null,
      birthYear: "",
      organizationNames: [],
      chosenEvents: [],
      locality: { country: "", state: "", city: "" },
    }),
}));
