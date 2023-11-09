import { StyleSheet, Text, View } from 'react-native';
import useLeftContext from '../hooks/useLeftContext';

export const Footer = () => {
	const { speed, temperature } = useLeftContext();

	const getTime = () => {
		const date = new Date();

		const writeCorrect = (str: number) => {
			return str <= 9 ? `0${str}` : str;
		};

		const hours = writeCorrect(date.getHours());
		const minutes = writeCorrect(date.getMinutes());
		const day = writeCorrect(date.getDate());
		const month = writeCorrect(date.getMonth());
		const year = date.getFullYear();

		return {
			time: `${hours}:${minutes}`,
			date: `${day}.${month}.${year}`,
		};
	};

	return (
		<View style={styles.footer}>
			<Text>{getTime().time}</Text>
			<Text>{getTime().date}</Text>
			{temperature !== 0 && <Text>{temperature}°C</Text>}
			{/* не показывается, т.к. пакет TEMPERATURE не приходит с бэка*/}
			{speed !== 0 && <Text>{speed} км/ч</Text>}
		</View>
	);
};


const styles = StyleSheet.create({
	footer: {
		width: 347,
		position: 'absolute',
		flexDirection: 'row',
		bottom: 8,
		right: 24,
		justifyContent: 'space-evenly',
		boxSizing: 'border-box',
		paddingVertical: 4,
		paddingHorizontal: 24,
		borderRadiusTop: 2,
		borderRadiusRight: 2,
		border: '1 solid rgba(209, 209, 209, 1)',
		gap: 20,
		color: 'rgba(62, 58, 107, 1)',
		fontSize: 18,
		lineHeight: 18,
		fontWeight: 500,
		backgroundColor: 'rgba(252, 249, 249, 1)',
	},
})