const randomN = function number() {
	const random_number1 = Math.floor(Math.random() * 100);
	const random_number2 = Math.floor(Math.random() * 100);

	if(random_number1 === random_number2)
		return 1;
	return 0;
}

module.exports = randomN;