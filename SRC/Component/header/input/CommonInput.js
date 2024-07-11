import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AllColor } from '../../../Util/Color/Color'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import Employee_List from './../../../Screen/Employee_List/Employee_List';

const CommonInput = ({ inputHeaderTitle, placeholder, value, onChangeText, keyboardType }) => {
    const isDark = useColorScheme() === 'dark'
    const isWhite = useColorScheme() === 'light'
    // ----------custom style----------
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
        BlackText: {
            color: isWhite ? AllColor.white : AllColor.black
        },
        transparentBackground: {
            backgroundColor: 'rgba(255,255,255,0.5)',
        },
        border: {
            borderColor: isDark ? AllColor.gray : AllColor.black,
        },

    }
    return (
        <View style={[styles.container,]}>
            {
                inputHeaderTitle && <Text style={[styles.inputHeaderTitle, customStyle.whiteText]}>{inputHeaderTitle}</Text>
            }
            <View style={[styles.inupt_container, customStyle.border]}>
                <TextInput
                    placeholder={placeholder}
                    style={styles.main_input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    )
}

export default CommonInput

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(100),
        paddingHorizontal: scale(10),
        alignSelf: 'center',
    },
    main_input: {
        width: responsiveScreenWidth(93.5),
        borderRadius: scale(10),
        paddingHorizontal: scale(10),
    },
    inupt_container: {
        borderWidth: scale(1),
        borderRadius: scale(10),
        marginVertical: scale(10),
    },
    inputHeaderTitle: {
        fontSize: scale(15),
        fontWeight: "500"
    }
})