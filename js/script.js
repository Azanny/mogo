let alreadyAnimated=false;
function animateIfVisible(elem) {
    window.addEventListener("scroll",()=>{
    const rect = elem.getBoundingClientRect();
    let elemTop = rect.top,
        elemBottom = rect.bottom,
        isVisible = elemTop < window.innerHeight && elemBottom >= 0;
       if(isVisible && !alreadyAnimated){
           counter();
           alreadyAnimated=true;
        }
    })
       
}

function animateValue(id, start, end, duration) {
    let range=end-start,
        current=start,
        increment=end>start?1:-1,
        stepTime=Math.abs(Math.floor(duration/range)),
        timer=setInterval(function() {
        current+=increment;
        id.innerText=current;
        if (current===end) {
            clearInterval(timer);
        }
    }, stepTime);
}

function counter(){
    const numbers=document.querySelectorAll(".number");
        for(let i=0;i<numbers.length;i++){
            let curNumber=numbers[i];
            let  curMax=parseInt(numbers[i].dataset.maxnumber)
            animateValue(curNumber,0,curMax,1500)
        }
}


function accordion(){
    const accLis=document.querySelectorAll(".accLi");
    const accHeaders=document.querySelectorAll(".accHeader");
    rememberChoice(accLis);
    for(let i=0;i<accLis.length;i++){
        accHeaders[i].addEventListener('click',()=>{
            localStorage.setItem("prevIndex",i.toString())
            for (j=0;j<accLis.length;j++) {
                if(i!=j){
                    if (accLis[j].classList.contains("open")) {
                    accLis[j].classList.toggle("open");
                }}
            }
        accLis[i].classList.toggle("open");
            
        })
    }
}

function rememberChoice(arr){
     let prevIndex=+localStorage.getItem("prevIndex"); 
     arr[prevIndex].classList.toggle("open");
}


function verifyEmail(){
    const regex=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const emailInput=document.querySelector("#email");
    const wrongMsg=document.querySelector("#error");
    emailInput.addEventListener('blur',()=>{
        if(!emailInput.value.match(regex)){
            emailInput.classList.add("wrong");
            wrongMsg.classList.add("visible");
            console.log

        }
        else{
            emailInput.classList.remove("wrong");
            wrongMsg.classList.remove("visible");

        }
    })
}



(()=>{
    const numberSection=document.querySelector("#numbers");
    animateIfVisible(numberSection);
    accordion();
    verifyEmail();
})()