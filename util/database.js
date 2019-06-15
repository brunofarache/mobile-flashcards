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

const addCardToDeck = async (title, card) => {
	try {
		const decks = JSON.parse(await AsyncStorage.getItem(DECKS_KEY));
		const deck = decks[title];
		deck.questions.push(card);

		await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
		return getDecks();
	}
	catch (e) {
		console.error(e);
	}
}

const getDecks = async () => {
	try {
		const decks = await AsyncStorage.getItem(DECKS_KEY);
		let result;

		if (decks !== null) {
			result = Object.values(JSON.parse(decks));
		}
		else {
			await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(_DEFAULT_DECKS));
			result = Object.values(_DEFAULT_DECKS);
		}

		return result.sort((a, b) => (a.title === b.title) ? 0 : (a.title < b.title) ? -1 : 1);
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
		return getDecks();
	}
	catch (e) {
		console.error(e);
	}
}

export default {
	addCardToDeck,
	getDecks,
	saveDeckTitle
}