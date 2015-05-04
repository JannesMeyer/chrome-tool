/**
 * Returns a translated string
 */
export function getString(name, substitution) {
	if (substitution !== undefined) {
		if (typeof substitution === 'number' && substitution > 1) {
			return chrome.i18n.getMessage(name + 's', [ substitution ]);
		}
		return chrome.i18n.getMessage(name, [ substitution ]);
	}
	return chrome.i18n.getMessage(name);
}