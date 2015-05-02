/**
 * Renames a synchronous function
 */
export default function alias(myThis, fn) {
	return (...myArgs) => fn.apply(myThis, myArgs);
}