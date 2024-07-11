import { StyleSheet, View, } from 'react-native'
import React, { useEffect } from 'react'
import { scale } from "react-native-size-matters"
import * as Animatable from 'react-native-animatable';
import useCustomStyles from '../../hooks/CustomStyle/useCustomStyle';
const Splass = ({ navigation }) => {
    // / --------custom Style -----------
    const { customStyle, isDark, isWhite } = useCustomStyles();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Home")
        }, 3000);
        // SystemNavigationBar.stickyImmersive()
    }, [])

    return (
        <View style={[styles.container, customStyle.blackBackground]}>
            <View style={styles.Splass_logo_container}>
                <Animatable.Text animation="pulse" easing="ease-out" iterationCount={5} style={[styles.Splass_logo, customStyle.whiteText]}>Employee</Animatable.Text>
            </View>
        </View>
    )
}

export default Splass

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Splass_logo_container: {
        flexDirection: "row",
        alignItems: 'center',
    },
    Splass_logo: {
        fontSize: scale(30),
        fontWeight: "500"
    }
})