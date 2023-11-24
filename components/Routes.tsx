import { ICONS_URL } from '@env'
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	Image,
	useWindowDimensions,
} from 'react-native'

import useLeftContext from '../hooks/useLeftContext'
import type { TTransfer } from '../types'
import { Fonts } from '../utils/constants'

export const Routes = () => {
	const { currStop, stops } = useLeftContext()
	const isLast = currStop?.index === stops.length - 1
	const { width: deviceWidth } = useWindowDimensions()

	// @TODO: add running line

	const stationTextStyles = {
		lineHeight: deviceWidth >= 2782 ? 60 : 32,
		fontSize: deviceWidth >= 2782 ? 60 : 32,
	}

	const stationEngTextStyles = {
		fontSize: deviceWidth >= 2782 ? 30 : 16,
		lineHeight: deviceWidth >= 2782 ? 30 : 16,
	}

	const renderIcons = (icon: string, index: number) =>
		index === 0 ? (
			<Image
				style={styles.icon}
				source={{ uri: ICONS_URL + icon }}
				alt="Тип ТС"
			/>
		) : (
			<View key={index}>
				<Image
					style={styles.icon}
					source={{ uri: ICONS_URL + icon }}
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
				keyExtractor={(_, index) => index.toString()}
			/>
			{el.nameRus && (
				<View>
					<Text style={[styles.station, stationTextStyles]}>{el.nameRus}</Text>
					<Text style={[styles.stationEng, stationEngTextStyles]}>
						{el.nameEng}
					</Text>
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
				keyExtractor={(_, index) => index.toString()}
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
		fontFamily: Fonts.ptRootUi500,
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
		fontFamily: Fonts.ptRootUi600,
	},

	stationEng: {
		fontFamily: Fonts.ptRootUi500,
	},

	icon: {
		height: 50,
	},
})
