// Initialize Firebase with your configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const names = [];

function addNames() {
    for (let i = 1; i <= 7; i++) {
        const name = prompt(`Enter Name ${i}:`);
        if (name) {
            const rating = prompt(`Enter Rating (1-5) for ${name}:`);
            if (rating && parseInt(rating) >= 1 && parseInt(rating) <= 5) {
                const narrative = prompt(`Enter Narrative Evaluation for ${name}:`);
                names.push({ name, rating, narrative });
            } else {
                alert("Please enter a valid rating (1-5).");
                return;
            }
        } else {
            alert("Please enter a name.");
            return;
        }
    }

    saveData();
}

function saveData() {
    const evaluationsRef = database.ref('evaluations');

    // Push data to the 'evaluations' node
    const newEvaluationRef = evaluationsRef.push();
    newEvaluationRef.set(names);

    displayResults();
}

function displayResults() {
    const nameList = document.getElementById("nameList");
    const resultsList = document.getElementById("results");

    // Clear previous data
    nameList.innerHTML = "";
    resultsList.innerHTML = "";

    // Display names and ratings
    names.forEach((person) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${person.name}</strong> - ${person.rating} stars`;
        nameList.appendChild(listItem);
    });

    // Display detailed results
    names.forEach((person) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${person.name}</strong>
            <div class="star-rating">
                <span style="width: ${person.rating * 20}%">☆☆☆☆☆</span>
            </div>
            <p>Rating: ${person.rating} stars</p>
            <p>Narrative: ${person.narrative}</p>
        `;
        resultsList.appendChild(listItem);
    });
}
