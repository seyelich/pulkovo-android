import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'

import { CircleImage } from './icons/CircleImage'
import useLeftContext from '../hooks/useLeftContext'
import { Colors, Fonts } from '../utils/constants'
import type { TContextStop } from '../utils/store'

type TStopTemplate = {
	stop: TContextStop
	isFinal: boolean
	isFirst: boolean
}

export const StopTemplate = ({ stop, isFinal, isFirst }: TStopTemplate) => {
	const { route } = useLeftContext()
	const { width: deviceWidth } = useWindowDimensions()

	const gap = deviceWidth >= 2782 ? 48 : 16
	const nameTextStyles = {
		fontSize: deviceWidth >= 2782 ? 48 : 32,
		lineHeight: deviceWidth >= 2782 ? 48 : 32,
	}

	const nameEngTextStyles = {
		lineHeight: deviceWidth >= 2782 ? 32 : 24,
		fontSize: deviceWidth >= 2782 ? 32 : 24,
	}

	return (
		<View
			style={[
				styles.stop,
				isFinal && { marginBottom: 0 },
				{ marginBottom: gap },
			]}
		>
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
				<Text
					style={[
						styles.name,
						isFirst && { color: route.fontColor },
						nameTextStyles,
					]}
				>
					{stop.nameRus}
				</Text>
				<Text
					style={[
						styles.nameEng,
						isFirst && { color: route.fontColor },
						nameEngTextStyles,
					]}
				>
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
		width: '69%',
	},

	timeText: {
		textAlign: 'center',
		color: Colors.darkGreyTime,
		fontSize: 40,
		fontFamily: Fonts.ptRootUi500,
		lineHeight: 32,
	},

	minute: {
		fontSize: 24,
		fontFamily: Fonts.ptRootUi,
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
		padding: 16,
	},

	name: {
		fontFamily: Fonts.ptRootUi500,
	},

	nameEng: {
		fontFamily: Fonts.ptRootUi500,
		marginTop: 4,
	},

	lastStop: {
		fontSize: 18,
		fontFamily: Fonts.ptRootUi500,
		lineHeight: 18,
		marginTop: 16,
	},
})
