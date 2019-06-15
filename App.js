import React, { useState, useEffect } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import database from './util/database';

function AddCard() {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const title = useNavigationParam('title');
	const { goBack } = useNavigation();

	const onPressSubmit = () => {
		database.addCardToDeck(title, { question, answer })
			.then(() => {
				goBack(null);
			});
	};

	return (
		<View style={styles.container}>
			<Text>Question</Text>
			<TextInput
				style={styles.input}
				onChangeText={(text) => setQuestion(text)}
			/>
			<Text>Answer</Text>
			<TextInput
				style={styles.input}
				onChangeText={(text) => setAnswer(text)}
			/>
			<Button
				title="Submit"
				onPress={onPressSubmit}
			/>
		</View>
	);
}

function Deck() {
	const title = useNavigationParam('title');
	const { navigate } = useNavigation();

	const onPressAddCard = (title) => {
		navigate('AddCard', { title });
	}

	return (
		<View style={styles.container}>
			<Text>{title}</Text>
			<Button
				title="Add Card"
				onPress={() => onPressAddCard(title)}
			/>
		</View>
	);
}

function Decks() {
	const [decks, setDecks] = useState([]);

	useEffect(() => {
		database.getDecks()
			.then((decks) => {
				setDecks(decks);
			});
		  }, []
	);

	const { navigate } = useNavigation();

	const onPressItem = (title) => {
		navigate('Deck', { title });
	}

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={decks}
				renderItem={
					({item}) => (
						<TouchableOpacity onPress={() => onPressItem(item.title)}>
							<View style={[styles.container, {height: 80, width: 400}]}>
								<Text style>{item.title}</Text>
								<Text>{item.questions.length} cards</Text>
							</View>
						</TouchableOpacity>
					)}
				keyExtractor={(_, index) => index.toString()}
				ItemSeparatorComponent={({}) => (
					<View style={styles.separator} />
				)}
			/>
		</SafeAreaView>
	);
}

function AddDeck() {
	const [title, setTitle] = useState('');
	const { navigate } = useNavigation();

	const onPressCreateDeck = () => {
		database.saveDeckTitle(title)
			.then(() => {
				navigate('Deck', { title });
			});
	};

	return (
		<View style={styles.container}>
			<Text>What's the title of your new deck?</Text>
			<TextInput
				style={styles.input}
				onChangeText={(text) => setTitle(text)}
			/>
			<Button
				title="Create Deck"
				onPress={onPressCreateDeck}
			/>
		</View>
	);
}

export default function App() {
	const TabNavigator = createBottomTabNavigator(
		{
			Decks: {
				screen: Decks,
				navigationOptions: {
					tabBarIcon: ({ tintColor }) =>
						<MaterialCommunityIcons name="cards" size={30} color={tintColor} />
				},
			},
			AddDeck: {
				screen: AddDeck,
				navigationOptions: {
					tabBarLabel: 'Add Deck',
					tabBarIcon: ({ tintColor }) =>
						<FontAwesome name="plus-square" size={30} color={tintColor} />
				},
			}
		},
		{
			initialRouteName: 'Decks'
		}
	);

	const StackNavigator = createStackNavigator({
		Home: {
			screen: TabNavigator,
			navigationOptions: {
				header: null,
			}
		},
		Deck: {
			screen: Deck
		},
		AddCard: {
			screen: AddCard
		}
	});

	const AppContainer = createAppContainer(StackNavigator);

	return (
		<AppContainer />
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	input: {
		height: 40,
		width: 300,
		borderColor: 'gray',
		borderWidth: 1
	},
	separator: {
		height: 1,
		width: "100%",
		backgroundColor: "#CED0CE",
	}
});