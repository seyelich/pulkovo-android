import { useWindowDimensions } from 'react-native'
import { Path, Svg } from 'react-native-svg'

import useRightContext from '../../hooks/useRightContext'

export const ArrivalDepartureIcon = () => {
	const { subtype } = useRightContext().pulkovo
	const { width: deviceWidth } = useWindowDimensions()

	return subtype === 'ARRIVAL' ? (
		<Svg
			width={deviceWidth >= 2782 ? '70' : '50'}
			height={deviceWidth >= 2782 ? '70' : '50'}
			viewBox="0 0 50 50"
			fill="none"
		>
			<Path
				d="M6.2248 24.7042L10.3777 28.4631L38.8323 36.0875C40.1902 36.4514 41.6155 35.5763 41.9628 34.2801C42.3266 32.9222 41.4968 31.5752 40.1389 31.2114L29.1521 28.2675L26.1126 8.99574L21.1748 7.67264L19.0294 25.5551L11.6843 23.587L10.6001 18.0041L5.60052 16.6644L6.2248 24.7042Z"
				fill="#334743"
			/>
			<Path
				d="M8.33334 42.8572C8.33334 41.5422 9.39933 40.4762 10.7143 40.4762H39.2857C40.6007 40.4762 41.6667 41.5422 41.6667 42.8572H8.33334Z"
				fill="#334743"
			/>
		</Svg>
	) : (
		<Svg
			width={deviceWidth >= 2782 ? '70' : '50'}
			height={deviceWidth >= 2782 ? '70' : '50'}
			viewBox="0 0 50 50"
			fill="none"
		>
			<Path
				d="M10.8224 33.5855L16.2984 34.7645L44.753 27.1401C46.1109 26.7762 46.9077 25.3058 46.5604 24.0096C46.1965 22.6516 44.8044 21.9 43.4464 22.2639L32.4596 25.2078L20.1916 10.0377L15.2537 11.3608L22.3369 27.9202L14.9918 29.8883L11.2615 25.5954L6.26189 26.9351L10.8224 33.5855Z"
				fill="#334743"
			/>
			<Path
				d="M8.33334 42.8571C8.33334 41.5422 9.39933 40.4762 10.7143 40.4762H39.2857C40.6007 40.4762 41.6667 41.5422 41.6667 42.8571H8.33334Z"
				fill="#334743"
			/>
		</Svg>
	)
}
