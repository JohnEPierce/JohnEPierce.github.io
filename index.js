//Unscramble
let emaila = document.getElementById('emaila')
let href = emaila.getAttribute("href").substring(7);
function rot13(str) {
// Create an empty string to store the decrypted string
let decrypted = "";
for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
        charCode = (charCode - 65 + 13) % 26 + 65;
    } else if (charCode >= 97 && charCode <= 122) {
        charCode = (charCode - 97 + 13) % 26 + 97;
    }
decrypted += String.fromCharCode(charCode);
}
return decrypted;
}
let newhref = rot13(href);
emaila.setAttribute("href","mailto:"+newhref);

//Toplinks
const hideElements = (event) => {
    let clickedElement = event.target.className;
    const allElements = document.querySelectorAll('.contentlinks div');
}
const toplinks = document.querySelectorAll('.toplink');
toplinks.forEach(function(element){
    element.addEventListener('click', function(){
        this.classList.toggle("focus");
        let toplinkCategory = element.id;
        toplinkCategoryMatches = document.querySelectorAll(`.${toplinkCategory}`);
        toplinkCategoryMatches.forEach(function(div){
            div.classList.toggle("hidden")
        })
    })
})

