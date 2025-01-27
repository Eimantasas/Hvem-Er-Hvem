
let players = 0;

let realNameList = [];
let fakeNameList = [];
let realNameTextList = [];
let fakeNameTextList = [];
let currentIndex = 1

// Update player count display
function updatePlayerCount() {
    displayText("playercountdiv", `Antall Spillere: ${players}`);
}

// Handle form submission
function submitInfo() {
    const realName = document.getElementById("realname").value.trim();
    const fakeName = document.getElementById("fakename").value.trim();

    if (realName === "" || fakeName === "") {
        displayText("errormessage", "Vennligst fyll inn begge feltene");
        return;
    }

    players++;
    realNameList.push(realName);
    fakeNameList.push(fakeName);

    displayText("errormessage", "");
    updatePlayerCount();

    // Clear input fields
    document.getElementById("realname").value = "";
    document.getElementById("fakename").value = "";
}

// Display a message in a specific element
function displayText(id, message) {
    document.getElementById(id).innerHTML = message;
}

// Start the game
function startGame() {
    displayText("errormessage", "");
    displayText("playerturn", `Det er ${realNameList[0]} sin tur!`)
    const fakeNamesSelect = document.getElementById("fake-names");
    const realNamesSelect = document.getElementById("real-names");

    // Clear existing options
    fakeNamesSelect.innerHTML = "";
    realNamesSelect.innerHTML = "";

    // Shuffle and populate dropdowns
    realNameTextList = shuffleArray([...realNameList]);
    fakeNameTextList = shuffleArray([...fakeNameList]);

    fakeNameTextList.forEach((fakeName, index) => {
        const option = document.createElement("option");
        option.value = `fake-${index}`;
        option.textContent = fakeName;
        fakeNamesSelect.appendChild(option);
    });

    realNameTextList.forEach((realName, index) => {
        const option = document.createElement("option");
        option.value = `real-${index}`;
        option.textContent = realName;
        realNamesSelect.appendChild(option);
    });
}

// Shuffle array in place
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function submitAnswer() {
    const fakeNamesSelect = document.getElementById("fake-names");
    const realNamesSelect = document.getElementById("real-names");

    const selectedFakeName = fakeNamesSelect.options[fakeNamesSelect.selectedIndex].textContent;
    const selectedRealName = realNamesSelect.options[realNamesSelect.selectedIndex].textContent;

    // Check if the indices match
    const fakeIndex = fakeNameList.indexOf(selectedFakeName);
    const realIndex = realNameList.indexOf(selectedRealName);

    if (fakeIndex === realIndex && fakeIndex !== -1) {
        alert(`Riktig! ${selectedFakeName} er egentlig ${selectedRealName}!`);

        // Remove the correctly guessed names from the arrays
        fakeNameList.splice(fakeIndex, 1);
        realNameList.splice(realIndex, 1);

        // Adjust currentIndex
        if (fakeIndex <= currentIndex) {
            // If the removed player was before or at the current index, adjust `currentIndex`.
            currentIndex = (currentIndex - 1 + realNameList.length) % realNameList.length;
        }

        // Restart the game with updated lists
        startGame();
    } else {
        alert(`Ikke riktig. ${selectedFakeName} er ikke ${selectedRealName}`);
    }

    // Display the next player's turn
    if (realNameList.length > 0) {
        currentIndex = currentIndex % realNameList.length; // Ensure index stays within bounds
        displayText("playerturn", `Det er ${realNameList[currentIndex]} sin tur!`);
        currentIndex = (currentIndex + 1) % realNameList.length; // Move to next player
    } else {
        displayText("playerturn", "Spillet er over! Alle er gjettet!");
    }
}


