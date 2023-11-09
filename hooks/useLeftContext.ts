import { useContext } from 'react';
import { LeftContext } from '../utils/store';

export default function useLeftContext() {
	return useContext(LeftContext);
}
