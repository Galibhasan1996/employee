import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import useCustomStyles from '../../hooks/CustomStyle/useCustomStyle';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { AllColor } from '../../Util/Color/Color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import { ATTENDANCE, BASE_URL, getAllTypeDATA, styleConsole } from '../../Util/constent/Toast/server';
import axios from 'axios';
import { showToast } from '../../Util/constent/Toast/Toast';
import { useNavigation } from '@react-navigation/native';

const UserDetail = ({ route }) => {
    const navigation = useNavigation()
    const { customStyle, isDark } = useCustomStyles();
    const [currentDate, setCurrentDate] = useState(moment());
    const [attendanceStatus, setAttendanceStatus] = useState('present');

    const goToNextDay = () => {
        setCurrentDate(prevDate => moment(prevDate).add(1, 'days'));
    };

    const goToPreviousDay = () => {
        setCurrentDate(prevDate => moment(prevDate).subtract(1, 'days'));
    };

    const formatDate = date => date.format('MMMM D, YYYY');

    const { name, Designation, Employee_id, emp_sallary } = route.params?.item;

    const renderAttendanceButton = (status) => (
        <TouchableOpacity
            style={[styles.attendanceButton, customStyle.whiteBackground]}
            onPress={() => setAttendanceStatus(status)}
        >
            {attendanceStatus === status ? (
                <FontAwesome name="dot-circle-o" size={scale(30)} color={isDark ? AllColor.black : AllColor.white} />
            ) : (
                <Octicons name="circle" size={scale(25)} color={isDark ? AllColor.black : AllColor.white} />
            )}
            <Text style={[styles.buttonText, customStyle.blackText]}>{status}</Text>
        </TouchableOpacity>
    );

    const renderInputField = (field) => (
        <TextInput
            placeholder={field}
            placeholderTextColor={isDark ? AllColor.white : AllColor.black}
            style={[styles.load_advanced_input, customStyle.whiteBorder]}
        />
    );


    const AddAttendance = () => {
        try {
            getAllTypeDATA("POST", ATTENDANCE, "attendance", {
                date: currentDate.format('MMMM D, YYYY'),
                employeeName: name,
                Employee_id: Employee_id,
                status: attendanceStatus
            })
                .then((data) => {
                    showToast("success", name, "Attendance Added Successfully")
                    navigation.navigate('Home')
                })
                .catch((err) => {
                    console.log("🚀 ~ file: UserDetail.js:66 ~ AddAttendance ~ err:", err)
                })
        } catch (error) {
            console.log("🚀 ~ file: UserDetail.js:58 ~ AddAttendance ~ error:", error)
        }
    }



    return (
        <View style={[styles.container, customStyle.blackBackground]}>
            <View style={styles.dateContainer}>
                <TouchableOpacity onPress={goToPreviousDay}>
                    <MaterialIcons name="navigate-before" size={scale(30)} color={isDark ? AllColor.white : AllColor.black} />
                </TouchableOpacity>
                <Text style={{ color: isDark ? AllColor.white : AllColor.black }}>{formatDate(currentDate)}</Text>
                <TouchableOpacity onPress={goToNextDay}>
                    <MaterialIcons name="navigate-next" size={scale(30)} color={isDark ? AllColor.white : AllColor.black} />
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
                <View style={[styles.initialContainer, customStyle.whiteBackground]}>
                    <Text style={[styles.initialText, customStyle.blackText]}>{name?.charAt(0)}</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={customStyle.whiteText}>{name}</Text>
                    <Text style={customStyle.whiteText}>{`${Designation} (${Employee_id})`}</Text>
                </View>
            </View>
            <View style={styles.salaryContainer}>
                <Text style={{ color: isDark ? AllColor.white : AllColor.black }}>{`Salary: ${emp_sallary}`}</Text>
            </View>
            <View style={styles.attendanceContainer}>
                <Text style={{ color: isDark ? AllColor.white : AllColor.black }}>ATTENDANCE</Text>
            </View>
            <View style={styles.attendanceButtonContainer}>
                {renderAttendanceButton('present')}
                {renderAttendanceButton('absent')}
                {renderAttendanceButton('half day')}
                {renderAttendanceButton('holiday')}
            </View>
            <View style={styles.load_advanced_container}>
                <TextInput
                    placeholder={"Advanced / Loan"}
                    placeholderTextColor={isDark ? AllColor.white : AllColor.black}
                    style={[styles.load_advanced_input, customStyle.whiteBorder]}
                />
                <TextInput
                    placeholder={"Extra Bonus"}
                    placeholderTextColor={isDark ? AllColor.white : AllColor.black}
                    style={[styles.load_advanced_input, customStyle.whiteBorder]}
                />
            </View>
            <View style={styles.submit_Attendance_container}>
                <TouchableOpacity style={[styles.mainButton, customStyle.whiteBackground]} onPress={() => {
                    AddAttendance()
                }}>
                    <Text style={customStyle.blackText}>{"Submit Attendance"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UserDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: scale(10),
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: scale(5),
        paddingHorizontal: scale(10),
    },
    initialContainer: {
        height: scale(50),
        width: scale(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(30),
    },
    initialText: {
        fontSize: scale(20),
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    nameContainer: {
        marginLeft: scale(5),
    },
    salaryContainer: {
        paddingLeft: scale(15),
    },
    attendanceContainer: {
        paddingLeft: scale(15),
    },
    attendanceButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    attendanceButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: scale(5),
        paddingVertical: scale(5),
        paddingLeft: scale(10),
        borderRadius: scale(5),
        marginVertical: scale(10),
        width: scale(150),
        height: scale(40),
    },
    buttonText: {
        fontWeight: '500',
        marginLeft: scale(5),
    },
    load_advanced_container: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 10,
        marginHorizontal: scale(20),
    },
    load_advanced_input: {
        borderRadius: scale(5),
        marginTop: 10,
        borderWidth: 1,
        padding: 10,
        flex: 1,
    },
    submit_Attendance_container: {
        width: responsiveScreenWidth(100),
        height: scale(40),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: scale(15),
    },
    mainButton: {
        width: responsiveScreenWidth(50),
        height: scale(40),
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
    }
});
