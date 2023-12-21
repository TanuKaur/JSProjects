const countVal = document.querySelector("#counter");
const increment = ()=>{
    let value = parseInt(countVal.innerText);
    value++;
    countVal.innerText = value;
}
const decrement = ()=>{
    let value = parseInt(countVal.innerText);
    value--;
    countVal.innerText = value;
}
const reset = () => {
    countVal.innerText = 0;
}
