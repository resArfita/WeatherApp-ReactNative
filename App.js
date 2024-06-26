import React, { useState } from 'react'
//import axios, base_url, dan api_key
import axios from 'axios'
import { BASE_URL, API_KEY } from './src/constant'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import WeatherSearch from './src/components/weatherSearch'
import WeatherInfo from './src/components/weatherInfo'

const App = () => {
  //define state weatherData dan setWeatherData
  const [weatherData, setWeatherData] = useState()
  //define state status
  const [status, setStatus] = useState('')

  //define function renderComponent
  const renderComponent = () => {
    switch(status) {
      case 'loading':
        return <ActivityIndicator size='large' />
      case 'success':
        return <WeatherInfo weatherData={weatherData} />
      case 'error':
        return (
          <Text> Something went wrong. Please try again with a correct city name.</Text>
        )
      default:
        return
    }
  }

  const searchWeather = (location) => {
    //function searchWeather dengan axios
    setStatus('loading') //atur status ke loading
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data
        //console.log(data)
        data.visibility /= 1000
        data.visibility = data.visibility.toFixed(2)
        data.main.temp -= 273.15 //convert Kelvin to CC
        data.main.temp = data.main.temp.toFixed(2)
        setWeatherData(data)
        setStatus('success') //atur status ke sukses
      })
      .catch((error) => {
        //console.log(error)
        setStatus('error')
      })
  }


  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      {/* function renderComponent */}
      <View style={styles.marginTop20}></View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

export default App