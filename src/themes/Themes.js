import { DefaultTheme, DarkTheme } from 'react-native-paper'
//Para saber mais: https://callstack.github.io/react-native-paper/theming.html
export const Light = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3F51B5',
        accent: '#757de8',
        background: '#E1E1E1',
        surface: '#F3F3F3',
        text: '#232323'
    }
}
export const Dark = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        primary: '#1769aa',
        accent: '#002984',
        background: '#3c4557',
        surface: '#232323',
        text: '#f3f3f3'
    }
}