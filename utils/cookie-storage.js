function getCookie(cname) {
	const name = cname + '=';

	const ca = document.cookie.split(';');

	for (const i = 0; i < ca.length; i++) {
		let c = ca[i];

		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}

		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

export { getCookie };
