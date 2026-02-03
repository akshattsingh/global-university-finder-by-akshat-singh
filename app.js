
const API_URL = "https://hipolabs-proxy.aksng19.workers.dev/search";

// ---------------- COUNTRY SEARCH ------------------------

const countryInput = document.querySelector("#countryInput");
const countryBtn = document.querySelector("#country");

countryBtn.addEventListener("click", searchByCountry);

countryInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchByCountry();
    }
});

// Function to search universities by country
async function searchByCountry() {
    let country = countryInput.value.trim();

    // Stop execution if input is empty
    if (!country) {
        console.warn("Country input is empty");
        return;
    }

    try {
        // API call using Axios
        let res = await axios.get(`${API_URL}?country=${country}`);

        console.log(`Universities in ${country.toUpperCase()}:`);
        res.data.forEach((col, index) => {
            console.log(`${index + 1}. ${col.name}`);
        });

        // call sorting function
        let sorted = sortByName(res.data);

        // Display results alphabetically on UI
        showCountry(sorted);

    } catch (error) {
        console.error("Country fetch error:", error);
    }
}

// function to sort names of colleges or universities in alphabetical order
function sortByName(colleges) {
    return colleges.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
}

// Function to display country-wise universities
function showCountry(colleges) {
    let list = document.querySelector("#clist");
    list.innerHTML = "";

    if (colleges.length === 0) {
        console.warn("No universities found for this country");
        list.innerText = "No universities found";
        return;
    }

    colleges.forEach(col => {
        let li = document.createElement("li");
        li.innerText = col.name;
        list.appendChild(li);
    });
}

// ---------------- STATE SEARCH --------------------------

const stateInput = document.querySelector("#stateInput");
const stateBtn = document.querySelector("#state");

stateBtn.addEventListener("click", searchByState);

stateInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchByState();
    }
});

// Function to search universities by Indian state
async function searchByState() {
    let state = stateInput.value.trim().toLowerCase();

    // Stop execution if input is empty
    if (!state) {
        console.warn("State input is empty");
        return;
    }

    try {
        // Fetch all Indian universities
        let res = await axios.get(`${API_URL}?country=India`);

        // Filter universities by state-province field
        let filtered = res.data.filter(col =>
            col["state-province"] &&
            col["state-province"].toLowerCase().includes(state)
        );

        console.log(`Universities in ${state.toUpperCase()}:`);
        filtered.forEach((col, index) => {
            console.log(`${index + 1}. ${col.name}`);
        });

        // call sorting function
        let sorted = sortByName(filtered);

        // Display filtered results alphabetically on UI
        showState(sorted);

    } catch (error) {
        console.error("State fetch error:", error);
    }
}

// Function to display state-wise universities
function showState(colleges) {
    let list = document.querySelector("#slist");
    list.innerHTML = "";

    if (colleges.length === 0) {
        console.warn("No colleges found for this state");
        list.innerText = "No colleges found for this state";
        return;
    }

    colleges.forEach(col => {
        let li = document.createElement("li");
        li.innerText = col.name;
        list.appendChild(li);
    });
}