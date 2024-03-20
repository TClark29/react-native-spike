import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createClient } from '@supabase/supabase-js'
import {useState, useEffect} from 'react'

const supabaseUrl = 'https://vsakxadjlvwmyoqzqxdr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzYWt4YWRqbHZ3bXlvcXpxeGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5MzczOTEsImV4cCI6MjAyNjUxMzM5MX0.9OX2aELrDFRpUZNvMU8f4KwVZ5Une7YSKaOqcWwS3cA'
const supabase = createClient(supabaseUrl, supabaseKey)


export default function App() {

  const [locations, setLocations] = useState(null)
  const [userRouteInfo, setUserRouteInfo] = useState(null)
  const [userId, setUserId] = useState(1)

  useEffect(()=>{
    supabase.from('locations').select()
    .then((response)=>{
      console.log(response.data, 'locations')
      setLocations(response.data)
    })
    .catch()


  }, [])

  useEffect(()=>{
    supabase
    .from('routes_locations')
    .select('route_id, routes(route_name), locations(location_id, location_name)')
    .eq('route_id', userId)
    .then((response)=>{
      console.log(response.data, 'joined-data')
      setUserRouteInfo(response.data)
      
      
    })
  }, [userId])

        
        
      
      
    
 




  return (
    <View style={styles.container}>
      <Text>React App</Text>
      <ul>
        {locations!==null?  
        locations.map((location, index)=>{
          return (
            <li key={index}>
              <h1>{location.location_name}</h1>
              <p>{location.location_coords.lat}, {location.location_coords.long}</p>

              </li>
          )
        }):null}
      </ul>
      
      
        {userRouteInfo!==null?
        <>
        <h2>{userRouteInfo[0].routes.route_name}</h2>
        <ul>
          {userRouteInfo.map((element)=>{
            return (
              <li>{element.locations.location_name}</li>
            )
          })}
         
        </ul>
        </>
        :null}
      
      <p style={styles.redText}>Hello</p>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redText:{
    backgroundColor: 'rgb(255, 100, 100)',
    color:'rbg(255, 255, 255)'
  }
});
