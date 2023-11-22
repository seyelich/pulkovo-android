import { StyleSheet, View } from 'react-native'

import { Footer } from './Footer'
import { HeaderForRoute } from './HeaderForRoute'
import { HeaderForStop } from './HeaderForStop'
import { Routes } from './Routes'
import { Stops } from './Stops'
import useLeftContext from '../hooks/useLeftContext'

export const LeftBlock = () => {
	const { currStop } = useLeftContext()
	const transfers = currStop?.transfers
	const poi = currStop?.poi

	return (
		<View style={styles.leftBlock}>
			{currStop ? <HeaderForStop /> : <HeaderForRoute />}
			{currStop && (transfers || poi)?.length !== 0 ? <Routes /> : <Stops />}
			<Footer />
		</View>
	)
}

const styles = StyleSheet.create({
	leftBlock: {
		position: 'relative',
		flex: 1,
		overflow: 'hidden',
	},
})
