/**
 * Created by mathi on 29/10/2017.
 */

function addPlusButton() {

    var plusButton = document.querySelector('#plusButton');
    plusButton.style.display = "block";
    plusButton.addEventListener('click', showInfosProjects);

}

function showInfosProjects() {

    if (window.innerWidth < 768) {
        var infosProjects = document.querySelector('#bloc-texte');
        infosProjects.style.display = "block";
        document.querySelector('#plusButton').style.display = "none";
    }

    document.querySelector('#plusButton').removeEventListener('click', showInfosProjects);

}

function hideInfosProjects() {

    var infosProjects = document.querySelector('#bloc-texte');
    infosProjects.style.display = "none";
    document.querySelector('#plusButton').style.display = "none";

}