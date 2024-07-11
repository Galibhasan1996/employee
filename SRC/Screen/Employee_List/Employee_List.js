import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AllColor } from '../../Util/Color/Color'
import CommonHeader from '../../Component/header/CommonHeader'
import { AUTH, getAllTypeDATA, styleConsole, } from '../../Util/constent/Toast/server'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchListofEmployee from '../../Component/employeeList/SearchListofEmployee'
import useCustomStyles from '../../hooks/CustomStyle/useCustomStyle'

const Employee_List = ({ navigation }) => {
    // --------custom Style -----------
    const { customStyle, isDark, isWhite } = useCustomStyles();
    // -------------state-----------------
    const [InputValue, setInputValue] = useState("");
    const [empList, setempList] = useState([]);



    const getEmpList = async () => {
        try {
            getAllTypeDATA("GET", AUTH, "get_all_emp")
                .then((data) => {
                    // styleConsole("EmpList", data)
                    setempList(data)
                })
                .catch((error) => {
                    console.log("🚀 ~ file: Employee_List.js:28 ~ getEmpList ~ error:", error)
                })
        } catch (error) {
            console.log("🚀 ~ file: Employee_List.js:31 ~ getEmpList ~ error:", error)
        }
    }

    useEffect(() => {
        getEmpList()

    }, [])




    return (
        <View style={[styles.container, customStyle.blackBackground]}>
            {/* --------------common header------------- */}
            <CommonHeader
                Value={InputValue}
                placeholder={"Search"}
                onChangeText={(t) => {
                    setInputValue(t)
                }}
                onPressBack={() => {
                    navigation.goBack()
                }}
                addIcon={"add-circle-outline"}
                onClickAddIcon={() => {
                    navigation.navigate("AddEmp")
                }}
                backIcon={"keyboard-backspace"}
                searchIcon={'search-outline'}
                showInput={true}
            />
            {
                empList.length != 0 ?
                    (
                        <SearchListofEmployee data={empList} InputValue={InputValue} setInputValue={setInputValue}></SearchListofEmployee>
                    )
                    :
                    (
                        <View style={styles.no_data_found}>
                            <Image source={require('../../Util/image/data.png')} style={styles.no_data_image} />
                            <Text style={[styles.no_data_text, customStyle.whiteText]}>No Employee Found || Click Add Button To Add Employee</Text>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("AddEmp")
                            }}>
                                <Ionicons name={'add-circle-outline'} size={scale(25)} color={isDark ? AllColor.white : AllColor.black} />
                            </TouchableOpacity>
                        </View>
                    )
            }
        </View>
    )
}

export default Employee_List

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    no_data_found: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: responsiveScreenWidth(100),
        justifyContent: "center",
        alignItems: "center"
    },
    no_data_image: {
        width: scale(100),
        height: scale(100),
        borderRadius: scale(100),
    },
    no_data_text: {
        fontSize: scale(10),
        fontWeight: "500",
        marginVertical: scale(10),
        textAlign: "center"
    }
})