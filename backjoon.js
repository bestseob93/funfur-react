const readline = require('readline');

const rl = readline.createInterface({
		  input: process.stdin,
			output: process.stdout
});

rl.question('input: ', (answer) => {
			var input = parseInt(answer);
			var a = 5;
			var b = 3;
			var result, isCorrect;
			if(input < 3 || input > 5000) {
				console.log('answer is must be in 3 and 5000');
				rl.close();
			} else {
				if(input%5 === 0) {
					return input/5; // 5로 나눠 떨어지면 갯수 출력
				} else if(input/5 < 1) {
					return 1;
				} else if(input%5 !== 0) {
					console.log(input);
					console.log(input%5);
					if(input%5 < 5) {
						console.log(input%3);
					}
				}
				rl.close();
			}
});
