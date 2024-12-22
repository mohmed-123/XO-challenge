// تحميل الأصوات
const clickSound = new Audio('audio/click.mp3');
const winSound = new Audio('audio/win.mp3'); // نفس الصوت للفوز
const drawSound = new Audio('audio/draw.mp3');
const startSound = new Audio('audio/start.mp3');

// تشغيل الصوت عند النقر على المربع
function playClickSound() {
  clickSound.play();
}

// تشغيل نفس الصوت عند الفوز (لنفس اللاعبين)
function playWinSound() {
  winSound.play();
}

// تشغيل الصوت عند التعادل
function playDrawSound() {
  drawSound.play();
}

// تشغيل الصوت عند بداية اللعبة
function playStartSound() {
  startSound.play();
}

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      // إضافة تأثير الاهتزاز للمربعات الفائزة
      document.querySelectorAll(`.cell[data-index='${a}'], .cell[data-index='${b}'], .cell[data-index='${c}']`)
        .forEach(cell => cell.classList.add('winner'));
      return true;
    }
    return false;
  });
}

function handleClick(event) {
  const index = event.target.dataset.index;
  if (gameBoard[index] === '') {
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // تشغيل صوت النقر
    playClickSound();

    if (checkWinner()) {
      // عند الفوز، سيتم تشغيل نفس الصوت (winSound) سواء كان "X" أو "O"
      playWinSound(); // تشغيل نفس صوت الفوز
      message.textContent = `${currentPlayer} فاز!`;
    } else if (gameBoard.every(cell => cell !== '')) {
      // عند التعادل
      playDrawSound(); // تشغيل صوت التعادل
      message.textContent = 'تعادل!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// ربط المربعات مع حدث النقر
cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

// إعادة اللعبة
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', '']; // إعادة المصفوفة إلى حالتها الأولية
  currentPlayer = 'X'; // إعادة تعيين اللاعب الأول
  message.textContent = ''; // مسح الرسالة

  // مسح النصوص داخل المربعات
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner'); // إزالة أي تأثيرات فوز
  });
}

document.getElementById('reset-button').addEventListener('click', resetGame);

// تشغيل الصوت عند بداية اللعبة
playStartSound();

