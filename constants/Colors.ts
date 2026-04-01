const tintColorLight = '#00AEEF';
const tintColorDark = '#00AEEF';

export default {
  light: {
    text: '#000',
    textSecondary: '#666',
    background: '#FFF',
    backgroundSecondary: '#F5F5F5',
    tint: tintColorLight,
    tabIconDefault: '#CCC',
    tabIconSelected: tintColorLight,
    border: '#EEE',
    card: '#F9F9F9',
  },
  dark: {
    text: '#FFF',
    textSecondary: '#888',
    background: '#0D0D0D', // Deep charcoal, not grey
    backgroundSecondary: '#161616',
    tint: tintColorDark,
    tabIconDefault: '#666',
    tabIconSelected: tintColorDark,
    border: '#1A1A1A',
    card: '#121212',
  },
  amoled: {
    text: '#FFF',
    textSecondary: '#666',
    background: '#000', // Pure AMOLED black
    backgroundSecondary: '#0A0A0A',
    tint: tintColorDark,
    tabIconDefault: '#444',
    tabIconSelected: tintColorDark,
    border: '#111',
    card: '#080808',
  },
};
