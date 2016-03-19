function getData() {
	return {
		url: document.URL,
		domain: document.domain,
		referrer: document.referrer,
		title: document.title,
		screenHeight: screen.height,
		screenWidth: screen.width,
		userAgent: navigator.userAgent,
		language: navigator.language,
		platform: navigator.platform
	}
}
function serialize(data) {
	var str = [];
	for (var key in data) {
		if (data.hasOwnProperty(key)) {
			str.push(key + '=' + encodeURIComponent(data[key]));
		}
	}
	return str.join('&');
}

var qs = serialize(getData());

var req = new XMLHttpRequest();
req.open('GET', 'http://kdelemme.com:4001/a.gif?' + qs, true);
req.withCredentials = true
req.send(null);
