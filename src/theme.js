import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#000000',
    textSecondary: '#FFFFFF',
    primary: '#0366d6',
    darkBackground: '#24292e',
    lightBackground: '#e1e4e8',
    errorRed: '#d73a4a'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
  }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  }
};

export default theme;