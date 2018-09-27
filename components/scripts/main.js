var citySelector = document.getElementById('city');
var citySelectorLabel = document.getElementById('citylabel');

citySelector.addEventListener("click", showLabel); 

function showLabel() {
    citySelectorLabel.style.display = 'block';
}