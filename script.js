const wrapper = document.querySelector(".wrapper"),// calling and declaring the complete wrapper
qrInput = wrapper.querySelector(".form input"), // declaring the input but within the wrapper
generateBtn = wrapper.querySelector(".form button"), //declaring the button inside the wrapper
qrImage = wrapper.querySelector(".qr-code img"); //declaring the qr image image the wrapper

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value; //declaring a qr value and assigning the value from the input
    if(!qrValue) return; //if the input is empty, return from here
    generateBtn.innerText = "Generating QR Code..."
    qrImage.src =  `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`; //assigning the value from the input to our qr api and then making it our display image
    qrImage.addEventListener("load", () => {
        wrapper.classList.add("active"); // when the button is click, we add another class active to our wrapper
        generateBtn.innerText = "Generate QR Code."
    });
});

qrInput.addEventListener("keyup", () =>{
    if(!qrInput.value){
        wrapper.classList.remove("active");
    }
});