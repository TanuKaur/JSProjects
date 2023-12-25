const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordLength = 10;
let checkCount = 0;
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

handleSlider();
setIndicator("#ccc");
// set passwordLength

function handleSlider()
{
   inputSlider.value = passwordLength;
   lengthDisplay.innerText = passwordLength;
   const min = inputSlider.min;
   const max = inputSlider.max;
   inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%"
}
// set Indicator
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}
// get Random Integer
function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
// generate random number
function generateRandomNumber()
{
    return getRandomInteger(0,9);
}
// generate random lowercase
function generateRandomLowerCase()
{
    return String.fromCharCode(getRandomInteger(97,123));
}
// generate random uppercase
function generateRandomUpperCase()
{
    return String.fromCharCode(getRandomInteger(65,91));
}
// generate symbol
function generateSymbol()
{
    const randNum = getRandomInteger(0,symbols.length);
    return symbols.charAt(randNum);
}
// Calculate strength
function calcStrength()
{
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    }
    else if (
        (hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6

    ) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
}
// copy content
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch (e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);

}
//shuffle password
function shufflePassword(Array)
{
    // Fisher Yates Method
    for (let i = Array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = Array[i];
        Array[i] = Array[j];
        Array[j] = temp;
    }
    let str = "";
    Array.forEach((el) => (str += el));
    return str;
} 
// event listener on slider
inputSlider.addEventListener('input',(e)=>{
     passwordLength = e.target.value;
     handleSlider();
})
// event listener on copy btn
copybtn.addEventListener('click',()=>{
    // if it is non empty 
    if(passwordDisplay.value)
       copyContent();
})
function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
        {
            checkCount++;
        }
    })
    // special case
    if(passwordLength<checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }
}
// event listener on checkboxes
allCheckBox.forEach((checkBox) =>{
    checkBox.addEventListener('change',handleCheckBoxChange);
    
})
// event listener on generate password
generateBtn.addEventListener("click",()=>{
     //none of the checkbox is checked
    if(checkCount<=0)
        return;
    if(passwordLength<checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }
    console.log("starting the journey");
    password = ""; 
    let funcArr = [];
    if(uppercaseCheck.checked)
    funcArr.push(generateRandomUpperCase);
    if(lowercaseCheck.checked)
    funcArr.push(generateRandomLowerCase);
    if(numbersCheck.checked)
    funcArr.push(generateRandomNumber);
    if(symbolsCheck.checked)
    funcArr.push(generateSymbol);
    
    // compulsory addition
    for(let i =0;i<funcArr.length;i++)
    {
        password+=funcArr[i]();
    }
    console.log("compulsory addition addition done");
    // remaining addition
    for(let i=0;i<passwordLength-funcArr.length;i++)
    {
        let randIndex = getRandomInteger(0,funcArr.length);
        password+=funcArr[randIndex]();
    }
    console.log("remaining addition addition done");
    // shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("suffeling  done");
    // show in UI
    passwordDisplay.value = password;
    console.log("UI addition done");
    // calculate strength
    calcStrength();
})
