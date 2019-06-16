import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

import database from '../util/database';
import styles from '../util/styles';

export default function Quiz() {
	const deck = useNavigationParam('deck');
	const { goBack } = useNavigation();
	
	const initialState = {
		score: 0,
		currentQuestion: 1,
		showAnswer: false
	};

	const [quizState, setQuizState] = useState(initialState);

	const toggleAnswer = () => {
		setQuizState((prevState) => {
			return {
				...prevState,
				showAnswer: !prevState.showAnswer
			}
		});
	};

	const nextQuestion = (score) => {
		setQuizState((prevState) => {
			return {
				score: prevState.score + score,
				currentQuestion: prevState.currentQuestion + 1,
				showAnswer: false
			}
		});
	};

	const { currentQuestion, score, showAnswer } = quizState;

	if (currentQuestion > deck.questions.length) {
		database.clearReminder();

		return (
			<View style={styles.container}>
				<Text>Score: {score} correct answers</Text>
				<Button
					title="Restart Quiz"
					onPress={() => setQuizState(initialState)}
				/>
				<Button
					title="Back to Deck"
					onPress={() => goBack(null)}
				/>
			</View>	
		);
	}

	const question = deck.questions[quizState.currentQuestion - 1];

	return (
		<View style={styles.container}>
			<Text>{currentQuestion} of {deck.questions.length}</Text>
			<Text>{showAnswer ? question.answer : question.question}</Text>
			<Button
				title={showAnswer ? 'Question' : 'Answer'}
				onPress={toggleAnswer}
			/>
			<Button
				title="Correct"
				onPress={() => nextQuestion(1)}
			/>
			<Button
				title="Incorrect"
				onPress={() => nextQuestion(0)}
			/>
		</View>
	);
}