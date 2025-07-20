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

//## Wordcloud
//filter dropdown
const filterButton = document.getElementById("filterButton");
const wordcloud = document.querySelector(".wordcloud");


//build wordcloud
var elements = Array.from(document.querySelector(".contentlinks").querySelectorAll(".contentlinks > div"));
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
  
  
  //exclude toplinks
  var excludeToplinks = [];
    excludeToplinks.push("aphasia", "technology", "multimodal", "Presentations", "Publications");

    document.querySelectorAll('.wordcloud span').forEach(span => {
      // Delete if in exclude list
    if(excludeToplinks.includes(span.className)){
        span.remove();
    }

    // Get the count of the class from the classCounts object
    const count = classCounts[span.className];
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

// Add 'other' span
const otherSpan = document.createElement('span');
otherSpan.classList.add('other');
otherSpan.textContent = 'Other work';
wordcloud.appendChild(otherSpan);

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
document.querySelectorAll('.wordcloud span').forEach(function(element){
  element.addEventListener('click', function(){
    this.classList.toggle("focus");
    updateCardVisibility();
  });
});

function updateCardVisibility() {
  const spans = document.querySelectorAll('.wordcloud span');
  const activeTags = Array.from(spans)
    .filter(el => el.classList.contains("focus"))
    .map(el => el.classList.contains("other") ? "other" : Array.from(el.classList).find(c => c !== "focus"));

  const allCards = Array.from(document.querySelectorAll('.contentlinks > div')).filter(div => !div.classList.contains('wordcloud'));
  allCards.forEach(card => {
    const cardClasses = Array.from(card.classList);
    let shouldShow;

    if (activeTags.includes("other")) {
      const allSpanClasses = Array.from(spans)
        .map(el => el.classList.contains("other") ? null : Array.from(el.classList).find(c => c !== "focus"))
        .filter(Boolean);
      shouldShow = allSpanClasses.every(tag => !cardClasses.includes(tag));
    } else {
      shouldShow = activeTags.every(tag => cardClasses.includes(tag));
    }

    card.classList.toggle("hidden", !shouldShow);
  });
}

filterButton.addEventListener('click', function () {
  filterButton.classList.toggle('filterOpen');
  wordcloud.classList.toggle('wordcloudOpen')
  if (!wordcloud.classList.contains('wordcloudOpen')) {
    document.querySelectorAll('.wordcloud span.focus').forEach(span => {
      span.classList.remove('focus');
    });
    updateCardVisibility();
  }
});



//Random card height
var divs = document.querySelectorAll('.cardUpper');

for (var i = 0; i < divs.length; i++) {
    var height = Math.random() * 6 + 5;

    // Set the height of the div
    divs[i].style.height = height + 'rem';
}