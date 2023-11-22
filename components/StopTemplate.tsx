import { StyleSheet, Text, View } from 'react-native'

import { CircleImage } from './icons/CircleImage'
import useLeftContext from '../hooks/useLeftContext'
import type { TContextStop } from '../utils/store'

type TStopTemplate = {
	stop: TContextStop
	isFinal: boolean
	isFirst: boolean
}

export const StopTemplate = ({ stop, isFinal, isFirst }: TStopTemplate) => {
	const { route } = useLeftContext()

	return (
		<View style={styles.stop}>
			<View>
				<Text style={styles.timeText}>{stop.time}</Text>
				<Text style={[styles.timeText, styles.minute]}>мин</Text>
			</View>
			<View style={styles.circle}>
				<CircleImage />
			</View>
			<View
				style={[
					styles.nameContainer,
					isFirst ? { backgroundColor: route.color } : undefined,
				]}
			>
				<Text style={[styles.name, isFirst && { color: route.fontColor }]}>
					{stop.nameRus}
				</Text>
				<Text style={[styles.nameEng, isFirst && { color: route.fontColor }]}>
					{stop.nameEng}
				</Text>
				{isFinal && <Text style={styles.lastStop}>Конечная</Text>}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	stop: {
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 16,
	},

	timeText: {
		textAlign: 'center',
		color: 'rgba(64, 57, 57, 1)',
		fontSize: 40,
		fontWeight: '500',
		lineHeight: 32,
	},

	minute: {
		fontSize: 24,
		fontWeight: '400',
		lineHeight: 18,
	},

	circle: {
		marginRight: 24,
		marginLeft: 22.5,
		height: '100%',
		alignItems: 'center',
		flexDirection: 'row',
	},

	nameContainer: {
		width: '100%',
		height: '100%',
		boxSizing: 'border-box',
		padding: 16,
	},

	name: {
		fontSize: 32,
		fontWeight: '500',
		lineHeight: 32,
	},

	nameEng: {
		fontSize: 24,
		fontWeight: '500',
		lineHeight: 24,
		marginTop: 4,
	},

	lastStop: {
		fontSize: 18,
		fontWeight: '500',
		lineHeight: 18,
		marginTop: 16,
	},

	// @media screen and (minWidth: 2782): {
	// 	.name: {
	// 		fontSize: 48;
	// 		lineHeight: 48;
	// 	}

	// 	.nameEng: {
	// 		fontSize: 32;
	// 		lineHeight: 32;
	// 	}
	// }
})
