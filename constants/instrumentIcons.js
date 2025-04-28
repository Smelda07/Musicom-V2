const instrumentIcons = {
    'Acoustic Guitar': require('../assets/icons/tabs-icons/profile/AccousticGuitar.svg'),
    'Electric Guitar': require('../assets/icons/tabs-icons/profile/ElectricGuitar1.svg'),
    'Bass Guitar': require('../assets/icons/tabs-icons/profile/BassGuitar.svg'),
    'Piano': require('../assets/icons/tabs-icons/profile/Piano.svg'),
    'Keyboard': require('../assets/icons/tabs-icons/profile/Keybord.svg'),
    'Drums': require('../assets/icons/tabs-icons/profile/Drums.svg'),
    'Violin': require('../assets/icons/tabs-icons/profile/Violin.svg'),
    'Cello': require('../assets/icons/tabs-icons/profile/Violin.svg'),
    'Saxophone': require('../assets/icons/tabs-icons/profile/Saxophone.svg'),
    'Trumpet': require('../assets/icons/tabs-icons/profile/Trumpet.svg'),
    'Flute': require('../assets/icons/tabs-icons/profile/Flute.svg'),
    'Ukulele': require('../assets/icons/tabs-icons/profile/AccousticGuitar.svg'),
    'Vocal': require('../assets/icons/tabs-icons/profile/Vocal.svg'),
    'DJ controller': require('../assets/icons/tabs-icons/profile/DJ.svg'),
  };
  
  function getInstrumentIcon(instrumentName) {
    if (instrumentIcons[instrumentName]) {
      return instrumentIcons[instrumentName];
    } else {
      return require('../../assets/icons/tabs-icons/profile/OtherInstrument.svg');
    }
  }
  