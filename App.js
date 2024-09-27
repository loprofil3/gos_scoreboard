import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';

export default function App() {
  const [players, setPlayers] = useState([]); // Track players
  const [playerName, setPlayerName] = useState(''); // Input for player name
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // Current player's index
  const [tricksPerformed, setTricksPerformed] = useState([]); // Track tricks
  const [trickName, setTrickName] = useState(''); // Input for trick name
  const [skateWord, setSkateWord] = useState('SKATE'); // Input for the word representing the game

  // Function to add a player
  const addPlayer = () => {
    if (playerName) {
      setPlayers([...players, { name: playerName, letters: '' }]);
      setPlayerName(''); // Reset input field
    }
  };

  // Function to add a letter when a player misses a trick
  const addLetter = (playerIndex) => {
    let newPlayers = [...players];
    let currentLetters = newPlayers[playerIndex].letters;

    // Add the next letter from the skate word
    if (currentLetters.length < skateWord.length) {
      newPlayers[playerIndex].letters += skateWord[currentLetters.length];
    } else {
      Alert.alert(`${newPlayers[playerIndex].name} is out!`);
      newPlayers.splice(playerIndex, 1); // Remove the player if out
      if (newPlayers.length === 1) {
        Alert.alert(`Champion: ${newPlayers[0].name}`);
      }
    }

    setPlayers(newPlayers);
  };

  // Function to add a new trick to the list
  const addTrick = () => {
    if (trickName && !tricksPerformed.includes(trickName)) {
      setTricksPerformed([...tricksPerformed, trickName]);
      setTrickName(''); // Reset input field
    } else {
      Alert.alert("Trick already performed or invalid");
    }
  };

  // Function to proceed to the next player's turn
  const nextPlayer = () => {
    if (players.length > 0) {
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setPlayers([]);
    setTricksPerformed([]);
    setCurrentPlayerIndex(0);
    setPlayerName('');
    setTrickName('');
    setSkateWord('SKATE'); // Reset the skate word
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game of Skate</Text>

      {/* Input for changing the skate word */}
      <TextInput
        value={skateWord}
        onChangeText={setSkateWord}
        placeholder="Change the word (default: SKATE)"
        style={styles.input}
      />

      {/* Input for adding players */}
      <TextInput
        value={playerName}
        onChangeText={setPlayerName}
        placeholder="Enter player name"
        style={styles.input}
      />
      <Button title="Add Player" onPress={addPlayer} />

      {/* Input for adding tricks */}
      <TextInput
        value={trickName}
        onChangeText={setTrickName}
        placeholder="Enter trick name"
        style={styles.input}
      />
      <Button title="Add Trick" onPress={addTrick} />

      {/* Display tricks performed */}
      <FlatList
        data={tricksPerformed}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.trickItem}>Trick: {item}</Text>
        )}
      />

      {/* Display players and their letters */}
      <FlatList
        data={players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.playerItem}>
            <Text style={styles.playerText}>
              {item.name} - Letters: {item.letters || 'None'}
            </Text>
            <Button title="Add Letter" onPress={() => addLetter(index)} />
          </View>
        )}
      />

      {/* Button to move to the next player */}
      {players.length > 0 && (
        <Button title="Next Player" onPress={nextPlayer} />
      )}

      {/* Button to reset the game */}
      <Button title="Reset Game" onPress={resetGame} color="red" />

      {/* Display current player */}
      {players.length > 0 && (
        <Text style={styles.currentPlayer}>
          Current Player: {players[currentPlayerIndex].name}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
  trickItem: {
    fontSize: 18,
    marginVertical: 5,
  },
  playerItem: {
    marginVertical: 10,
  },
  playerText: {
    fontSize: 18,
  },
  currentPlayer: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
