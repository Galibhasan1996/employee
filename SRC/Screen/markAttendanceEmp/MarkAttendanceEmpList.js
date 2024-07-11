import { StyleSheet, Text, View, FlatList, TouchableOpacity, } from 'react-native'
import React from 'react'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import useCustomStyles from '../../hooks/CustomStyle/useCustomStyle'
import { useNavigation } from '@react-navigation/native'

const MarkAttendanceEmpList = ({ data }) => {

    const navigation = useNavigation()

    // / --------custom Style -----------
    const { customStyle, isDark, isWhite } = useCustomStyles();


    return (
        <>
            <View style={[styles.container, customStyle.blackBackground]}>
                <FlatList data={data} renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.container_of_card} onPress={() => {
                            navigation.navigate('UserDetail', { item: item })
                        }}>
                            {/* -------------first char of emp name------------- */}
                            <View style={[styles.first_char_of_emp_name_container, customStyle.whiteBackground]}>
                                <Text style={[styles.first_char_of_emp_name_text, customStyle.blackText]}>{item?.name?.charAt(0)}</Text>
                            </View>
                            {/* ------------name and Designation------------- */}
                            <View style={styles.name_container}>
                                <Text style={customStyle.whiteText}>{item?.name}</Text>
                                <Text style={customStyle.whiteText}>{item?.designation} ({item?.Employee_id})</Text>
                            </View>
                            {
                                item?.status === "present" ?
                                    (<View style={[styles.status_container, customStyle.whiteBackground]}>
                                        <Text style={[styles.present_text, customStyle.blackText]}>{item?.status?.charAt(0)}</Text>
                                    </View>)
                                    : null
                            }
                        </TouchableOpacity>
                    )
                }} />
            </View>
        </>

    )
}

export default MarkAttendanceEmpList

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff"
    },
    container_of_card: {
        width: responsiveScreenWidth(100),
        height: scale(50),
        alignSelf: 'center',
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: scale(5),
        paddingHorizontal: scale(10),
    },
    first_char_of_emp_name_container: {
        height: "100%",
        width: scale(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(30),
    },
    first_char_of_emp_name_text: {
        fontSize: scale(20),
        fontWeight: "500",
        textTransform: "uppercase"
    },
    name_container: {
        width: responsiveScreenWidth(80),
        marginLeft: scale(5),
    },
    status_container: {
        height: scale(15),
        width: scale(15),
        position: "absolute",
        right: scale(15),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(30),
    },
    present_text: {
        fontSize: scale(10),
        textTransform: "uppercase",
        fontWeight: "600"
    }
})


