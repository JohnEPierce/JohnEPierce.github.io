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
  /* var fontSize = count => {
    // Define min and max font sizes in rem
    const minSize = 1;
    const maxSize = 1.3 ;
    
    // Get min and max counts from classCounts
    const counts = Object.values(classCounts);
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);
    
    // Calculate font size using linear interpolation
    const size = minSize + (count - minCount) * (maxSize - minSize) / (maxCount - minCount);
    
    return size;
  }; */
  
  
  //exclude toplinks
  var excludeToplinks = [];
  // for(i=0;i<toplinks.length;i++){
  //       excludeToplinks.push(toplinks[i].id);
  //   }
    excludeToplinks.push("aphasia", "technology", "multimodal", "Presentations", "Publications");

    document.querySelectorAll('.wordcloud span').forEach(span => {
      // Delete if in exclude list
    if(excludeToplinks.includes(span.className)){
        span.remove();
    }

    // Get the count of the class from the classCounts object
    const count = classCounts[span.className];

    // Set the font size of the span element based on the count
    // span.style.fontSize = `${fontSize(count)}rem`;
});

//sort by frequency
const spanElements = wordcloud.querySelectorAll('span');

const sortedSpans = Array.from(spanElements).sort((a, b) => {
  const countA = classCounts[a.className];
  const countB = classCounts[b.className];
  // Sort the elements in descending order by frequency
  return countB - countA;
});

// Append the sorted span elements to the wordcloud div
sortedSpans.forEach(span => wordcloud.appendChild(span));

// Remove wordcloud spans for topics that appear less than twice
sortedSpans.forEach(span => {
  const count = classCounts[span.className];
  if (count < 2) {
    span.remove();
  }
});


//Remove underscores
spanElements.forEach(item => {item.innerHTML = item.innerHTML.replace(/_/g, " ");});

// Make wordclouds clickable - toggling
const hideCards = (event) => {
  let clickedElement = event.target.className;
  const allElements = document.querySelectorAll('.contentlinks div');
}
// const wordcloud = document.querySelectorAll('.toplink');
spanElements.forEach(function(element){
  element.addEventListener('click', function(){
    this.classList.toggle("focus");

    // Get all currently active span classes
    const activeTags = Array.from(spanElements)
      .filter(el => el.classList.contains("focus"))
      .map(el => Array.from(el.classList).find(c => c !== "focus"));

    // Loop through all content cards
    const allCards = document.querySelectorAll('.contentlinks > div');
    allCards.forEach(card => {
      const cardClasses = Array.from(card.classList);
      // Check if all activeTags are present in the card
      const shouldShow = activeTags.every(tag => cardClasses.includes(tag));
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});


//Random card height
var divs = document.querySelectorAll('.cardUpper');

for (var i = 0; i < divs.length; i++) {
    var height = Math.random() * 6 + 5;

    // Set the height of the div
    divs[i].style.height = height + 'rem';
}