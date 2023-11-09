// const { REACT_APP_WS_IP } = process.env;
const REACT_APP_WS_IP = '192.168.100.95:23245'
export const socketUrl = `ws://${REACT_APP_WS_IP}`;
export const pulkovoSubtypes = {
	ARRIVAL: 'ARRIVAL',
	DEPARTURE: 'DEPARTURE',
	COUNTERS: 'COUNTERS',
} as {
	ARRIVAL: 'ARRIVAL';
	DEPARTURE: 'DEPARTURE';
	COUNTERS: 'COUNTERS';
};

export const rightContentTypes = {
	media: 'media',
	pulkovo: 'pulkovo',
} as {
	media: 'media';
	pulkovo: 'pulkovo';
};
