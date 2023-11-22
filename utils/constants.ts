const { EXPO_PUBLIC_WS_IP } = process.env

export const socketUrl = `ws://${EXPO_PUBLIC_WS_IP}`

export const pulkovoSubtypes = {
	ARRIVAL: 'ARRIVAL',
	DEPARTURE: 'DEPARTURE',
	COUNTERS: 'COUNTERS',
} as {
	ARRIVAL: 'ARRIVAL'
	DEPARTURE: 'DEPARTURE'
	COUNTERS: 'COUNTERS'
}

export const rightContentTypes = {
	media: 'media',
	pulkovo: 'pulkovo',
} as {
	media: 'media'
	pulkovo: 'pulkovo'
}
