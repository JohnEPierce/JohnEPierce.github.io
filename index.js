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

//Toplinks toggling
const hideElements = (event) => {
    let clickedElement = event.target.className;
    const allElements = document.querySelectorAll('.contentlinks div');
}
const toplinks = document.querySelectorAll('.toplink');
toplinks.forEach(function(element){
    element.addEventListener('click', function(){
        this.classList.toggle("focus");
        let toplinkCategory = element.id;
        toplinkCategoryMatches = document.querySelectorAll(`.contentlinks > div:not(.${toplinkCategory})`);
        toplinkCategoryMatches.forEach(function(div){
            div.classList.toggle("hidden")
        })
    })
})

//Wordcloud
var elements = Array.from(document.querySelector(".contentlinks").querySelectorAll(".contentlinks > div"));
const wordcloud = document.querySelector(".wordcloud");
var classCounts = elements.reduce((acc, curr) => {
    curr.classList.forEach(className => {
      if (className in acc) {
        acc[className]++;
      } else {
        acc[className] = 1;
        var span = document.createElement('span');
        span.classList.add(className);
        span.textContent = className;
        wordcloud.appendChild(span);
      }
    });
    return acc;
  }, {});

  //fontsize function
  var fontSize = count => count;
  
  
  //exclude toplinks
  var excludeToplinks = [];
  for(i=0;i<toplinks.length;i++){
        excludeToplinks.push(toplinks[i].id);
    }

    document.querySelectorAll('.wordcloud span').forEach(span => {
      // Delete if in exclude list
    if(excludeToplinks.includes(span.className)){
        span.remove();
    }

    // Get the count of the class from the classCounts object
    const count = classCounts[span.className];

    // Set the font size of the span element based on the count
    span.style.fontSize = `${fontSize(count)}rem`;
});

//sort by font size
const spanElements = wordcloud.querySelectorAll('span');

const sortedSpans = Array.from(spanElements).sort((a, b) => {
  const fontSizeA = parseInt(getComputedStyle(a).fontSize, 10);
  const fontSizeB = parseInt(getComputedStyle(b).fontSize, 10);
  // Sort the elements in descending order by font size
  if (fontSizeA > fontSizeB) {
    return -1;
  } else if (fontSizeA < fontSizeB) {
    return 1;
  } else {
    return 0;
  }
});

// Append the sorted span elements to the wordcloud div
sortedSpans.forEach(span => wordcloud.appendChild(span));

//Remove underscores
spanElements.forEach(item => {item.innerHTML = item.innerHTML.replace(/_/g, " ");});


//Random card height
var divs = document.querySelectorAll('.cardUpper');

for (var i = 0; i < divs.length; i++) {
    var height = Math.random() * 6 + 3;

    // Set the height of the div
    divs[i].style.height = height + 'rem';
}