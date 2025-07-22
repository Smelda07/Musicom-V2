export const instruments = {
	1: { title: "Acoustic Guitar", common: true, icon: require('../assets/icons/tabs-icons/profile/AccousticGuitar.svg') },
	2: { title: "Electric Guitar", common: true, icon: require('../assets/icons/tabs-icons/profile/ElectricGuitar1.svg') },
	3: { title: "Bass Guitar", common: true, icon: require('../assets/icons/tabs-icons/profile/BassGuitar.svg') },
	4: { title: "Piano", common: true, icon: require('../assets/icons/tabs-icons/profile/Piano.svg') },
	5: { title: "Keyboard", common: false, icon: require('../assets/icons/tabs-icons/profile/Keybord.svg') },
	6: { title: "Synthesizer", common: false, icon: null },
	7: { title: "Drums", common: true, icon: require('../assets/icons/tabs-icons/profile/Drums.svg') },
	8: { title: "Percussion", common: false, icon: null },
	9: { title: "Violin", common: true, icon: require('../assets/icons/tabs-icons/profile/Violin.svg') },
	10: { title: "Cello", common: false, icon: require('../assets/icons/tabs-icons/profile/Violin.svg') }, // Použita stejná jako pro Violin
	11: { title: "Saxophone", common: false, icon: require('../assets/icons/tabs-icons/profile/Saxophone.svg') },
	12: { title: "Trumpet", common: false, icon: require('../assets/icons/tabs-icons/profile/Trumpet.svg') },
	13: { title: "Trombone", common: false, icon: null },
	14: { title: "Flute", common: true, icon: require('../assets/icons/tabs-icons/profile/Flute.svg') },
	15: { title: "Clarinet", common: false, icon: null },
	16: { title: "Harmonica", common: false, icon: null },
	17: { title: "Banjo", common: false, icon: null },
	18: { title: "Ukulele", common: false, icon: require('../assets/icons/tabs-icons/profile/AccousticGuitar.svg') }, // Stejná jako Acoustic
	19: { title: "Mandolin", common: false, icon: null },
	20: { title: "Accordion", common: false, icon: null },
	21: { title: "Vocal", common: true, icon: require('../assets/icons/tabs-icons/profile/Vocal.svg') },
	22: { title: "DJ Controller", common: false, icon: require('../assets/icons/tabs-icons/profile/DJ.svg') },
	23: { title: "Turntables", common: false, icon: null },
	24: { title: "Sampler", common: false, icon: null },
	25: { title: "E-Drums", common: false, icon: null }
  };

  export function getInstrumentIcon(instrumentID) {
    if (instruments[instrumentID].icon) {
      return instruments[instrumentID].icon;
    } else {
      return require('../assets/icons/tabs-icons/profile/OtherInstrument.svg');
    }
  }
  
  
  export function getCommonInstruments(common) {
	const result = {};
	for (const [id, instrument] of Object.entries(instruments)) {
	  if (instrument.common == common) {
		result[id] = instrument.title;
	  }
	}
	return result;
  }

  export function getAllInstruments() {
	const result = {};
	for (const [id, instrument] of Object.entries(instruments)) {
		result[id] = instrument.title;
	}
	return result;

  }
