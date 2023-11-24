import { useState, useEffect } from 'react'
import {
	StyleSheet,
	View,
	Text,
	useWindowDimensions,
	FlatList,
} from 'react-native'

import { FlightLine } from './FlightLine'
import { ArrivalDepartureIcon } from './icons/ArrivalDepartureIcon'
import useRightContext from '../hooks/useRightContext'
import type { TFlight } from '../types'
import { Colors, Fonts } from '../utils/constants'

export const FlightTable = () => {
	const { contents, subtype, duration } = useRightContext().pulkovo
	const [chunkNumber, setChunkNumber] = useState(0)
	const { width: deviceWidth } = useWindowDimensions()

	const flightLength = contents?.length
	const chunkSize = 7
	const arr =
		flightLength && flightLength > chunkSize
			? sliceIntoChunks(contents, chunkSize)
			: [contents]
	const tableShowDuration = arr && duration / arr.length
	const currTable = arr[chunkNumber]

	function sliceIntoChunks(arr: TFlight[], chunkSize: number) {
		const res = []
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize)
			res.push(chunk)
		}
		return res
	}

	useEffect(() => {
		const timer = setTimeout(
			() => setChunkNumber((num) => num + 1),
			tableShowDuration && tableShowDuration * 1000,
		)
		return () => clearTimeout(timer)
	}, [tableShowDuration])

	const headerTextStyles = {
		fontSize: deviceWidth >= 2782 ? 32 : 20,
		lineHeight: deviceWidth >= 2782 ? 32 : 20,
	}

	return (
		<View style={styles.content}>
			<View style={styles.titleContainer}>
				<ArrivalDepartureIcon />
				<Text
					style={[styles.title, { fontSize: deviceWidth >= 2782 ? 52 : 26 }]}
				>
					{subtype === 'ARRIVAL' ? 'Прилёты' : 'Вылеты'}
				</Text>
			</View>
			<View>
				<View
					style={[
						styles.header,
						{
							justifyContent:
								deviceWidth >= 2782 ? 'space-around' : 'flex-start',
						},
					]}
				>
					<Text style={[styles.time, styles.headerText, headerTextStyles]}>
						Время
					</Text>
					<Text style={[styles.route, styles.headerText, headerTextStyles]}>
						Рейс
					</Text>
					<Text style={[styles.direction, styles.headerText, headerTextStyles]}>
						Направление
					</Text>
					<Text style={[styles.company, styles.headerText, headerTextStyles]}>
						Авиакомпания
					</Text>
					<Text
						style={[
							styles.plane,
							styles.headerText,
							headerTextStyles,
							{
								width: deviceWidth >= 2782 ? 150 : 100,
							},
						]}
					>
						Тип самолета
					</Text>
					<Text style={[styles.status, styles.headerText, headerTextStyles]}>
						Статус
					</Text>
				</View>
				{currTable && (
					<FlatList
						data={currTable}
						renderItem={({ item }) => <FlightLine flight={item} />}
						keyExtractor={(_, index) => index.toString()}
					/>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	content: {
		flexDirection: 'column',
		borderLeftColor: Colors.darkGrey,
		borderLeftWidth: 2,
		alignSelf: 'flex-start',
		flex: 1,
		width: '100%',
	},

	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingLeft: 13,
	},

	title: {
		fontFamily: Fonts.ptRootUi600,
		lineHeight: 26,
		color: Colors.darkGrey,
	},

	header: {
		borderBottomColor: Colors.darkGrey,
		borderBottomWidth: 2,
		flexDirection: 'row',
		paddingBottom: 14,
	},

	headerText: {
		color: Colors.darkGrey,
		fontFamily: Fonts.ptRootUi500,
		alignSelf: 'flex-end',
	},

	time: {
		minWidth: 80,
		textAlign: 'center',
	},

	route: {
		minWidth: 120,
		textAlign: 'center',
	},

	direction: {
		minWidth: 320,
	},

	company: {
		minWidth: 160,
		// marginLeft: deviceWidth >= 2782 ? -100 : 0,
	},

	plane: {
		textAlign: 'center',
		// marginLeft: deviceWidth >= 2782 ? -25 : 0,
	},

	status: {
		minWidth: 180,
		marginLeft: 8,
	},
})
