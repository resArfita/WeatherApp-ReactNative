import React, { useState } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import CustomTextInput from './customTextInput'

//tambahkan searchWearher sebagai prop
const WeatherSearch = ({ searchWeather }) => {
    const [location, setLocation] = useState('')

    return (
        <View>
            <CustomTextInput
                placeholder='Search the weather of your city'
                numberOfLines={1}
                //tambahkan text dan onChange
                text={location}
                onChange={setLocation}
            />
            <View style={styles.buttonWrapper}>
                <Button title='Search' onPress={() => searchWeather(location)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonWrapper: {
        marginTop: 20,
    },
})

export default WeatherSearch