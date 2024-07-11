import { StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import useCustomStyles from '../../../hooks/CustomStyle/useCustomStyle'

const CommonButton = ({ title, onpress }) => {
    // / --------custom Style -----------
    const { customStyle, isDark, isWhite } = useCustomStyles();

    return (
        <TouchableOpacity style={[styles.container, customStyle.whiteBackground]} onPress={() => {
            onpress()
        }}>
            <Text style={[styles.buttonTitle, customStyle.blackText]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CommonButton

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(95),
        alignSelf: 'center',
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: scale(10),
    },
    buttonTitle: {
        paddingVertical: scale(10),
        fontWeight: "500",
        fontSize: scale(13),
    }
})