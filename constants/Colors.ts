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
    textSecondary: '#A0A0A5',
    background: '#1C1C1E', // Distinctly grey, not pitch black
    backgroundSecondary: '#2C2C2E',
    tint: tintColorDark,
    tabIconDefault: '#666',
    tabIconSelected: tintColorDark,
    border: '#3A3A3C',
    card: '#2C2C2E', // Apple-style dark mode grey
  },
  amoled: {
    text: '#FFF',
    textSecondary: '#888',
    background: '#000000', // Pure AMOLED black
    backgroundSecondary: '#050505',
    tint: tintColorDark,
    tabIconDefault: '#444',
    tabIconSelected: tintColorDark,
    border: '#111111',
    card: '#000000', // Card blends into background for maximum battery saving
  },
};
