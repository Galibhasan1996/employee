import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native'
import Splass from '../Screen/Splass/Splass'
import Home from '../Screen/Home/Home'
import Employee_List from '../Screen/Employee_List/Employee_List'
import AddEmp from '../Screen/addEmp/AddEmp'
import MarkAttendance from '../Screen/markAttendance/MarkAttendance'
import UserDetail from '../Screen/userDetail/UserDetail'
import Summary from '../Screen/summary/Summary'

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
                <Stack.Screen name="Splass" component={Splass} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Employee_List" component={Employee_List} options={{ headerShown: false }} />
                <Stack.Screen name="AddEmp" component={AddEmp} options={{ headerShown: false }} />
                <Stack.Screen name="MarkAttendance" component={MarkAttendance} options={{ headerShown: false }} />
                <Stack.Screen name="UserDetail" component={UserDetail} options={{ headerShown: false }} />
                <Stack.Screen name="Summary" component={Summary} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

