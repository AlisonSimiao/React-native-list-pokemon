import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native';
import { back } from 'react-native/Libraries/Animated/Easing';
import Type from '../Type';
function Pokemon({ name, url }) {
  const [ImagePokemon, setImagePokemon] = React.useState("")
  const [backColors, setBackColors] = React.useState([])
  const background = {
    grass: '#78C850',
    fire: '#F08030',
    water: '#6890F0',
    bug: '#A8B820',
    normal: '#A8A878',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898',
    ice: '#98D8D8',
    dragon: '#7038F8',
    flying: "#f10bd2",
  }

  React.useEffect(async () => {
    const pokeNumber = url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "");
    setImagePokemon(`https://cdn.traction.one/pokedex/pokemon/${pokeNumber}.png`);

    const response = await fetch(url);
    const { types } = await response.json();

    const aux = [];
    for (const tipo of types) {
      aux.push(tipo.type.name)
    }
    setBackColors([...aux]);
  }, [])
  const newColor = background[backColors[0]]? (""+background[backColors[0]])+"DB" : "black";
  const styles = StyleSheet.create({
    view: {
      backgroundColor: newColor,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between',
      alignSelf: "center",
      marginBottom: 30,
      height: 100,
      width: '80%',
      borderRadius: 10,
      paddingBottom: 5,
      paddingLeft: 15,
      shadowColor: '#171717',
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    viewTexts: {
      alignItems: "center",
      justifyContent: 'space-between',
    },
    viewTypes:{
      flexDirection: "row",
    },
    Text: {
      color: '#fff',
      fontSize: 20,
      textTransform: "capitalize",
    },
    img: {
      width: 130,
      height: 130
    }
  });

  return (
    <View style={styles.view}>
      <View style={styles.viewTexts}>
        <Text style={styles.Text}>{name}</Text>
        <View style={styles.viewTypes}>
        {
          backColors.map((tipo) => {
            return <Type key={tipo} nome={tipo} color={background[tipo]} />
          })
        }
        </View>
      </View>
      <Image
        style={styles.img}
        source={{ uri: ImagePokemon !== "" ? ImagePokemon : undefined }}
      />
      <Image
        style={{ height: "100%", width: "30%", position: "absolute", zIndex: -1, right: 0, transform: [{ rotate: "45deg" }], }}
        source={require("./../../../assets/pokebola.png")}
      />
    </View>
  )
}

export default Pokemon