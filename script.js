// Variable initialization
const mySlider = document.querySelector(".slider");
const mySlides = document.querySelectorAll(".slide");
const backBtn = document.getElementById("goback-btn");
const nextBtn = document.getElementById("next-btn");
const stepNums = document.querySelectorAll(".step-num");

const mobileNum = document.getElementById("mobile");
const mobileError = document.querySelector(".mobile-error");
const swicthIcon = document.querySelector(".switch-icon");
const monthlySub = document.querySelector(".monthly");
const yearlySub = document.querySelector(".yearly");

const priceCards = document.querySelectorAll(".price-card");
const price = document.querySelectorAll('.price');
const free = document.querySelectorAll('.free');
const myServices = document.querySelectorAll(".my-services");
const myCheckbox = document.querySelectorAll(".chekbox");
const servicePrice = document.querySelectorAll(".service-price")

const planType = document.querySelector('.plan-type');
const planDuration = document.querySelector(".mebership")
const planPrice = document.querySelector(".plan-price")
const serviceType = document.querySelector(".service-type")
const totalPrice = document.querySelector('.total-price');
const changePlan = document.querySelector('.change-plan');
const sliderButtons = document.querySelector('.slider-buttons');

let slideIdx = 0;
const mobileRegex = /^[0-9]{10}$/;
let serviceNum = 0;
let lastAddedChild = [];

// move slider
const moveSlider = (offset) => {
    initializeSlider(slideIdx += offset);
}

// slider initialization
const initializeSlider = (idx) => {

    if(idx < 0){
        idx = mySlides.length -1;
    }else if(idx >= mySlides.length){
        idx = 0;
    }
    
    const slideWidth = mySlides[0].offsetWidth;
    mySlider.style.transform = `translateX(-${idx * slideWidth}px)`;
    slideIdx = idx;

    let lastIndex = stepNums.length;

    stepNums.forEach((step, index) => {
        if(index === 0 || index === 1 || index == 2 || index == 3){
            step.classList.remove('active');
        }
    });
    
    if(idx == 0 || idx == 1 || idx == 2 || idx == 3){
        stepNums[idx].classList.add('active');
    }

    if(slideIdx == 0){
        backBtn.style.visibility = "hidden";
    }else if(slideIdx == 1 || slideIdx == 2 || slideIdx == 3){
        backBtn.style.visibility = "visible";
    }

    if(slideIdx === 3){
        getAllPrice();
        nextBtn.textContent = "Confirm";
        nextBtn.style.backgroundColor = "hsl(243, 100%, 62%)";
    }else if(slideIdx === 2 || slideIdx === 1 || slideIdx === 0){
        nextBtn.textContent = "Next Step";
        nextBtn.style.backgroundColor = "";
    }

    if(slideIdx === 4){
        sliderButtons.style.display = "none";
    }
    
}

// IS valid mobile num
const validMobile = (num) => {
    return mobileRegex.test(num);
}

// Price card event
priceCards.forEach((ele, idx) => {

    ele.addEventListener('click', (e) => {
        e.preventDefault();

        priceCards.forEach((ele) => ele.classList.remove('active'));
        ele.classList.add('active');
        
        // Switch icon reference
        if(planDuration.childNodes[1].classList.contains('active')){
            planType.innerText = ele.childNodes[3].children[0].innerText + ' (Monthly)';
            planPrice.innerText = ele.childNodes[3].children[1].innerText;
            totalPrice.textContent = ele.childNodes[3].children[1].innerText;
        }
        // If yearly plan
        if(planDuration.childNodes[5].classList.contains('active')){
            planType.innerText = ele.childNodes[3].children[0].innerText + ' (Yearly)';
            planPrice.innerText = ele.childNodes[3].children[1].innerText;
            totalPrice.textContent = ele.childNodes[3].children[1].innerText;
        }
    });
});

// Swicth price event
swicthIcon.addEventListener("click", () => {
    swicthIcon.classList.toggle('active');
    monthlySub.classList.toggle('active');
    yearlySub.classList.toggle('active');

    price.forEach((ele) => ele.classList.toggle('yearly-price'));
    free.forEach((ele) => ele.classList.toggle('active'));
    servicePrice.forEach((ele) => ele.classList.toggle('service-yearly'));

    changePrice();

    priceCards.forEach((ele, idx) => {
        if(ele.classList.contains('active')){
            // If monthly plan
            if(planDuration.childNodes[1].classList.contains('active')){
                planType.innerText = priceCards[idx].childNodes[3].children[0].innerText + ' (Monthly)';
                planPrice.textContent = priceCards[idx].childNodes[3].children[1].innerText;
                totalPrice.textContent = priceCards[idx].childNodes[3].children[1].innerText;
            }
            // If yearly plan
            if(planDuration.childNodes[5].classList.contains('active')){
                planType.innerText = priceCards[idx].childNodes[3].children[0].innerText + ' (Yearly)';
                planPrice.textContent = priceCards[idx].childNodes[3].children[1].innerText;
                totalPrice.textContent = priceCards[idx].childNodes[3].children[1].innerText;
            }
        }
    });
    
});

// change price
const changePrice = () => {
    const monthlyArr = ["$9/mo", "$12/mo", "$15/mo"];
    const yearlyArr = ["$90/yr", "$120/yr", "$150/yr"];
    const monthlyService = ["+$1/mo", "+$2/mo", "+$2/mo"];
    const yearlyService = ["+$10/yr", "+$20/yr", "+$20/yr"];
    const yearlyPrice = document.querySelectorAll('.yearly-price');

    if(!yearlyPrice.length){
        price.forEach((ele, idx) => ele.textContent = monthlyArr[idx]);
        servicePrice.forEach((ele, idx) => ele.textContent = monthlyService[idx]);
    }else{
        yearlyPrice.forEach((ele, idx) => ele.textContent = yearlyArr[idx]);
        servicePrice.forEach((ele, idx) => ele.textContent = yearlyService[idx]);
    }

    // Service elements 3 slide
    myServices.forEach((ele, idx) => {
        if(ele.classList.contains('active')){
            let priceText = ele.childNodes[5].innerText;
            let priceArr = [];
            priceArr.push(priceText)

            const serviceTypePrice = document.querySelectorAll(".service-type-price");
            let servicePrice = serviceTypePrice[idx];
            servicePrice.textContent = priceArr[0];
        }
    })

}

// Services
myServices.forEach((ele, idx) => {
    ele.addEventListener('click', (e) => {
        e.preventDefault();

        ele.classList.toggle('active');
        ele.childNodes[1].classList.toggle('active');
        ele.childNodes[1].children[0].style.visibility = "visible";

        if(ele.classList.contains('active') && serviceType.childElementCount < 3){
            const serviceText = ele.childNodes[3].children[0].innerText;
            const servicePrice = ele.childNodes[5].innerText;

            let newService = document.createElement('p');
            let newServicePrice = document.createElement('span');
            newService.className = 'service-type-text';
            newService.textContent = serviceText;

            newServicePrice.className = 'service-type-price';
            newServicePrice.id = (serviceNum = serviceNum +1);
            newServicePrice.textContent = servicePrice;
            newService.appendChild(newServicePrice);

            serviceType.appendChild(newService);
            lastAddedChild.push(newService);
        }else{
            serviceType.removeChild(lastAddedChild[idx]);
        }

    });
});

const getAllPrice = () => {
    const planPrice = document.querySelector(".plan-price");
    const servicePriceList = document.querySelectorAll(".service-type-price");
    const totalPrice = document.querySelector('.total-price');
    const mebership = document.querySelector('.mebership');
    const planType = mebership.childNodes[3];

    let myPlanPrice = Number(planPrice.innerText.match(/\d+/g).map(Number));
    let myTotalPrice = null;
    let plan = "";


    if(servicePriceList[0] !== undefined){
        myTotalPrice = Number(servicePriceList[0].innerText.match(/\d+/g).map(Number));
    }
    if(servicePriceList[1] !== undefined){
        myTotalPrice += Number(servicePriceList[1].innerText.match(/\d+/g).map(Number));
    }
    if(servicePriceList[2] !== undefined){
        myTotalPrice += Number(servicePriceList[2].innerText.match(/\d+/g).map(Number));
    }

    if(planType.classList.contains('active')){
        plan = "/yr";
    }else{
        plan = "/mo";
    }

    if(myTotalPrice !== null){
        totalPrice.innerText = "+$" + (myPlanPrice + myTotalPrice) + plan;
    }else{
        totalPrice.innerText = "+$" + myPlanPrice + plan;
    }
    
    
}

changePlan.addEventListener("click", () => swicthIcon.click());

// Back button event
backBtn.addEventListener("click", () => {
    moveSlider(-1);
});

// Next button event
nextBtn.addEventListener("click", () => {
    const isValidMobile = validMobile(mobileNum.value);
    
    if(isValidMobile){
        mobileError.style.visibility = "hidden";
        mobileNum.style.borderColor = "";
        moveSlider(1);
             
    }else{
        mobileError.style.visibility = "visible";
        mobileNum.style.borderColor = "hsl(354, 84%, 57%)";
    }
});