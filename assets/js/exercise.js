const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const yesterDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
const yesterDay = yesterDate.getDate();
const yesterMonth = yesterDate.getMonth() + 1;
const theDayBeforeYesterDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
const theDayBeforeYesterDay = theDayBeforeYesterDate.getDate();
const tdbyMonth = theDayBeforeYesterDate.getMonth() + 1;

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

        const today = `${currentDay.toString().padStart(2, '0')}.${currentMonth.toString().padStart(2, '0')}`;
        const yester = `${yesterDay.toString().padStart(2, '0')}.${yesterMonth.toString().padStart(2, '0')}`;
        const bYester = `${theDayBeforeYesterDay.toString().padStart(2, '0')}.${tdbyMonth.toString().padStart(2, '0')}`;
        const wordData = wordsData.find(row => row.startsWith(today));
        const wordDataY = wordsData.find(row => row.startsWith(yester));
        const wordDataD = wordsData.find(row => row.startsWith(bYester));

        const [a, word1, definition1] = wordData.split(';');
        const [b, word2, definition2] = wordDataY.split(';');
        const [c, word3, definition3] = wordDataD.split(';');

        const termins = [word1, word2, word3];
        const defins = [definition1, definition2, definition3];

        shuffleArrays(termins);
        shuffleArrays(defins);

        document.getElementById('word1Text').textContent = termins[0];
        document.getElementById('word2Text').textContent = termins[1];
        document.getElementById('word3Text').textContent = termins[2];

        document.getElementById('definition1Text').textContent = defins[0];
        document.getElementById('definition2Text').textContent = defins[1];
        document.getElementById('definition3Text').textContent = defins[2];

        const wordBlocks = document.querySelectorAll('.word-block');
        const definitionBlocks = document.querySelectorAll('.definition-block');

        let selectedWordBlock = null; // Keep track of the currently selected word block

        wordBlocks.forEach(block => {
        block.addEventListener('click', () => {
            if (selectedWordBlock) {
            selectedWordBlock.classList.remove('selected', 'wrong'); // Clear previous selection/error
            definitionBlocks.forEach(block => {
                block.classList.remove('selected', 'wrong');
            });
            }
            selectedWordBlock = block;
            block.classList.add('selected'); // Add selection shadow
        });
        });

        definitionBlocks.forEach(block => {
            block.addEventListener('click', () => {
              if (!selectedWordBlock) return; // No selected word to check against
      
              const selectedWord = selectedWordBlock.textContent.trim();
              const clickedDefinition = block.textContent.trim();
      
              // Check for match with all word-definition pairs
              for (let i = 0; i < termins.length; i++) {
                if (selectedWord === termins[i] && clickedDefinition === defins[i]) {
                  selectedWordBlock.classList.add('matched'); // Add persistent green shadow
                  block.classList.add('matched'); // Add green shadow to definition
                  return; // Exit the loop after finding a match
                }
              }
      
              // No match found
              selectedWordBlock.classList.add('wrong'); // Add red shadow (temporary)
              block.classList.add('wrong'); // Add red shadow to definition
            });
          });

        definitionBlocks.forEach(block => {
        block.addEventListener('click', () => {
            if (!selectedWordBlock) return; // No selected word to check against

            const selectedWord = selectedWordBlock.textContent.trim();
            const clickedDefinition = block.textContent.trim();

            if (selectedWord === word1.trim()){
                if (definition1.trim() === clickedDefinition) {
                selectedWordBlock.classList.add('matched'); // Add persistent green shadow
                block.classList.add('matched'); // Add green shadow to definition
                } else {
                selectedWordBlock.classList.add('wrong'); // Add red shadow (temporary)
                block.classList.add('wrong'); // Add red shadow to definition
                }
            }
            if (selectedWord === word2.trim()){
                if (definition2.trim() === clickedDefinition) {
                selectedWordBlock.classList.add('matched'); // Add persistent green shadow
                block.classList.add('matched'); // Add green shadow to definition
                } else {
                selectedWordBlock.classList.add('wrong'); // Add red shadow (temporary)
                block.classList.add('wrong'); // Add red shadow to definition
                }
            }
            if (selectedWord === word3.trim()){
                if (definition3.trim() === clickedDefinition) {
                selectedWordBlock.classList.add('matched'); // Add persistent green shadow
                block.classList.add('matched'); // Add green shadow to definition
                } else {
                selectedWordBlock.classList.add('wrong'); // Add red shadow (temporary)
                block.classList.add('wrong'); // Add red shadow to definition
                }
            }
            
            

            // Optionally, provide additional feedback (e.g., console logs or UI elements)
            console.log(`Selected word: ${selectedWord}, Clicked definition: ${clickedDefinition}`);
        });
        });

        function shuffleArrays(array1) {
            for (let x = 5; x>0; x--){
                for (let i = array1.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array1[i], array1[j]] = [array1[j], array1[i]];
                }
            }
        }
    })
    .catch(error => {
        console.error('Error loading word data:', error);
    });