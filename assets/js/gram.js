const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
let audioPath;
let testAud ="../data/audio/deceased.mp3";


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// Fetch words data from URL
fetch('https://raw.githubusercontent.com/modimen/calendar/main/gram.csv')
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Failed to load word data');
        }
    })
    .then(data => {
        const wordsData = data.split('\n');

        // Get today's word and definition
        const today = `${currentDay.toString().padStart(2, '0')}.${currentMonth.toString().padStart(2, '0')}`;
        const wordData = wordsData.find(row => row.startsWith(today));
        if (wordData) {
            const [date, curDay, audPath, word1, definition1, definition12, word2, definition2, definition22, word3, definition3, definition32, word4, definition4, definition42] = wordData.split(';');
            audioPath=audPath;
            document.getElementById('currentDay').textContent = curDay;
            document.getElementById('word1').textContent = word1;
            document.getElementById('definition1').textContent = definition1;
            document.getElementById('definition12').textContent = definition12;
            document.getElementById('word2').textContent = word2;
            document.getElementById('definition2').textContent = definition2;
            document.getElementById('definition22').textContent = definition22;
            document.getElementById('word3').textContent = word3;
            document.getElementById('definition3').textContent = definition3;
            document.getElementById('definition32').textContent = definition32;
        }
    })
    .catch(error => {
        console.error('Error loading word data:', error);
        // You can display an error message to the user here
    });

    let audio = document.createElement('audio');
    audio.src = testAud;
    // audio.src = audioPath;
    audio.load();
    document.body.appendChild(audio);

    document.getElementById('playButton').addEventListener('click', function() {
        audio.play();
    });