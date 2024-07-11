import { StyleSheet, Text, View, TouchableOpacity, FlatList, } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { CenterCardData } from '../../Util/data/topCard/Data'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useCustomStyles from '../../hooks/CustomStyle/useCustomStyle'
import { AllColor } from '../../Util/Color/Color'
import { useNavigation } from '@react-navigation/native'

const CenterCard = () => {
    const navigation = useNavigation()

    // ----------custom style----------
    const { customStyle, isDark, isWhite } = useCustomStyles()
    return (
        <View style={[styles.container, customStyle.blackBackground]}>
            <View style={[styles.inside_container, customStyle.whiteBackground]}>
                <FlatList
                    data={CenterCardData}
                    renderItem={({ item }) => {
                        return (
                            <View style={[styles.cardContainer, customStyle.blackBackground]} >
                                <View>
                                    <MaterialIcons name={item.Lefticon} size={scale(30)} color={isDark ? AllColor.white : AllColor.black} />
                                </View>
                                <View style={styles.center_list_text_container}>
                                    <Text style={[customStyle.whiteText]}>{item.name}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    if (item.id === 2) {
                                        navigation.navigate("Summary")
                                    }
                                }}>
                                    <MaterialIcons name={item.RightIcon} size={scale(30)} color={isDark ? AllColor.white : AllColor.black} />
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                ></FlatList>
            </View>
        </View>
    )
}

export default CenterCard

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(100),
    },
    inside_container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveScreenWidth(95),
        alignSelf: 'center',
        borderRadius: scale(10),
    },
    cardContainer: {
        width: responsiveScreenWidth(90),
        height: scale(60),
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: scale(10),
        marginVertical: scale(10),
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
    },
    center_list_text_container: {
        width: responsiveScreenWidth(65),
    }
})