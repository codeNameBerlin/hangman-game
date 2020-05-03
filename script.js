const word = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.fig-part');

const wordsArray = ['php', 'rust', 'kotlin', 'scala', 'ruby', 'phyton', 
'java', 'csharp', 'sql', 'objectivec', 'basic', 'dart', 'go', 'lisp', 
'reason', 'visualbasic', 'typescript', 'perl', 'scheme', 'erlang', 
'elixir', 'haskell', 'javascript', 'cplusplus'];

let selectedWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];

const correctLetters = ['a', 'e', 'i', 'o', 'u'];
const wrongLetters = [];

// Show hidden word
const displayWord = () => {
	word.innerHTML = `${
	selectedWord.split('')
	.map(letter => 
		`<span class='letter'> 
		${correctLetters.includes(letter) ? letter : ''} 
		</span>`
		).join('')
	}`;

	const innerWord = word.innerText.replace(/\n/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You Won!!';
		popup.style.display = 'flex';
	}
}

// Update wrong letters element
const updateWrongLetters = () => {
	// Display wrong letters
	wrongLettersEl.innerHTML = `
	${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
	${wrongLetters.map(letter => `<span>${letter}</span>`)}
	`;

	// Display figureParts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	})

	// Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately, You lost.';
		popup.style.display = 'flex';
	}
}

// show duplicate letter notification
const showNotification = () => {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 3000)
}

// Keydown letter press
window.addEventListener('keydown', e => {
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		const alphabet = e.key;

		if (selectedWord.includes(alphabet)) {
			if (!correctLetters.includes(alphabet)) {
				correctLetters.push(alphabet);

				displayWord();
			} else {
				showNotification();
			}
		} else {
			if (!wrongLetters.includes(alphabet)) {
				wrongLetters.push(alphabet);

				updateWrongLetters();
			} else {
				showNotification();
			}
		}
	}
})

// Restart game and play playAgain
playAgainBtn.addEventListener('click', () => {
	// Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];

	displayWord();

	updateWrongLetters();

	popup.style.display = 'none';
})

displayWord();