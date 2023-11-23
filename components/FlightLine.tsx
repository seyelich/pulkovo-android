import { StyleSheet, View, Text } from 'react-native'

import type { TFlight } from '../types'
import { Colors, Fonts, deviceWidth } from '../utils/constants'

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
		height: deviceWidth >= 2782 ? 105 : 64,
		// justifyContent: deviceWidth >= 2782 ? 'space-between' : 'flex-start',
	},

	time: {
		paddingVertical: 19,
		paddingHorizontal: 7,
	},

	text: {
		fontSize: deviceWidth >= 2782 ? 48 : 26,
		lineHeight: deviceWidth >= 2782 ? 48 : 26,
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
		minWidth: 104,
		color: Colors.routeBlack,
		lineHeight: 38,
	},

	direction: {
		fontSize: 30,
		lineHeight: 30,
		minWidth: 320,
		marginLeft: deviceWidth >= 2782 ? 10 : 0,
	},

	company: {
		minWidth: 160,
		marginLeft: deviceWidth >= 2782 ? 50 : 0,
	},

	aircraftType: {
		minWidth: 100,
		justifyContent: 'center',
		marginLeft: deviceWidth >= 2782 ? 90 : 0,
	},

	statusText: {
		fontSize: deviceWidth >= 2782 ? 40 : 22,
		lineHeight: deviceWidth >= 2782 ? 40 : 22,
		fontFamily: Fonts.ptRootUi500,
	},

	status: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 8,
		marginLeft: deviceWidth >= 2782 ? 50 : 0,
	},

	statusRed: {
		backgroundColor: Colors.red,
	},

	statusGreen: {
		backgroundColor: Colors.green,
	},
})
