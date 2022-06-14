import { useCallback, useRef } from 'react';

export const useDebounce = (callback: any, delay: number) => {
	const timer = useRef<number>();

	const debouncedCallback = useCallback(
		(...args) => {
			const callbackArgs = [...args];
			if (timer.current) {
				clearTimeout(timer.current);
			}
			timer.current = setTimeout(() => {
				callback(...callbackArgs);
			}, delay);
		},
		[callback, delay],
	);

	return debouncedCallback;
};
