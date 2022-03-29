import { Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity , ScrollView} from 'react-native';
import React from 'react';
import Pokemon from './src/components/Pokemon';

export default function App() {
  const [pokemons, setPokemons] = React.useState([]);
  const [next, setNext] = React.useState("");
  const [prev, setPrev] = React.useState("");

  const goToPage = async (url = "https://pokeapi.co/api/v2/pokemon") => {
    if(!url)
      return;

    const response = await fetch(url);
    const { results, previous, next } = await response.json();

    setPrev(previous);
    setNext(next);
    setPokemons(results);
  }

  const onPressPrevious = ()=>{
    goToPage(prev);
  }

  const onPressNext = ()=>{
    goToPage(next);
  }

  React.useEffect(goToPage, []);
  const Arrow = {
    position: "absolute",
    top: "50%",
    
    width:  40,
    height: 40,
    alignItems: "center",
    justifyContent: 'center',
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 30,
      backgroundColor: '#3a383a',
    },
    Text: {
      color: '#fff',
    },
    ArrowRight: {
      ...(Arrow),
      right: 10,
    },
    ArrowLeft: {
      transform: [{ rotate: "180deg" }],
      ...(Arrow),
      left: 10,
      
    },
  });
  
  return (
    <SafeAreaView style={styles.container}>
            
      <FlatList
        data={pokemons}
        renderItem={ ({item}) => <Pokemon {...item}/> }
        keyExtractor={item => item.name}
      />
      
      <TouchableOpacity
         onPress={onPressPrevious}
         style={styles.ArrowLeft}         
         >
       <Image 
          style={{ width: 40,height: 40}}
          source={ {uri: "https://cdn4.iconfinder.com/data/icons/arrow-solid-pixel-art/48/3-reverse_forward_arrow_game_application_mobile_up_down_left_right-512.png"}}
        />
      </TouchableOpacity>
      <TouchableOpacity
         onPress={onPressNext}
         style={styles.ArrowRight}    
         >
       <Image 
          style={{ width: 40,height: 40}}
          source={ {uri: "https://cdn4.iconfinder.com/data/icons/arrow-solid-pixel-art/48/3-reverse_forward_arrow_game_application_mobile_up_down_left_right-512.png"}}
        />
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}
