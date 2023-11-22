import { StyleSheet, View, Text, FlatList, Image } from 'react-native'

import useLeftContext from '../hooks/useLeftContext'
import type { TTransfer } from '../types'

const { REACT_APP_ICONS_URL } = process.env

export const Routes = () => {
	const { currStop, stops } = useLeftContext()
	const isLast = currStop?.index === stops.length - 1

	// @TODO: add running line

	const renderIcons = (icon: string, index: number) =>
		index === 0 ? (
			<Image
				style={styles.icon}
				source={{ uri: REACT_APP_ICONS_URL + icon }}
				alt="Тип ТС"
			/>
		) : (
			<View key={index}>
				<Image
					style={styles.icon}
					source={{ uri: REACT_APP_ICONS_URL + icon }}
					alt="Номер маршрута"
				/>
			</View>
		)

	const renderRow = (el: TTransfer) => (
		<View style={styles.row}>
			<FlatList
				style={[styles.list, el.nameRus ? styles.listMetro : undefined]}
				data={el.icons}
				renderItem={({ item, index }) => renderIcons(item, index)}
			/>
			{el.nameRus && (
				<View>
					<Text style={styles.station}>{el.nameRus}</Text>
					<Text style={styles.stationEng}>{el.nameEng}</Text>
				</View>
			)}
		</View>
	)

	return (
		<View style={styles.container}>
			{isLast && <Text style={styles.finalStop}>Конечная</Text>}
			<FlatList
				data={currStop?.transfers}
				style={styles.iconsContainer}
				scrollEnabled={false}
				renderItem={({ item }) => renderRow(item)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
		paddingHorizontal: 32,
		flex: 1,
	},

	finalStop: {
		fontSize: 24,
		fontWeight: '500',
		lineHeight: 24,
		marginBottom: 24,
	},

	iconsContainer: {
		gap: 16,
	},

	row: {
		gap: 16,
		flexDirection: 'row',
	},

	list: {
		columnGap: 16,
		rowGap: 8,
		flexWrap: 'wrap',
		maxHeight: 108,
		flexDirection: 'row',
	},

	listMetro: {
		columnGap: 8,
	},

	station: {
		fontSize: 32,
		fontWeight: '700',
		lineHeight: 32,
	},

	stationEng: {
		fontSize: 16,
		fontWeight: '500',
		lineHeight: 16,
	},

	icon: {
		height: 50,
	},
})
