import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'

import useLeftContext from '../hooks/useLeftContext'
import { Colors, Fonts } from '../utils/constants'

export const Footer = () => {
	const { speed, temperature } = useLeftContext()
	const { width: deviceWidth } = useWindowDimensions()

	const getTime = () => {
		const date = new Date()

		const writeCorrect = (str: number) => (str <= 9 ? `0${str}` : str)

		const hours = writeCorrect(date.getHours())
		const minutes = writeCorrect(date.getMinutes())
		const day = writeCorrect(date.getDate())
		const month = writeCorrect(date.getMonth())
		const year = date.getFullYear()

		return {
			time: `${hours}:${minutes}`,
			date: `${day}.${month}.${year}`,
		}
	}

	const textStyles = {
		fontSize: deviceWidth >= 2782 ? 32 : 18,
		lineHeight: deviceWidth >= 2782 ? 32 : 18,
	}

	return (
		<View style={styles.footer}>
			<Text style={[styles.text, textStyles]}>{getTime().time}</Text>
			<Text style={[styles.text, textStyles]}>{getTime().date}</Text>
			{temperature !== 0 && (
				<Text style={[styles.text, textStyles]}>{temperature}°C</Text>
			)}
			{/* не показывается, т.к. пакет TEMPERATURE не приходит с бэка*/}
			{speed !== 0 && (
				<Text style={[styles.text, textStyles]}>{speed} км/ч</Text>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	footer: {
		width: '37.5%',
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
		border: `1px solid ${Colors.lightGreyBorder}`,
		gap: 20,
		backgroundColor: Colors.lightGreyBg,
	},
	text: {
		color: Colors.purple,
		fontFamily: Fonts.ptRootUi500,
	},
})
