import { StyleSheet, Text, View, TouchableOpacity, FlatList, useColorScheme } from 'react-native'
import React from 'react'
import { AllColor } from '../../Util/Color/Color'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { scale } from "react-native-size-matters"
import { BottomCardData } from '../../Util/data/topCard/Data';
import useCustomStyles from '../../hooks/CustomStyle/useCustomStyle';

const BottomCard = () => {

    // ----------custom style----------
    const { customStyle, isDark, isWhite } = useCustomStyles()

    return (
        <View style={[styles.container, customStyle.blackBackground]}>
            <View style={[styles.main_container, customStyle.whiteBackground]}>
                <FlatList data={BottomCardData} numColumns={2} renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={[styles.bottomListCardContainer, customStyle.blackBackground]} key={item.id}>
                            <MaterialIcons name={item.icon} size={scale(30)} color={isDark ? AllColor.white : AllColor.black} />
                            <Text style={customStyle.whiteText}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }} />
            </View>
        </View>
    )
}

export default BottomCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main_container: {
        width: responsiveScreenWidth(95),
        // height: scale(200),
        alignSelf: 'center',
        borderRadius: scale(10),
        marginVertical: scale(10),
        padding: scale(5),
    },
    bottomListCardContainer: {
        width: responsiveScreenWidth(43),
        height: scale(90),
        alignItems: 'center',
        justifyContent: 'center',
        margin: scale(5),
        borderRadius: scale(10),
    }
})