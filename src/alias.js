// TODO: use fn.bind instead

/**
 * Renames a synchronous function
 */
export default function alias(thisArg, fn) {
	return function() {
		return fn.apply(thisArg, arguments);
	};
}