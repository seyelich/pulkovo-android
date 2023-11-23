import { StyleSheet, View, Text } from 'react-native'

import type { TFlight } from '../types'
import { Colors, Fonts } from '../utils/constants'

export const FlightLine = ({ flight }: { flight: TFlight }) => {
	const setStatusStyle = () => {
		if (flight.status.includes('Задерживается')) return styles.statusRed
		else if (flight.status.includes('Прибыл')) return styles.statusGreen
	}

	return (
		<View style={styles.row}>
			<Text style={[styles.text, styles.textBold, styles.time]}>
				{flight.time}
			</Text>
			<Text style={[styles.text, styles.textBold, styles.route]}>
				{flight.flightNumber}
			</Text>
			<Text style={[styles.direction, styles.text]}>{flight.direction}</Text>
			<Text style={[styles.company, styles.text]}>{flight.airline}</Text>
			<Text style={[styles.text, styles.textBold, styles.aircraftType]}>
				{flight.aircraftType}
			</Text>
			<View style={[styles.status, setStatusStyle()]}>
				<Text style={styles.statusText}>{flight.status}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		borderBottomColor: Colors.lightGrey,
		borderBottomWidth: 1,
		flexDirection: 'row',
		height: 64,
	},

	time: {
		paddingVertical: 19,
		paddingHorizontal: 7,
	},

	text: {
		fontSize: 26,
		lineHeight: 26,
		display: 'flex',
		alignItems: 'center',
		fontFamily: Fonts.ptRootUi500,
	},

	textBold: {
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
		fontFamily: Fonts.ptRootUi600,
	},

	route: {
		backgroundColor: Colors.blue,
		marginVertical: 13,
		marginHorizontal: 8,
		justifyContent: 'center',
		width: 104,
		color: Colors.routeBlack,
		lineHeight: 38,
	},

	direction: {
		fontSize: 30,
		lineHeight: 30,
		width: 320,
	},

	company: {
		width: 160,
	},

	aircraftType: {
		width: 100,
		justifyContent: 'center',
	},

	statusText: {
		fontSize: 22,
		lineHeight: 22,
		fontFamily: Fonts.ptRootUi500,
	},

	status: {
		width: 180,
		justifyContent: 'center',
		paddingHorizontal: 8,
	},

	statusRed: {
		backgroundColor: Colors.red,
	},

	statusGreen: {
		backgroundColor: Colors.green,
	},

	// @media screen and (minWidth: 2782px): {
	// 	row td {
	// 		height: 97px;
	// 	},
	// },
})
