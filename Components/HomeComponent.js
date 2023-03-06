import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

const HomeComponent = () => {

    const [cityName, setCityName] = useState('');
    const [listCities, setListCities] = useState([{ id: 1, name: 'Bangalore' }]);

    const state = useSelector(state => state.addresses)
    const dispatch = useDispatch();


    const onTextChangeForCity = (text) => {
        setCityName(text);
    }

    const searchButtonClick = () => {
        if (cityName.length > 0) {
            dispatch({type: 'SHOW_LOADING'})
            dispatch({ type: 'FETCH_ADDRESS', payload: cityName })
        }
        else {
            dispatch({type: 'ERROR', message: 'Please enter your city name'})

            setTimeout(() => {
                dispatch({type: 'HIDE_ERROR'})
            }, 2000)
        }
        
    }

    return <View style={styles.container}>
        <View style={{ marginTop: 8, marginLeft: 8, marginRight: 8, marginBottom: 8, backgroundColor: '#ffffff', paddingLeft: 10, paddingRight: 10, paddingTop: 8, paddingBottom: 8 }}>
            <TextInput placeholder='Enter City Name' value={cityName} onChangeText={onTextChangeForCity} />
        </View>

        <TouchableOpacity style={{ backgroundColor: '#077be0', marginLeft: 8, marginRight: 8, paddingTop: 8, paddingBottom: 8, alignItems: 'center' }} onPress={searchButtonClick}>
            <Text style={{ color: '#FFFFFF' }}>Search</Text>
        </TouchableOpacity>

            

        {
            state.Status === 'Error' ? <Text style={{margin: 8}}>No Records Found</Text> : <FlatList style={{ marginLeft: 8, marginRight: 8, marginTop: 8 }} data={state.PostOffice} keyExtractor={(data) => { data.Name + " " + data.Pincode }} renderItem={({ item }) => {

                return <View style={{ backgroundColor: '#FFFFFF', padding: 5, marginTop: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Name:</Text>
                        <Text style={{ marginLeft: 8, fontWeight: '600' }}>{item.Name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <Text>BranchType:</Text>
                        <Text style={{ marginLeft: 8, fontWeight: '600' }}>{item.BranchType}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <Text>Division:</Text>
                        <Text style={{ marginLeft: 8, fontWeight: '600' }}>{item.Division}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <Text>Region:</Text>
                        <Text style={{ marginLeft: 8, fontWeight: '600' }}>{item.Region}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <Text>Pincode:</Text>
                        <Text style={{ marginLeft: 8, fontWeight: '600' }}>{item.Pincode}</Text>
                    </View>
                </View>
            }} /> 
        }
        
        {state.isLoading && <View style={{ backgroundColor: '#88888888', position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ backgroundColor: '#FFFFFF', width: '70%', height: 150, justifyContent: 'center', borderRadius: 10, alignItems: 'center', marginBottom: 150 }}>
                <ActivityIndicator size="large" color="#039be6" />
                <Text style={{ marginTop: 15, color: '#222222' }}>Fetching addresses...</Text>
            </View>
        </View>}

        {
            state.errorStatus && <View style={{ backgroundColor: '#88888888', position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ backgroundColor: '#FFFFFF', width: '70%', height: 70, justifyContent: 'center', borderRadius: 10, alignItems: 'center', marginBottom: 70 }}>
                
                <Text style={{ color: '#222222' }}>{state.ErrorMessage}</Text>
            </View>
        </View>
        }


    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    }
})

export default HomeComponent;