import { useColorScheme } from 'react-native';
import { AllColor } from '../../Util/Color/Color';
const useCustomStyles = () => {
    const colorScheme = useColorScheme();

    const isDark = colorScheme === 'dark';
    const isWhite = colorScheme === 'light';

    const customStyle = {
        blackBackground: {
            backgroundColor: isDark ? AllColor.black : AllColor.white,
        },
        whiteText: {
            color: isDark ? AllColor.white : AllColor.black
        },
        whiteBackground: {
            backgroundColor: isDark ? AllColor.white : AllColor.black
        },
        blackText: {
            color: isWhite ? AllColor.white : AllColor.black
        },
        whiteBorder: {
            borderColor: isDark ? AllColor.white : AllColor.black
        },
        BlackBorder: {
            borderColor: isDark ? AllColor.black : AllColor.white
        },
    };

    return { customStyle, isDark, isWhite }
};

export default useCustomStyles;
