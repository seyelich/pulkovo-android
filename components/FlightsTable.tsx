import { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { FlightLine } from './FlightLine'
import { ArrivalDepartureIcon } from './icons/ArrivalDepartureIcon'
import useRightContext from '../hooks/useRightContext'
import type { TFlight } from '../types'
import { Colors, Fonts, deviceWidth } from '../utils/constants'

export const FlightTable = () => {
	const { contents, subtype, duration } = useRightContext().pulkovo
	const [chunkNumber, setChunkNumber] = useState(0)

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

	return (
		<View style={styles.content}>
			<View style={styles.titleContainer}>
				<ArrivalDepartureIcon />
				<Text style={styles.title}>
					{subtype === 'ARRIVAL' ? 'Прилёты' : 'Вылеты'}
				</Text>
			</View>
			<View>
				<View style={styles.header}>
					<Text style={[styles.time, styles.headerText]}>Время</Text>
					<Text style={[styles.route, styles.headerText]}>Рейс</Text>
					<Text style={[styles.direction, styles.headerText]}>Направление</Text>
					<Text style={[styles.company, styles.headerText]}>Авиакомпания</Text>
					<Text style={[styles.plane, styles.headerText]}>Тип самолета</Text>
					<Text style={[styles.status, styles.headerText]}>Статус</Text>
				</View>
				{currTable &&
					currTable.map((el, i) => <FlightLine flight={el} key={i} />)}
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
		fontSize: deviceWidth >= 2782 ? 52 : 26,
		fontFamily: Fonts.ptRootUi600,
		lineHeight: 26,
		color: Colors.darkGrey,
	},

	header: {
		borderBottomColor: Colors.darkGrey,
		borderBottomWidth: 2,
		flexDirection: 'row',
		paddingBottom: 14,
		justifyContent: deviceWidth >= 2782 ? 'space-around' : 'flex-start',
	},

	headerText: {
		fontSize: deviceWidth >= 2782 ? 32 : 20,
		lineHeight: deviceWidth >= 2782 ? 32 : 20,
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
		marginLeft: deviceWidth >= 2782 ? -100 : 0,
	},

	plane: {
		width: deviceWidth >= 2782 ? 150 : 100,
		textAlign: 'center',
		marginLeft: deviceWidth >= 2782 ? -25 : 0,
	},

	status: {
		minWidth: 180,
		marginLeft: 8,
	},
})
