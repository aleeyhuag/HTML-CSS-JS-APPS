
const container = document.querySelector(".container"),
form = container.querySelector("form"),
fileInput = container.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = container.querySelector(".close"),
copyBtn = container.querySelector(".copy");

function fetchRequest(formData, file){
    infoText.innerText = "Scanning QR Code...";
    // sending post request to gr server api with passing
    // form data as body and getting response from it
    fetch("https://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data; //removing all other return elements, leaving the data only
        infoText.innerText = result ? "Upload QR code to Scan" : "Couldn't scan qr code";// validating qr code
        if(!result) return;
        container.querySelector("textarea").innerText = result; // assigning our data to our text area
        form.querySelector("img").src = URL.createObjectURL(file); //display the qrcode uploaded by the user
        container.classList.add("active");
    }).catch(() => {
        infoText.innerText = "Couldn't scan qr code";
    });
}

//first take user input before writing the function above
fileInput.addEventListener("change", e => {
    let file = e.target.files[0]; //getting user selected file
    if(!file) return; //return from here if file is not empty
    let formData = new FormData(); // creating a new FormData object
    formData.append("file", file); //adding selected file to formData
    fetchRequest(formData, file); // we passed our qrcode img to display when the result has been processed
}); 

copyBtn.addEventListener("click", () => { //copy return text result to clipboard
    let text = container.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInput.click()); // making the whole form to be clicked as input file

closeBtn.addEventListener("click", () => container.classList.remove("active")); // close button