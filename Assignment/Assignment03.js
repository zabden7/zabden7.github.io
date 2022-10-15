
 function temperatureConvert() {
    let temperature = parseFloat(document.getElementById("tempFarenheit").value);
    document.getElementById("tempCelsius").value = ((temperature - 32) * 5/9);
}

// <!--- Took idea from w3resources--->
function GCD() {

let x = parseInt(document.getElementById("number1").value);
let y = parseInt(document.getElementById("number2").value);

if(typeof(x) != "number" || typeof(y) != "number") {
    document.getElementById("gcd").value;
    return;
}
x = Math.abs(x);
y = Math.abs(y);

while(y) {
    let t = y;
    y = x % y;
    x = t;
    }
document.getElementById("gcd").value = x;
}


function total(){
    let total= 0
    TotalNum = parseInt(document.getElementById("TotalNum").value) 
    while(TotalNum){
        console.log(total)
        total += TotalNum % 10;
        TotalNum = Math.floor(TotalNum / 10)

   }
    document.getElementById("TotalNum").value = total
}






























  
