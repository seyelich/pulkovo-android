import { useEffect, useState, useMemo } from 'react';
import { LeftBlock } from './components/LeftBlock';
import { StatusBar, StyleSheet, View } from 'react-native';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {
	TFullStop,
	TMedia,
	TPulkovo,
	TRoute,
	TSpeed,
	TStopStart,
	TStopTimes,
	TTemp,
	TWsMessage,
} from './types';
import {
	LeftContext,
	RightContext,
	TContextStop,
	TContextMedia,
	TContextRoute,
	RouteInitState,
	MediaInitState,
	PulkovoInitState,
} from './utils/store';
import { RightBlock } from './components/RightBlock';
import { socketUrl } from './utils/constants';

const { REACT_APP_ICONS_URL } = process.env;

const App = () => {
	const [allStops, setAllStops] = useState<TFullStop[]>([]);

	const [route, setRoute] = useState<TContextRoute>(RouteInitState);
	const [appStops, setAppStops] = useState<TContextStop[]>([]);
	const [currStop, setCurrStop] = useState<TFullStop | undefined>();
	const [appSpeed, setAppSpeed] = useState<number>(0);
	const [appTemperature, setAppTemperature] = useState<number>(0);

	const [media, setMedia] = useState<TContextMedia>(MediaInitState);
	const [pulkovo, setPulkovo] = useState<TPulkovo>(PulkovoInitState);
	const [type, setType] = useState<'media' | 'pulkovo'>('media');

	const [isLoading, setIsLoading] = useState(true);

	const { lastJsonMessage, readyState, sendJsonMessage } =
		useWebSocket<TWsMessage>(socketUrl, {
			onError: () => {
				setIsLoading(false);
			},
			onClose: () => {
				console.log('Connection closed');
				setIsLoading(false);
			},
			onOpen: () => {
				console.log('Connection opened');
				setIsLoading(false);
			},
			shouldReconnect: () => true,
			reconnectAttempts: 10,
			reconnectInterval: 3000,
		});

	const leftContext = useMemo(
		() => ({
			route,
			stops: appStops,
			currStop,
			speed: appSpeed,
			temperature: appTemperature,
		}),
		[route, appStops, currStop, appSpeed, appTemperature]
	);

	const rightContext = useMemo(
		() => ({
			media,
			pulkovo,
			type,
		}),
		[media, pulkovo, type]
	);

	useEffect(() => {
		if (readyState === ReadyState.CONNECTING) setIsLoading(true);
		if (!lastJsonMessage || !REACT_APP_ICONS_URL) return;
		const { icon, color, fontColor, stops } = lastJsonMessage as TRoute;
		const { index } = lastJsonMessage as TStopStart;
		const { speed } = lastJsonMessage as TSpeed;
		const { temperature } = lastJsonMessage as TTemp;
		const { src, label, length, header, text, url, format } =
			lastJsonMessage as TMedia;
		
		switch (lastJsonMessage.type) {
			case 'ROUTE':
				setAllStops(stops);
				setRoute({
					icon: REACT_APP_ICONS_URL + icon,
					color,
					fontColor,
					name:
						stops.length !== 0
							? stops[0].nameRus + ' - ' + stops[stops.length - 1].nameRus
							: '',
				});
				break;
			case 'SPEED':
				setAppSpeed(speed);
				break;
			case 'TEMPERATURE':
				setAppTemperature(temperature);
				break;
			case 'STOP_BEGIN':
				setCurrStop(appStops?.find((el) => el.index === index));
				break;
			case 'STOP_END':
				setCurrStop(undefined);
				break;
			case 'STOP_TIMES':
				{
					const stops = [];

					for (const el of (lastJsonMessage as TStopTimes).stops) {
						const stop = allStops.find((_, i) => i === el.index);
						if (stop === undefined) return;
						else
							stops.push({
								time: el.time,
								...stop,
							});
					}

					setAppStops(stops);
				}
				break;
			case 'PLAY_IMAGE':
				setType('media');
				setMedia({
					src: REACT_APP_ICONS_URL + src,
					label,
					length,
					type: 'img',
				});
				break;
			case 'PLAY_VIDEO':
				setType('media');
				setMedia({
					src: REACT_APP_ICONS_URL + src,
					label,
					length,
					type: 'video',
				});
				break;
			case 'PLAY_EMERGENCY':
				setType('media');
				setMedia({
					header: header,
					text,
					label,
					length,
					type: 'emergency',
				});
				break;
			case 'PLAY_STREAM':
				setType('media');
				setMedia({
					format,
					url,
					label,
					length,
					type: 'stream',
				});
				break;
			case 'PLAY_TICKER':
				setType('media');
				setMedia({
					text,
					label,
					type: 'ticker',
				});
				break;
			case 'PULKOVO':
				{
					const { subtype, duration, color, contents, src } =
						lastJsonMessage as TPulkovo;
					setType('pulkovo');
					setPulkovo({
						subtype,
						duration,
						color,
						contents,
						src: REACT_APP_ICONS_URL + src,
					});
				}
				break;
		}
	}, [lastJsonMessage]);
	console.log(isLoading)
	// {`${styles.app} ${isLoading && styles.appOnLoading}`}
	return (
		<View style={styles.app}> 
			{isLoading ? (
				<View style={styles.loader} />
			) : (
				<>
					<LeftContext.Provider value={leftContext}>
						<LeftBlock />
					</LeftContext.Provider>
					{/* <RightContext.Provider value={rightContext}>
						<RightBlock sendMessage={sendJsonMessage} />
					</RightContext.Provider> */}
				</>
			)}
			<StatusBar />
		</View>
	);
}

const styles = StyleSheet.create({
  app: {
		width: '100%',
		// height: '100vh',
		// minWidth: 1920,
		marginVertical: 0,
		marginHorizontal: 'auto',
		// flexDirection: 'row',
		// display: grid,
		// grid-templateColumns: repeat(2, 50%),
		overflow: 'hidden',
	},
	
	appOnLoading: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	
	loader: {
		width: 80,
		height: 80,
	},
	
	// loader:after: {
	// 	content: ' ',
	// 	display: block,
	// 	width: 64,
	// 	height: 64,
	// 	margin: 8,
	// 	border-radius: 50%,
	// 	border: 6 solid rgba(182, 229, 255, 1),
	// 	borderColor: rgba(182, 229, 255, 1) transparent rgba(182, 229, 255, 1)
	// 		transparent,
	// 	animation: loader 1.2s linear infinite,
	// },
	
	error: {
		fontSize: 40,
		fontWeight: '700',
		lineHeight: 40,
	},
	
	// @keyframes loader: {
	// 	0%: {
	// 		transform: rotate(0deg),
	// 	},
	// 	100%: {
	// 		transform: rotate(360deg),
	// 	},
	// },
	
	// /* for correct view on computer monitor. delete when deploy*/
	
	// @media screen and (maxWidth: 2782): {
	// 	.app: {
	// 		height: 768,
	// 	},
	// },
	
	// @media screen and (maxWidth: 1920): {
	// 	.app: {
	// 		height: 540,
	// 	},
	// },
});

export default App;