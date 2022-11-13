import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Button } from 'react-native';
import { useEffect, useState } from 'react';


export default  App = () => {
  
  const [isLoading, setLoading] = useState(true);
   const [data, setData] = useState([]);
  const getSchoolNamesFromApi = async () =>{
    try {
      const response = await fetch ('https://data.cityofnewyork.us/resource/s3k6-pzi2.json');
    const json = await response.json();

    setData(json);}
    catch(error){
      console.error(error);
    } finally { setLoading(false);
    }
  }
  useEffect(() => {
    getSchoolNamesFromApi();
    },[]);

  const [moreData, setMoreData] = useState([]);
  const getSchoolInfo = async () => {
    try { 
      const response = await fetch ('https://data.cityofnewyork.us/resource/f9bf-2cp4.json');
    const json = await response.json();

    setMoreData(json);}

     catch(error){
      console.error(error);
    } finally { setLoading(false);
    }
  }
useEffect(() => {
    getSchoolInfo();
    },[]);

  return (
    <View style={ styles.container }>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList 
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
           <Button onPress = {getSchoolInfo(item.dbn)} 
           accessibilityLabel = "{item.school_name}"
            title = <Text> {item.school_name } </Text> />
          
          )}
        />
      // <FlatList 
      //     data={moreData}
      //     keyExtractor={({ id }) => id}
      //     renderItem={({ item }) => (<Text> {item.sat_critical_reading_avg_score} {sat_math_avg_score}      {sat_writing_avg_score} {num_of_sat_test_takers}</Text> 
      //     )}
      //   /> 
      )}
    </View>
  );
  }
  
;
 const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    margin: 5,
  },
 listItems:{
   margin: 4,
   backgroundColor: 'lightgrey',
 }
  
});