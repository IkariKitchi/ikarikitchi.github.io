const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1; // Months are zero-based

const currentDayElement = document.getElementById('currentDay');
const currentMonthElement = document.getElementById('currentMonth');

currentDayElement.textContent = currentDay;

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

currentMonthElement.textContent = months[currentMonth - 1];

// Fetch words data from URL
fetch('https://raw.githubusercontent.com/modimen/calendar/main/word.csv')
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
            const [date, word, definition] = wordData.split(';');
            document.getElementById('word').textContent = word;
            document.getElementById('definition').textContent = definition;
        }

        // Check if it's Monday
        if (currentDate.getDay() === 1) {
            const wordButton = document.getElementById('testButton');
            wordButton.style.display = 'block';
            wordButton.addEventListener('click', () => {
                // Redirect to test page on click
                window.location.href = 'test.html';
            });
        }
    })
    .catch(error => {
        console.error('Error loading word data:', error);
        // You can display an error message to the user here
    });



function loadWordData() {
    // Update current day and month elements
    currentDayElement.textContent = currentDate.getDate();
    currentMonthElement.textContent = months[currentDate.getMonth()];

    // Fetch and display word data for the new date
    fetch('https://raw.githubusercontent.com/modimen/calendar/main/word.csv')
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Failed to load word data');
            }
        })
        .then(data => {
            const wordsData = data.split('\n');
            const today = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
            const wordData = wordsData.find(row => row.startsWith(today));
            if (wordData) {
                const [date, word, definition] = wordData.split(';');
                document.getElementById('word').textContent = word;
                document.getElementById('definition').textContent = definition;

                // Hide test button if it's not Monday
                if (currentDate.getDay() !== 1) {
                    document.getElementById('testButton').style.display = 'none';
                }
            }
        })
        .catch(error => {
            console.error('Error loading word data:', error);
            // You can display an error message to the user here
        });
        
    if (currentDate.getDay() === 1) {
        document.getElementById('testButton').classList.add('show');
        document.getElementById('word').style.display = 'none';
        document.getElementById('definition').style.display = 'none';
    } else {
        document.getElementById('testButton').classList.remove('show');
        document.getElementById('word').style.display = 'block';
        document.getElementById('definition').style.display = 'block';
    }
}
