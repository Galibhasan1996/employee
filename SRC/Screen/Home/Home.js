import { StyleSheet, Text, View, TouchableOpacity, FlatList, useColorScheme } from 'react-native'
import React from 'react'
import { AllColor } from '../../Util/Color/Color'
import { scale } from "react-native-size-matters"
import { responsiveScreenWidth } from "react-native-responsive-dimensions"
import Feather from 'react-native-vector-icons/Feather'
import TopCard from '../topCard/TopCard'
import CenterCard from '../CenterCard/CenterCard'
import BottomCard from '../bottomCard/BottomCard'
import useCustomStyles from '../../hooks/CustomStyle/useCustomStyle'

const Home = () => {
    // / --------custom Style -----------
    const { customStyle, isDark, isWhite } = useCustomStyles();
    return (
        <View style={[styles.container, customStyle.blackBackground]}>
            {/* --------------top header------------- */}
            <View style={styles.top_header}>
                <TouchableOpacity>
                    <Feather name="bar-chart" size={scale(20)} color={isDark ? AllColor.white : AllColor.black} />
                </TouchableOpacity>
                <View>
                    <Text style={[styles.employee_management_text, customStyle.whiteText]}>{"Employee Management System"}</Text>
                </View>
                <TouchableOpacity>
                    <Feather name="lock" size={scale(20)} color={isDark ? AllColor.white : AllColor.black} />
                </TouchableOpacity>
            </View>

            <FlatList data={[1, 1, 1]} renderItem={({ item, index }) => {
                return (
                    <View style={{ width: responsiveScreenWidth(100), }}>
                        {
                            index === 0 && <TopCard />
                        }
                        {
                            index === 1 && <CenterCard />
                        }
                        {
                            index === 2 && <BottomCard />
                        }
                    </View>
                )
            }} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top_header: {
        width: responsiveScreenWidth(100),
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20),
        paddingVertical: scale(5),
        marginVertical: scale(5),
    },
    employee_management_text: {
        fontWeight: "500"
    },
    top_card: {
        width: responsiveScreenWidth(100),
        height: scale(100),
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: scale(10),
    },
    inside_card: {
        width: "45%",
        height: "100%",
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    inside_card_text: {
        fontWeight: '500'
    }
})