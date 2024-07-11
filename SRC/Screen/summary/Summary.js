import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React, { useState, useEffect } from 'react'
import useCustomStyles from '../../hooks/CustomStyle/useCustomStyle'
import { ATTENDANCE, BASE_URL, styleConsole } from '../../Util/constent/Toast/server'
import axios from 'axios'
import { DataTable } from 'react-native-paper';
import moment from 'moment'
import MarkAttendanceEmpList from '../markAttendanceEmp/MarkAttendanceEmpList'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { AllColor } from '../../Util/Color/Color'

const Summary = () => {
    const { customStyle, isDark, isWhite } = useCustomStyles()

    const [curentDate, setcurentDate] = useState(moment());
    const [Attendance, setAttendance] = useState([]);




    // --------go to next day-----------
    const goToNextMonth = () => {
        const nextDate = moment(curentDate).add(1, 'months');
        setcurentDate(nextDate);
    }

    // --------go to next day-----------
    const goToPreviousMonth = () => {
        const previousDate = moment(curentDate).subtract(1, 'months');
        setcurentDate(previousDate);
    }
    // -----------format date ---------------
    const formatDate = (date) => {
        return date.format('MMMM, YYYY');
    }

    const summryReport = () => {
        try {
            axios.get(`${BASE_URL}${ATTENDANCE}/attendance-Report-all-emp`, {
                params: {
                    month: 5,
                    year: 2024
                }
            })
                .then((data) => {
                    styleConsole("get summary report data ", data.data)
                    setAttendance(data.data.report)
                })
                .catch((err) => {
                    console.log(err);
                })
        } catch (error) {
            console.log("🚀 ~ file: Summary.js:48 ~ summryReport ~ error:", error)
        }
    }
    useEffect(() => {
        summryReport()
    }, [])


    return (
        <View style={[styles.container, customStyle.blackBackground]}>
            {/* -----------date next and back container------------- */}
            <View style={styles.current_date_container}>
                <TouchableOpacity onPress={() => {
                    goToPreviousMonth()
                }}>
                    <MaterialIcons name="navigate-before" size={scale(30)} color={isDark ? AllColor.white : AllColor.black} />
                </TouchableOpacity>
                <View>
                    <Text style={{ color: isDark ? AllColor.white : AllColor.black }}>{formatDate(curentDate)}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    goToNextMonth()
                }}>
                    <MaterialIcons name="navigate-next" size={scale(30)} color={isDark ? AllColor.white : AllColor.black} />
                </TouchableOpacity>
            </View>
            <MarkAttendanceEmpList data={Attendance} />
            {
                Attendance.map((item, index) => {
                    return (
                        <View style={[styles.report, customStyle.whiteBackground]} key={index}>

                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title><Text style={[customStyle.blackText, { fontWeight: "500" }]}>{"P"}</Text></DataTable.Title>
                                    <DataTable.Title><Text style={[customStyle.blackText, { fontWeight: "500" }]}>{"A"}</Text></DataTable.Title>
                                    <DataTable.Title><Text style={[customStyle.blackText, { fontWeight: "500" }]}>{"HD"}</Text></DataTable.Title>
                                    <DataTable.Title><Text style={[customStyle.blackText, { fontWeight: "500" }]}>{"H"}</Text></DataTable.Title>
                                    <DataTable.Title><Text style={[customStyle.blackText, { fontWeight: "500" }]}>{"NW"}</Text></DataTable.Title>
                                </DataTable.Header>
                                <DataTable.Row>
                                    <DataTable.Cell><Text style={[customStyle.blackText, { fontWeight: "500" }]}>{item.present}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={[customStyle.blackText, { fontWeight: "500" }]}>{item.absent}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={[customStyle.blackText, { fontWeight: "500" }]}>{item.halfday}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={[customStyle.blackText, { fontWeight: "500" }]}>{item.holiday}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={[customStyle.blackText, { fontWeight: "500" }]}>{8}</Text></DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                        </View>
                    )
                })
            }


        </View>
    )
}

export default Summary

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
    report: {
        marginVertical: scale(10)
    }
})