import { StyleSheet, View, Text } from 'react-native'

import type { TFlight } from '../types'

export const FlightLine = ({ flight }: { flight: TFlight }) => {
	const setStatusStyle = () => {
		if (flight.status.includes('Задерживается')) return styles.statusRed
		else if (flight.status.includes('Прибыл')) return styles.statusGreen
	}

	return (
		<View style={styles.row}>
			<Text style={[styles.textBold, styles.text, styles.time]}>
				{flight.time}
			</Text>
			<Text style={[styles.textBold, styles.route, styles.text]}>
				{flight.flightNumber}
			</Text>
			<Text style={[styles.direction, styles.text]}>{flight.direction}</Text>
			<Text style={[styles.company, styles.text]}>{flight.airline}</Text>
			<Text style={[styles.textBold, styles.text, styles.aircraftType]}>
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
		borderBottomColor: 'rgba(217, 217, 217, 1)',
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
	},

	textBold: {
		fontWeight: '700',
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
	},

	route: {
		backgroundColor: 'rgba(182, 229, 255, 1)',
		marginVertical: 13,
		marginHorizontal: 8,
		justifyContent: 'center',
		width: 104,
		color: 'rgba(0, 0, 0, 1)',
		lineHeight: 38,
	},

	direction: {
		fontSize: 30,
		fontWeight: '500',
		lineHeight: 30,
		width: 320,
	},

	company: {
		fontWeight: '500',
		width: 160,
	},

	aircraftType: {
		width: 100,
		justifyContent: 'center',
	},

	statusText: {
		fontSize: 22,
		fontWeight: '500',
		lineHeight: 22,
	},

	status: {
		width: 180,
		justifyContent: 'center',
		paddingHorizontal: 8,
	},

	statusRed: {
		backgroundColor: '#ffcbcb',
	},

	statusGreen: {
		backgroundColor: '#c9ffd5',
	},

	// @media screen and (minWidth: 2782px): {
	// 	row td {
	// 		height: 97px;
	// 	},
	// },
})
