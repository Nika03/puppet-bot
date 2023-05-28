const { zalgoRanges } = require('../Structures/Validation/ZalgoRanges');
const { safeList, scamList } = require('../Structures/Validation/ScamList');

function checkZalgo(msg) {
	const emoji = /(\u{200D}|\\?\p{Extended_Pictographic}|\p{Emoji_Presentation}|<a?:\w+:\d+>|[\ufe00-\ufe0f])/gu;
	let noemoji = msg.replace(emoji, '');

	for (const regex of zalgoRanges) {
		if (regex.test(noemoji)) return true;
	}
	return false;
}

function checkLink(msg) {
	if (msg.startsWith('https://')) {
		let flag = 0;
		for (let i = 0; i < safeList.length; i++) {
			//console.log(msg.startsWith('https://' + safeList[i]), safeList[i])
			if (msg.startsWith('https://' + safeList[i])) { // to skip the first 7 letters in the msg (https://)
				return 0;
			}
			flag++;
		}
		if (flag > 0) return 1;
	}
	if (msg.startsWith('http://')) {
		let flag = 0;
		for (let i = 0; i < safeList.length; i++) {
			//console.log(msg.startsWith('https://' + safeList[i]), safeList[i])
			if (msg.startsWith('http://' + safeList[i])) { // to skip the first 7 letters in the msg (http://)
				return 0;
			}
			flag++;
		}
		if (flag > 0) return 1;
	}
	return 0;
}

function checkSLink(msg) {
	if (msg.startsWith('https://')) {
		let flag = 0;
		for (let i = 0; i < safeList.length; i++) {
			//console.log(msg.startsWith('https://' + safeList[i]), safeList[i])
			if (msg.startsWith('https://' + scamList[i])) { // to skip the first 7 letters in the msg (https://)
				return 1;
			}
			flag++;
		}
		if (flag > 0) return 0;
	}
	if (msg.startsWith('http://')) {
		let flag = 0;
		for (let i = 0; i < safeList.length; i++) {
			//console.log(msg.startsWith('https://' + safeList[i]), safeList[i])
			if (msg.startsWith('http://' + scamList[i])) { // to skip the first 7 letters in the msg (http://)
				return 1;
			}
			flag++;
		}
		if (flag > 0) return 0;
	}
	return 0;
}

function checkValid(message, client) { // now i want to do the same thing as https://www.safetyatlast.net/ the links part
	if (message.author.bot) return;
	const content = message.content
	//if(content.startsWith(":") && content.endsWith(":")) return 0; // trying to fix the problem with deleting emojis
	if (checkSLink(content)) return 3;
	if (checkZalgo(content)) return 1;
	if (checkLink(content)) return 2;

	return 0;
}

module.exports = { checkValid };

//if (checkScamLink(content)) return 2; // discord already does that for me so ya L
/* function checkScamLink(msg) {
	if (msg.startsWith('https://')) {
		let flag = 0;
		for (let i = 0; i < scamList.length; i++) {
			if (scamList[i].includes(msg.slice(8))) { // to skip the first 7 letters in the msg (https://)
				flag++;
			}
		}
		if (flag > 0) return 1;
	}
	if (msg.startsWith('http://')) {
		let flag = 0;
		for (let i = 0; i < scamList.length; i++) {
			if (scamList[i].includes(msg,slice(7))) { // to skip the first 7 letters in the msg (http://)
				flag++;
			}
		}
		if (flag > 0) return 1;
	}
	return 0;
} */