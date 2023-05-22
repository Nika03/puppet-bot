const randomNReggie = function number() {
		const random_number1 = Math.floor(Math.random() * 200);
		const random_number2 = Math.floor(Math.random() * 200);
		let res = 0, i = 0;;
	
		while(i < 50) {
			if(random_number1 == random_number2) res++;
			i++;
		}
	if (res == 50)
		return 1;
	return 0;
}

const getReggie = function getGif() {
	const gifs = [ 'https://tenor.com/view/whygena-reggie-gif-20262381', 'https://imgur.com/a/c9AyI5a', 'https://media.discordapp.net/attachments/665624930599174154/986280946166796378/B6A6A6F6-0940-4AA0-83EB-B0E0C046180C-1.gif', 'https://tenor.com/view/whygena-whygena-tentacles-reggie-reggie-the-rat-cute-rat-boy-gif-24174715', 'https://tenor.com/view/reggie-mouse-trap-gif-25221480', 'https://media.discordapp.net/attachments/473197954132475907/987137675960131614/FDXskHtVQAMsNM_.gif', 'https://tenor.com/view/meme-reggie-the-rat-berserk-skeleton-gif-25594200', 'https://tenor.com/view/dansen-whygena-reggie-gif-21008024', 'https://tenor.com/view/almic-gif-19160345', 'https://images-ext-1.discordapp.net/external/8gX5a3SMKxwJCejmqgfX0SkEUfDmPv8e05NP-zwhc3Y/https/i.kym-cdn.com/photos/images/original/001/760/738/ad8.gif', 'https://images-ext-1.discordapp.net/external/cGrA7Z9D3Mr8Rl_Y6359XBrgyswFdKumaGz35T_TlD4/https/i.kym-cdn.com/photos/images/newsfeed/001/419/859/baa.gif', 'https://tenor.com/view/reggie-whygena-rat-mouse-yawn-gif-6163606526851292732', 'https://tenor.com/view/reggie-whygena-rat-sleeping-bed-gif-18336145926028492265', 'https://tenor.com/view/reggie-whygena-rat-waking-up-wake-up-gif-6432082508319913601', 'https://tenor.com/view/reggie-whygena-rat-sigh-mouse-gif-5396302663880723322', 'https://i.kym-cdn.com/photos/images/original/001/760/738/ad8.gif', 'https://media.discordapp.net/attachments/955209518122426458/1103392800319483934/Reggie_108.gif', 'https://media.discordapp.net/attachments/955209518122426458/1103392801305145374/Reggie_125.gif' ];
	const gif = Math.floor(Math.random() * gifs.length);
	const resgif = gifs[gif];
	return resgif;
}

module.exports = { getReggie, randomNReggie };