import { StyleSheet, Text, View, TouchableOpacity, FlatList, useColorScheme } from 'react-native'
import React from 'react'
import { AllColor } from '../../Util/Color/Color'
import { scale } from "react-native-size-matters"
import { responsiveScreenWidth } from "react-native-responsive-dimensions"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TopCardData } from '../../Util/data/topCard/Data'
import { useNavigation } from '@react-navigation/native'
import useCustomStyles from '../../hooks/CustomStyle/useCustomStyle'

const TopCard = () => {
    // ------------navigation------------
    const navigation = useNavigation()

    // ----------custom style----------
    const { customStyle, isDark, isWhite } = useCustomStyles()

    return (
        <View >
            {/* ------------Employee list------------ */}
            <View style={styles.top_card}>
                <FlatList data={TopCardData} pagingEnabled showsHorizontalScrollIndicator={false} horizontal renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={[styles.inside_card, customStyle.whiteBackground]} onPress={() => {
                            if (index === 0) {
                                navigation.navigate('Employee_List')
                            } else if (index === 1) {
                                navigation.navigate('MarkAttendance')
                            }
                        }}>
                            <MaterialIcons name={item.icon} size={scale(30)} color={isWhite ? AllColor.white : AllColor.black} />
                            <Text style={[styles.inside_card_text, customStyle.blackText]}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }} />
            </View>
        </View>
    )
}

export default TopCard

const styles = StyleSheet.create({
    top_card: {
        width: responsiveScreenWidth(100),
        height: scale(100),
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: scale(10),
    },
    inside_card: {
        width: responsiveScreenWidth(45),
        height: scale(100),
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: scale(8),
    },
    inside_card_text: {
        fontWeight: '500'
    }
})


