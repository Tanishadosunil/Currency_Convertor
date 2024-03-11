let selects = document.querySelectorAll(".img-select select");
let input = document.querySelector(".amount input");
let btn = document.querySelector("#btn");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for(let select of selects) {
    for(currCode in countryList) {
        let newOpt = document.createElement("option");
        newOpt.value = currCode;
        newOpt.innerText = currCode;
        select.append(newOpt);
        if(currCode === "USD" && select.name === "from") {
            newOpt.selected = "selected";
        } else if(currCode === "INR" && select.name === "to") {
            newOpt.selected = "selected";
        }
        
    }
    select.addEventListener("change", (event) => {
        changeFlag(event.target);
    });
}

const changeFlag = (event) => {
    let currCode = event.value;
    let country_code = countryList[currCode];  
    event.parentElement.children[0].src = `https://flagsapi.com/${country_code}/flat/64.png`;
}

const changeCurr = async() => {
    let amount = input.value;
    if(amount < 1) {
        amount = 1;
        input.value = 1;
    }
    const URL = `https://open.er-api.com/v6/latest/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let allRates = data.rates;
    let finalAmount;
    if(allRates.hasOwnProperty(toCurr.value)) {
        finalAmount = amount * allRates[toCurr.value];
    }
    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener("click", (event) => {
    event.preventDefault();
    changeCurr();
})