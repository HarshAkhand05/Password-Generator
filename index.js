const inputslider =document.querySelector("[lengthslider]")
const lengthdisplay =document.querySelector("[datalengthnum]")
const passdis =document.querySelector("[datapassworddis]")
const copypass =document.querySelector("[datacopy]")
const copymess =document.querySelector("[datacopymess]")
const uppercheck =document.querySelector("#upcheck")
const lowercheck =document.querySelector("#lwcheck")
const numbercheck =document.querySelector("#numcheck")
const symbolcheck =document.querySelector("#symcheck")
const indicator = document.querySelector("[dataindicator]")
const generatebtw = document.querySelector(".generate-pass")
const allcheckbox = document.querySelectorAll("input[type=checkbox]")
let password = " ";
let passwordlength = 10;
let checkcount = 0;
let symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


// set passwordlength
function handleslider() {
    inputslider.value = passwordlength;
    lengthdisplay.innerText = passwordlength;
    const min1 = inputslider.min;
    const max1 = inputslider.max;
    inputslider.style.backgroundSize = ((passwordlength - min1) * 100 / (max1 - min1))+"% 100%"
}
setindicator("#ccc");
function setindicator(color) {
    indicator.style.background = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

} 
function generatetheinteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function generaterandomsymbol() {
    const ans = generatetheinteger(0, symbol.length );
   return symbol.charAt(ans);
}
function generateuppercase() {
    return String.fromCharCode(generatetheinteger(65, 91));
}
function generaterlowercase() {
   return String.fromCharCode( generatetheinteger(97, 123));
}
function generatenumber() {
   return generatetheinteger(0, 9);
}
function calcustrength() {
    let hasupper = false;
    let haslower = false;
    let hasnum = false;
    let hassymbol = false;
    if (uppercheck.checked)
        hasupper = true;
    if (lowercheck.checked)
        haslower = true;
    if (numbercheck.checked)
        hasnum = true;
    if (symbolcheck.checked)
        hassymbol = true;
    if (hasupper && haslower && (hasnum || hassymbol) && passwordlength >= 8) {
        setindicator("#0f0");
    }
    else if (haslower || hasupper && hasnum || hassymbol) {
        setindicator("#ff0");
    }
    else {
        setindicator("#f00");
    }

}
function shufflepassword(array){
    // fisher yield method 
for(let i=array.length-1;i>0;i--)
{
    const j = Math.floor(Math.random()*(i+1));
    const temp =array[i];
    array[i]=array[j];
    array[j]=temp;

}
let str="";
array.forEach((el)=>{str+=el});
    return str ;

}
function handlecheckbox() {
    checkcount = 0;
    allcheckbox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkcount++;
        }
    })
    // check count
    if (passwordlength < checkcount) {
        passwordlength = checkcount
        handleslider();
    }
}
allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', handlecheckbox);
})
async function copycontent() {
    try {
        await navigator.clipboard.writeText(passdis.value);
        copymess.innerText = "copied";
    }
    catch (e) {
        copymess.innerText = "Failed";
    }
    // to make copy vala span visible
    copymess.classList.add("active");

    setTimeout( () => {
        copymess.classList.remove("active");
    },2000);

}


inputslider.addEventListener('input', (e) => {
    passwordlength = e.target.value;
    handleslider();
})
copypass.addEventListener('click', () => {
    if (passdis.value) {
        copycontent();
    }
})
generatebtw.addEventListener('click', () => {
    if (checkcount == 0) 
        return;
    if (passwordlength < checkcount) {
        passwordlength = checkcount;
        handleslider();
    }
    // remove old password
    console.log("starting journey");
    password = "";
    
    let funarr = [];
    if (uppercheck.checked) {
        funarr.push(generateuppercase());
    }
    if (lowercheck.checked) {
        funarr.push(generaterlowercase());
    }
    if (numbercheck.checked) {
        funarr.push(generatenumber());
    }
    if (symbolcheck.checked) {
        funarr.push(generaterandomsymbol());
    }

    // compulsary addition
    for (let i = 0; i < funarr.length; i++) {
        password += funarr[i];
    }
    // remaining addition
    for (let i = 0; i < passwordlength - funarr.length; i++) {
        let randomin = generatetheinteger(0, funarr.length);
        console.log(randomin)
        password += funarr[randomin] ;
    }
    // shuffle pass
    password = shufflepassword(Array.from(password));
    // display pass
    passdis.value=password
    calcustrength();
})

