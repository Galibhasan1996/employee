import Toast from 'react-native-toast-message';



export const showToast = (title, text1, text2) => {
    Toast.show({
        type: title,
        text1: text1,
        text2: text2
    });
}
