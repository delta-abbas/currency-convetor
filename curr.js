const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg");

for(let select of dropdowns)
{
    for(currCode in countryList)
    {
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD")
        {
            newOption.selected = "selected";
        }if(select.name === "to" && currCode === "INR")
        {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (Element)=>{
    let currCode = Element.value;
    let countryCode = countryList[currCode];
    console.log(currCode)
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = Element.parentElement.querySelector("img");
    img.src = newSrc
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let atmVal = amount.value;
    if(atmVal === "" || atmVal<1)
    {
        atmVal  = 1;
        amount.value = "1";
    }

    console.log(fromCurr.value,toCurr.value)
    
    let url = `https://v6.exchangerate-api.com/v6/c1a140ba1584885ea476bd3e/pair/${fromCurr.value}/${toCurr.value}/${atmVal}`;
    let response = await fetch(url);

    let data = await response.json();
    let rate = data.conversion_rate;
    
    let finalAmount = atmVal * rate;

    msg.innerText = `${atmVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
    
})
