import { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { FlightLine } from './FlightLine'
import { ArrivalDepartureIcon } from './icons/ArrivalDepartureIcon'
import useRightContext from '../hooks/useRightContext'
import type { TFlight } from '../types'

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
		borderLeftColor: 'rgba(51, 71, 67, 1)',
		borderLeftWidth: 2,
		alignSelf: 'flex-start',
		flex: 1,
	},

	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingLeft: 13,
	},

	title: {
		fontSize: 26,
		fontWeight: '700',
		lineHeight: 26,
		color: 'rgba(51, 71, 67, 1)',
	},

	text: {
		color: 'rgba(0, 25, 20, 1)',
	},

	header: {
		borderBottomColor: 'rgba(51, 71, 67, 1)',
		borderBottomWidth: 2,
		flexDirection: 'row',
		paddingBottom: 14,
	},

	headerText: {
		fontSize: 20,
		lineHeight: 20,
		color: 'rgba(51, 71, 67, 1)',
		fontWeight: '500',
		alignSelf: 'flex-end',
	},

	time: {
		width: 80,
		textAlign: 'center',
	},

	route: {
		width: 120,
		textAlign: 'center',
	},

	direction: {
		width: 320,
	},

	company: {
		width: 160,
	},

	plane: {
		width: 100,
		textAlign: 'center',
	},

	status: {
		width: 180,
		marginLeft: 8,
	},

	// @media screen and (maxWidth: 1920): {
	// 	table {
	// 		margin-top: -18,
	// 	},
	// },
})
