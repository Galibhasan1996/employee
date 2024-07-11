import { StyleSheet, Text, View, ScrollView, useColorScheme } from 'react-native'
import React, { useState, } from 'react'
import { AllColor } from '../../Util/Color/Color'
import CommonInput from '../../Component/header/input/CommonInput'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import CommonButton from '../../Component/header/button/CommonButton'
import { showToast } from '../../Util/constent/Toast/Toast'
import { getAllTypeDATA, } from '../../Util/constent/Toast/server'
import { useNavigation } from '@react-navigation/native'
import CommonHeader from '../../Component/header/CommonHeader'
import useCustomStyles from '../../hooks/CustomStyle/useCustomStyle'

const AddEmp = () => {
    // / --------custom Style -----------
    const { customStyle, isDark, isWhite } = useCustomStyles();
    const navigation = useNavigation()
    // ----------state--------------
    const [country, setcountry] = useState("");
    const [Name, setName] = useState("");
    const [EmpId, setEmpId] = useState("");
    const [Designation, setDesignation] = useState("");
    const [mobile, setmobile] = useState("");
    const [DateOfBirth, setDateOfBirth] = useState("");
    const [JoiningDate, setJoiningDate] = useState("");
    const [ActiveEmp, setActiveEmp] = useState(true);
    const [salary, setsalary] = useState('');
    const [address, setaddress] = useState("");
    const [email, setemail] = useState("");


    const addEmp = () => {
        try {
            getAllTypeDATA("POST", 'register', {
                name: Name,
                email: email,
                country: country,
                Employee_id: EmpId,
                Designation: Designation,
                mobile: mobile,
                dateofBirth: DateOfBirth,
                joiningDate: JoiningDate,
                emp_sallary: salary,
                address: address,
                activeEmp: ActiveEmp,
            })
                .then((data) => {
                    if (data.message) {
                        showToast("error", data.message, data.message)
                    } else if (data.error) {
                        showToast("error", data.error, data.error)
                    }
                    else if (data.message === 'emp created successfully') {
                        showToast("success", data.message, data.message)
                        setcountry("")
                        setName("")
                        setEmpId("")
                        setDesignation("")
                        setmobile("")
                        setDateOfBirth("")
                        setJoiningDate("")
                        setsalary("")
                        setaddress("")
                        setemail("")
                    } {
                    }
                    navigation.goBack()
                })
                .catch((err) => {
                    console.log("🚀 ~ file: AddEmp.js:86 ~ addEmp ~ err:", err.message)
                })
        } catch (error) {
            console.log("🚀 ~ file: AddEmp.js:89 ~ addEmp ~ error:", error.message)
        }
    }

    // ------------validation--------------
    const validation = () => {
        if (email === "") {
            return showToast("error", "Please Enter email", "email")
        } else if (country === "") {
            return showToast("error", "Please Enter country", "country")
        } else if (Name === "") {
            return showToast("error", "Please Enter name", "name")
        } else if (EmpId === "") {
            return showToast("error", "Please Enter employee id", "employee id")
        } else if (Designation === "") {
            return showToast("error", "Please Enter designation", "designation")
        } else if (mobile === "") {
            return showToast("error", "Please Enter mobile", "mobile")
        } else if (DateOfBirth === "") {
            return showToast("error", "Please Enter Date Of Birth", "Date Of Birth")
        } else if (JoiningDate === "") {
            return showToast("error", "Please Enter Joining Date", "Joining Date")
        } else if (salary === "") {
            return showToast("error", "Please Enter Salary", "Salary")
        } else if (address === "") {
            return showToast("error", "Please Enter Address", "Address")
        } else {
            addEmp()
        }
    }
    return (
        <>
            {/* --------------common header------------- */}
            <CommonHeader
                onPressBack={() => {
                    navigation.goBack()
                }}
                backIcon={"keyboard-backspace"}
            />
            <ScrollView style={customStyle.blackBackground}>
                <View style={[styles.container, customStyle.blackBackground]}>
                    {/* --------------email inupt------------- */}
                    <CommonInput
                        inputHeaderTitle={"Email"}
                        placeholder={"Email"}
                        value={email}
                        onChangeText={(t) => setemail(t)}
                    />
                    {/* --------country input------------ */}
                    <CommonInput
                        inputHeaderTitle={"Country"}
                        placeholder={"Country"}
                        value={country}
                        onChangeText={(t) => setcountry(t)}
                    />
                    {/* -----------name input------------- */}
                    <CommonInput
                        inputHeaderTitle={"Name"}
                        placeholder={"Name"}
                        value={Name}
                        onChangeText={(t) => setName(t)}
                    />
                    {/* ---------------empid input------------- */}
                    <CommonInput
                        inputHeaderTitle={"Employee ID"}
                        placeholder={"Employee ID"}
                        value={EmpId}
                        onChangeText={(t) => setEmpId(t)}
                    />
                    {/* ---------------designation input------------- */}
                    <CommonInput
                        inputHeaderTitle={"Designation"}
                        placeholder={"Designation"}
                        value={Designation}
                        onChangeText={(t) => setDesignation(t)}
                    />
                    {/* ---------------mobile input------------- */}
                    <CommonInput
                        inputHeaderTitle={"Mobile"}
                        placeholder={"Mobile"}
                        value={mobile}
                        onChangeText={(t) => setmobile(t)}
                        keyboardType={"phone-pad"}
                    />
                    {/* ---------------date of birth input------------- */}
                    <CommonInput
                        inputHeaderTitle={"Date Of Birth"}
                        placeholder={"Date Of Birth"}
                        value={DateOfBirth}
                        onChangeText={(t) => setDateOfBirth(t)}
                        keyboardType={"phone-pad"}
                    />
                    {/* ---------------joining input -------------- */}
                    <CommonInput
                        inputHeaderTitle={"Joining Date"}
                        placeholder={"Joining Date"}
                        value={JoiningDate}
                        onChangeText={(t) => setJoiningDate(t)}
                        keyboardType={"phone-pad"}
                    />
                    {/* ---------------salary input------------- */}
                    <CommonInput
                        inputHeaderTitle={"Salary"}
                        placeholder={"Salary"}
                        value={salary}
                        onChangeText={(t) => setsalary(t)}
                        keyboardType={"phone-pad"}
                    />
                    {/* ---------------address input------------- */}
                    <CommonInput
                        inputHeaderTitle={"Address"}
                        placeholder={"Address"}
                        value={address}
                        onChangeText={(t) => setaddress(t)}
                    />
                    {/* -------------active emp view--------- */}
                    <View style={styles.activeEmp}>
                        <Text style={{ color: isDark ? AllColor.gray : AllColor.gray }}>{"Active Employee"}</Text>
                        <Text style={{ color: isDark ? AllColor.gray : AllColor.gray }}>{"True"}</Text>
                    </View>
                    {/* -----------common button----------- */}
                    <CommonButton
                        title={"Add Employee"}
                        onpress={() => {
                            validation()
                        }}
                    />
                </View>
            </ScrollView>
        </>

    )
}

export default AddEmp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    activeEmp: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: responsiveScreenWidth(100),
        paddingHorizontal: scale(15),
    }
})