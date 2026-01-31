// The proxy handles the HTTPS -> HTTP transition
const PROXY_URL = "https://corsproxy.io/?"; 
const API_URL = "http://universities.hipolabs.com/search";

// Helper to create a safe, proxied URL
function getProxiedUrl(params) {
    return `${PROXY_URL}${API_URL}${params}`;
}

// ---------------- COUNTRY SEARCH ----------------
const countryInput = document.querySelector("#countryInput");
const countryBtn = document.querySelector("#country");

countryBtn.addEventListener("click", searchByCountry);
countryInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchByCountry();
    }
});

//function to search universities in required country using api

async function searchByCountry() {
    let country = countryInput.value.trim();
    if (!country) return;

    try {
        // Use the proxied URL here
        let res = await axios.get(getProxiedUrl(`?country=${country}`));

        console.log(`Universities in ${country.toUpperCase()}:`);
        res.data.forEach((col, index) => {
            console.log(`${index + 1}. ${col.name}`);
        });

        showCountry(res.data);
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

//function to display universities in the form of unordered list

function showCountry(colleges) {
    let list = document.querySelector("#clist");
    list.innerHTML = "";

    if (colleges.length === 0) {
        list.innerText = "No universities found";
        return;
    }

    colleges.forEach(col => {
        let li = document.createElement("li");
        li.innerText = col.name;
        list.appendChild(li);
    });
}

// ---------------- STATE SEARCH ----------------
const stateInput = document.querySelector("#stateInput");
const stateBtn = document.querySelector("#state");

stateBtn.addEventListener("click", searchByState);
stateInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchByState();
    }
});

//function to search universities in required state of India using api

async function searchByState() {
    let state = stateInput.value.trim().toLowerCase();
    if (!state) return;

    try {
        // Use the proxied URL here
        let res = await axios.get(getProxiedUrl(`?country=India`));

        let filtered = res.data.filter(col =>
            col["state-province"] &&
            col["state-province"].toLowerCase().includes(state)
        );

        console.log(`Universities in ${state.toUpperCase()}:`);
        filtered.forEach((col, index) => {
            console.log(`${index + 1}. ${col.name}`);
        });

        showState(filtered);
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

//function to display universities in the form of unordered list 

function showState(colleges) {
    let list = document.querySelector("#slist");
    list.innerHTML = "";

    if (colleges.length === 0) {
        list.innerText = "No colleges found for this state";
        return;
    }

    colleges.forEach(col => {
        let li = document.createElement("li");
        li.innerText = col.name;
        list.appendChild(li);
    });
}