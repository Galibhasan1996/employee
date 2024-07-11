import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, } from 'react-native'
import React, { useState, useEffect } from 'react'
import useCustomStyles from '../../hooks/CustomStyle/useCustomStyle'
import moment from 'moment'
import useFetch_GET_POST from '../../hooks/fetchData/useFetch_GET_POST'
import { ATTENDANCE, AUTH, BASE_URL, styleConsole } from '../../Util/constent/Toast/server'
import axios from 'axios'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { scale } from 'react-native-size-matters'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { AllColor } from '../../Util/Color/Color'
import MarkAttendanceEmpList from '../markAttendanceEmp/MarkAttendanceEmpList'
import Ionicons from 'react-native-vector-icons/Ionicons';

const MarkAttendance = () => {
    // ---------state --------------
    const [curentDate, setcurentDate] = useState(moment());
    const [Attendance, setAttendance] = useState([]);

    // -----------custom Style -------------
    const { customStyle, isDark, isWhite } = useCustomStyles()


    // --------go to next day-----------
    const goToNextDay = () => {
        const nextDate = moment(curentDate).add(1, 'days');
        setcurentDate(nextDate);
    }

    // --------go to next day-----------
    const goToPreviousDay = () => {
        const previousDate = moment(curentDate).subtract(1, 'days');
        setcurentDate(previousDate);
    }
    // -----------format date ---------------
    const formatDate = (date) => {
        return date.format('MMMM D, YYYY');
    }

    const { data, error, loading } = useFetch_GET_POST("GET", "get_all_emp", AUTH)


    const employeeWithAttendance = (data?.emp || []).map((employee) => {
        const attendanceRecord = (Attendance?.data || []).find((atten) => atten.Employee_id === employee.Employee_id);
        return { ...employee, status: attendanceRecord?.status || "" };
    });


    // -------get attendance data-------------

    const getAttendance = async () => {
        try {
            const res = await axios.get(`${BASE_URL}${ATTENDANCE}/attendance`, {
                params: {
                    date: curentDate.format('MMMM D, YYYY')
                }
            })
            // styleConsole("ATTENDANCE", res.data)
            setAttendance(res?.data)
        } catch (error) {
            console.log("🚀 ~ file: MarkAttendance.js:42 ~ getAttendance ~ error:", error)
        }
    }

    useEffect(() => {
        getAttendance()
    }, [curentDate])

    return (
        <View style={[styles.container, customStyle.blackBackground]}>
            {/* -----------date next and back container------------- */}
            <View style={styles.current_date_container}>
                <TouchableOpacity onPress={() => {
                    goToPreviousDay()
                }}>
                    <MaterialIcons name="navigate-before" size={scale(30)} color={isDark ? AllColor.white : AllColor.black} />
                </TouchableOpacity>
                <View>
                    <Text style={{ color: isDark ? AllColor.white : AllColor.black }}>{formatDate(curentDate)}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    goToNextDay()
                }}>
                    <MaterialIcons name="navigate-next" size={scale(30)} color={isDark ? AllColor.white : AllColor.black} />
                </TouchableOpacity>
            </View>
            {/* --------------list of employee------------- */}
            {
                employeeWithAttendance != 0 ?
                    (
                        <MarkAttendanceEmpList data={employeeWithAttendance} ></MarkAttendanceEmpList>
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



export default MarkAttendance

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    current_date_container: {
        flexDirection: "row",
        alignItems: 'center',
        width: responsiveScreenWidth(100),
        justifyContent: 'center',
        marginVertical: scale(10)
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