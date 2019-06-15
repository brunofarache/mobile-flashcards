import { AsyncStorage } from 'react-native'

const DECKS_KEY = 'decks';

const _DEFAULT_DECKS = {
	React: {
		title: 'React',
		questions: [
			{
				question: 'What is React?',
				answer: 'A library for managing user interfaces'
			},
			{
				question: 'Where do you make Ajax requests in React?',
				answer: 'The componentDidMount lifecycle event'
			}
		]
	},
	JavaScript: {
		title: 'JavaScript',
		questions: [
			{
				question: 'What is a closure?',
				answer: 'The combination of a function and the lexical environment within which that function was declared.'
			}
		]
	}
}

const getDecks = async () => {
	try {
		const decks = await AsyncStorage.getItem(DECKS_KEY);
		
		if (decks !== null) {
			return Object.values(JSON.parse(decks));
		}

		await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(_DEFAULT_DECKS));

		return Object.values(_DEFAULT_DECKS);
	}
	catch (e) {
		console.error(e);
	}
}

const saveDeckTitle = async (title) => {
	const deck = {
		[title]: {
			title,
			questions: []
		}
	}

	try {
		await AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(deck));
	}
	catch (e) {
		console.error(e);
	}
}

export default {
	getDecks,
	saveDeckTitle
}