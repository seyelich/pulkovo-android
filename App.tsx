import { ICONS_URL } from '@env'
import { useFonts } from 'expo-font'
import { useEffect, useState, useMemo } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import test from './assets/test.jpg'
import kartinka from './assets/картинка.jpg'
import { LeftBlock } from './components/LeftBlock'
import { RightBlock } from './components/RightBlock'
import { pulkovoMock } from './mock/pulkovo'
import { route as mockRoute } from './mock/route'
import { stops as mockStops } from './mock/stops'
import type {
	TFullStop,
	TMedia,
	TPulkovo,
	TRoute,
	TSpeed,
	TStopStart,
	TStopTimes,
	TTemp,
	TWsMessage,
} from './types'
import { deviceWidth, socketUrl } from './utils/constants'
import {
	LeftContext,
	RightContext,
	RouteInitState,
	MediaInitState,
	PulkovoInitState,
} from './utils/store'
import type { TContextStop, TContextMedia, TContextRoute } from './utils/store'

console.log(ICONS_URL)

const App = () => {
	const [allStops, setAllStops] = useState<TFullStop[]>([])

	const [route, setRoute] = useState<TContextRoute>(RouteInitState)
	const [appStops, setAppStops] = useState<TContextStop[]>([])
	const [currStop, setCurrStop] = useState<TFullStop | undefined>()
	const [appSpeed, setAppSpeed] = useState<number>(0)
	const [appTemperature, setAppTemperature] = useState<number>(0)

	const [media, setMedia] = useState<TContextMedia>(MediaInitState)
	const [pulkovo, setPulkovo] = useState<TPulkovo>(PulkovoInitState)
	const [type, setType] = useState<'media' | 'pulkovo'>('media')

	const [isLoading, setIsLoading] = useState(false)

	useFonts({
		'pt-root-ui': require('./assets/fonts/PT-Root-UI/pt-root-ui_regular.ttf'),
		'pt-root-ui-medium': require('./assets/fonts/PT-Root-UI/pt-root-ui_medium.ttf'),
		'pt-root-ui-bold': require('./assets/fonts/PT-Root-UI/pt-root-ui_bold.ttf'),
	})

	const { lastJsonMessage, readyState, sendJsonMessage } =
		useWebSocket<TWsMessage>(socketUrl, {
			onError: (err) => {
				setIsLoading(false)
				console.log(err)
			},
			onClose: () => {
				console.log('Connection closed')
				setIsLoading(false)
			},
			onOpen: () => {
				console.log('Connection opened')
				setIsLoading(false)
			},
			shouldReconnect: () => true,
			reconnectAttempts: 10,
			reconnectInterval: 3000,
		})

	const leftContext = useMemo(
		() => ({
			route,
			stops: appStops,
			currStop,
			speed: appSpeed,
			temperature: appTemperature,
		}),
		[route, appStops, currStop, appSpeed, appTemperature],
	)

	const rightContext = useMemo(
		() => ({
			media,
			pulkovo,
			type,
		}),
		[media, pulkovo, type],
	)

	// use when server is not working

	useEffect(() => {
		setRoute({
			icon: ICONS_URL + mockRoute.icon,
			color: mockRoute.color,
			fontColor: mockRoute.fontColor,
			name: mockRoute.name,
		})
		setAllStops(mockStops)

		const stops = mockStops.slice(0, 4).map((el) => ({
			...el,
			time: 1,
		}))

		setAppStops(stops)
		// setCurrStop(stops[0])

		setType('pulkovo')
		setMedia({
			src: kartinka,
			label: '',
			length: 10,
			type: 'img',
		})
		setPulkovo(pulkovoMock)
	}, [])

	// useEffect(() => {
	// 	if (readyState === ReadyState.CONNECTING) setIsLoading(true)
	// 	if (!lastJsonMessage || !ICONS_URL) return
	// 	const { icon, color, fontColor, stops } = lastJsonMessage as TRoute
	// 	const { index } = lastJsonMessage as TStopStart
	// 	const { speed } = lastJsonMessage as TSpeed
	// 	const { temperature } = lastJsonMessage as TTemp
	// 	const { src, label, length, header, text, url, format } =
	// 		lastJsonMessage as TMedia
	// 	switch (lastJsonMessage.type) {
	// 		case 'ROUTE':
	// 			setAllStops(stops)
	// 			setRoute({
	// 				icon: ICONS_URL + icon,
	// 				color,
	// 				fontColor,
	// 				name:
	// 					stops.length !== 0
	// 						? stops[0].nameRus + ' - ' + stops[stops.length - 1].nameRus
	// 						: '',
	// 			})
	// 			break
	// 		case 'SPEED':
	// 			setAppSpeed(speed)
	// 			break
	// 		case 'TEMPERATURE':
	// 			setAppTemperature(temperature)
	// 			break
	// 		case 'STOP_BEGIN':
	// 			setCurrStop(appStops?.find((el) => el.index === index))
	// 			break
	// 		case 'STOP_END':
	// 			setCurrStop(undefined)
	// 			break
	// 		case 'STOP_TIMES':
	// 			{
	// 				const stops = []

	// 				for (const el of (lastJsonMessage as TStopTimes).stops) {
	// 					const stop = allStops.find((_, i) => i === el.index)
	// 					if (stop === undefined) return
	// 					else
	// 						stops.push({
	// 							time: el.time,
	// 							...stop,
	// 						})
	// 				}

	// 				setAppStops(stops)
	// 			}
	// 			break
	// 		case 'PLAY_IMAGE':
	// 			setType('media')
	// 			setMedia({
	// 				src: ICONS_URL + src,
	// 				label,
	// 				length,
	// 				type: 'img',
	// 			})
	// 			break
	// 		case 'PLAY_VIDEO':
	// 			setType('media')
	// 			setMedia({
	// 				src: ICONS_URL + src,
	// 				label,
	// 				length,
	// 				type: 'video',
	// 			})
	// 			break
	// 		case 'PLAY_EMERGENCY':
	// 			setType('media')
	// 			setMedia({
	// 				header,
	// 				text,
	// 				label,
	// 				length,
	// 				type: 'emergency',
	// 			})
	// 			break
	// 		case 'PLAY_STREAM':
	// 			setType('media')
	// 			setMedia({
	// 				format,
	// 				url,
	// 				label,
	// 				length,
	// 				type: 'stream',
	// 			})
	// 			break
	// 		case 'PLAY_TICKER':
	// 			setType('media')
	// 			setMedia({
	// 				text,
	// 				label,
	// 				type: 'ticker',
	// 			})
	// 			break
	// 		case 'PULKOVO':
	// 			{
	// 				const { subtype, duration, color, contents, src } =
	// 					lastJsonMessage as TPulkovo
	// 				setType('pulkovo')
	// 				setPulkovo({
	// 					subtype,
	// 					duration,
	// 					color,
	// 					contents,
	// 					src: ICONS_URL + src,
	// 				})
	// 			}
	// 			break
	// 	}
	// }, [lastJsonMessage])

	return (
		<View style={[styles.app, isLoading && styles.appOnLoading]}>
			{isLoading ? (
				<ActivityIndicator size="large" />
			) : (
				<>
					<LeftContext.Provider value={leftContext}>
						<LeftBlock />
					</LeftContext.Provider>
					<RightContext.Provider value={rightContext}>
						<RightBlock sendMessage={sendJsonMessage} />
					</RightContext.Provider>
				</>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	app: {
		width: '100%',
		height: deviceWidth > 1920 ? 768 : 540, //delete when prod
		minWidth: 1920,
		marginVertical: 0,
		marginHorizontal: 'auto',
		flexDirection: 'row',
		overflow: 'hidden',
	},

	appOnLoading: {
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default App
