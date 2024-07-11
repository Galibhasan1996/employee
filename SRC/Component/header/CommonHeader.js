import { StyleSheet, View, TouchableOpacity, TextInput, } from 'react-native'
import React from 'react'
import { AllColor } from '../../Util/Color/Color'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useCustomStyles from '../../hooks/CustomStyle/useCustomStyle'


const CommonHeader = ({ Value, onChangeText, placeholder, onPressBack, addIcon, onClickAddIcon, backIcon, searchIcon, showInput = false }) => {

    // / --------custom Style -----------
    const { customStyle, isDark, isWhite } = useCustomStyles();

    return (
        <View style={[styles.container, customStyle.blackBackground]}>
            <TouchableOpacity onPress={() => {
                onPressBack()
            }}>
                <MaterialIcons name={backIcon} size={scale(25)} color={isDark ? AllColor.white : AllColor.black} style={styles.backIcon} />
            </TouchableOpacity>
            {
                searchIcon && <View>
                    <Ionicons name={searchIcon} size={scale(20)} color={isDark ? AllColor.white : AllColor.black} style={styles.searchIcon} />
                </View>
            }
            {
                showInput && <View>
                    <TextInput
                        placeholder={placeholder}
                        style={styles.main_input}
                        onChangeText={onChangeText}
                        value={Value}
                    />
                </View>
            }
            {
                addIcon &&
                <TouchableOpacity onPress={() => {
                    onClickAddIcon()
                }}>
                    <Ionicons name={addIcon} size={scale(25)} color={isDark ? AllColor.white : AllColor.black} style={styles.addIcon} />
                </TouchableOpacity>
            }
        </View>
    )
}

export default CommonHeader

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(100),
        height: scale(40),
        flexDirection: "row",
        alignItems: 'center',
    },
    backIcon: {
        marginHorizontal: scale(10)
    },
    searchIcon: {
        marginRight: scale(10)
    },
    main_input: {
        width: responsiveScreenWidth(68),
    },
    addIcon: {
        marginLeft: scale(4)
    }
})