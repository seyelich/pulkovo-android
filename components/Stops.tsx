import { LinearGradient } from 'expo-linear-gradient'
import {
	FlatList,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native'

import { StopTemplate } from './StopTemplate'
import useLeftContext from '../hooks/useLeftContext'
import { Colors, Fonts } from '../utils/constants'
import type { TContextStop } from '../utils/store'

export const Stops = () => {
	const { stops, currStop } = useLeftContext()
	const index = stops.length >= 4 ? 0 : stops.length
	const { width: deviceWidth } = useWindowDimensions()

	const renderItem = (item: TContextStop, i: number) => {
		if (
			(index === stops.length - 1 && !currStop) ||
			(stops.length === 1 && currStop)
		)
			return <Text style={styles.lastStop}>Конечная</Text>
		else {
			const condition = (currStop ? 1 : 0) <= i && i < 4
			if (condition)
				return (
					<StopTemplate
						key={i}
						stop={item}
						isFinal={i === stops.length - 1}
						isFirst={i === 0 && !currStop}
					/>
				)
			else return null
		}
	}

	const gap = deviceWidth >= 2782 ? 48 : 16

	return (
		<View>
			<FlatList
				style={[
					styles.stops,
					{
						paddingBottom: deviceWidth >= 2782 ? 32 : 18,
					},
				]}
				scrollEnabled={false}
				data={stops}
				renderItem={({ item, index }) => renderItem(item, index)}
				keyExtractor={(_, index) => index.toString()}
			/>
			{stops.length < 4 || !!currStop ? (
				<View
					style={[
						styles.line,
						{
							height:
								index * (deviceWidth >= 2782 ? 116 : 92) + (index - 2) * gap,
						},
					]}
				/>
			) : (
				<>
					<View style={styles.line} />
					<LinearGradient
						colors={['#d9d9d9', '#fff']}
						style={styles.gradientLine}
					/>
				</>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	stops: {
		margin: 0,
		paddingHorizontal: 17.5,
		paddingTop: 16,
		flexDirection: 'column',
		flex: 1,
	},

	lastStop: {
		fontSize: 24,
		fontFamily: Fonts.ptRootUi500,
		lineHeight: 24,
		paddingLeft: 14.5,
		backgroundColor: 'white',
		zIndex: 2,
	},

	gradientLine: {
		height: 82,
		position: 'absolute',
		width: 2,
		zIndex: -1,
		bottom: 0,
		left: 97,
	},

	line: {
		height: '100%',
		width: 2,
		backgroundColor: Colors.lightGrey,
		position: 'absolute',
		left: 97,
		top: 0,
		zIndex: -1,
	},
})
