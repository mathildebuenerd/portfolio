/**
 * Created by mathi on 29/10/2017.
 */

// change la disposition des éléments
function moveEverything() {

    // récupère tous les éléments draggable donc tout les éléments

    // leur attribue une nouvelle position aléatoire
    for (var i=0; i<draggableObjects.length; i++) {
        var posX = int(random(windowWidth));
        var posY = int(random(windowHeight));
        draggableObjects[i].style.top = posY + "px";
        draggableObjects[i].style.left = posX + "px";
    }
}

// permet d'identifier les projets associés à une catégorie et les catégories associées à un proje
function spotlight(e) {

    // Si on survole une catégorie, on applique le spotlight sur cette catégorie + les projects qui sont relatedTo cette dernière

    // on regarde si l'élément survolé a la class "category"
    if ((e.target.className).search("category") != -1)  {
        // on lui applique le spotlight
        // document.getElementById(e.target.id).style.color = "black";
        // document.getElementById(e.target.id).style.borderBotton = "3px solid white";
        document.getElementById(e.target.id).style.textTransform = "uppercase";

        // on regarde pour chaque project si l'une des catégories relatives est celle survolée
        for (var i=0; i<projects.length; i++) {
            for (var j=0; j<projects[i].relatedTo.length; j++) {
                // si c'est le cas on applique le spotlight
                if ((projects[i].relatedTo[j]).search(e.target.textContent) != -1) {
                    // document.getElementById("project-" + i).style.color = "black";
                    document.getElementById("project-" + i).style.borderBottom = "3px solid #0ff";
                    // document.getElementById("project-" + i).style.backgroundColor = "#00f";
                    document.getElementById("project-" + i).style.color = "#0ff";

                }
            }
        }
    }



    // Si on survole un projet, on applique le spotlight sur ce projet + sur les catégories relatives

    // on regarde si l'élément survolé a la class "project"
    if ((e.target.className).search("project") != -1)  {
        // on lui applique le spotlight
        // document.getElementById(e.target.id).style.color = "black";
        // document.getElementById(e.target.id).style.borderBotton = "3px solid white";
        document.getElementById(e.target.id).style.textTransform = "uppercase";

        // on cherche le numéro du projet correspondant à celui survolé
        for (var k=0; k<projects.length; k++) {
            if(projects[k].name == e.target.textContent) {

                // on regarde combien de catégories sont associées à ce projet
                for (var m=0; m<projects[k].relatedTo.length; m++) {
                    for (var n=0; n<draggableObjects.length; n++) {

                        // on compare le contenu des catégories dans le DOM avec les catégories associées au projet dans la class Project
                        if (draggableObjects[n].textContent == projects[k].relatedTo[m]) {
                            draggableObjects[n].style.background = "linear-gradient(to bottom right, rgba(255,0,255,0.6), rgba(0,0,255,0.6))";
                            draggableObjects[n].style.color = "white";
                            // draggableObjects[n].style.borderColor = "black";
                        }
                    }
                }

            }
        }
    }


}

function turnOffSpotlight() {
    // enlève les attributs style ajoutés par spotlight
    // on ne peut pas utiliser removeAttribute à cause des positions absolute en inline
    for (var i=0; i<draggableObjects.length; i++) {
        draggableObjects[i].style.color = "";
        draggableObjects[i].style.borderColor = "";
        draggableObjects[i].style.background = "";
        draggableObjects[i].style.textTransform= "";
        draggableObjects[i].style.borderBottom = "";
    }
}


function draw() {

    if (window.innerWidth > 768) {

        background(0,0,0);

        for (var i=0; i<projects.length; i++) {
            // projects[i].draw();
            // projects[i].update();
            // console.log("project[i].offsetLeft" + document.getElementById('project-' + i).offsetLeft);
            projects[i].update(document.getElementById('project-' + i).offsetLeft, document.getElementById('project-' + i).offsetTop);
        }

        halo.style.left = mouseX - 40;
        halo.style.top = mouseY - 40;

        if (isDescrActive) {
            blocShortDescr.style.left = mouseX;
            blocShortDescr.style.top = mouseY + 30;
        }

        // console.log("je lis le draw");
    }



}


// rend les éléments draggable avec jquery ui
function draggable() {
    $( document ).ready(function() {
        $( ".draggable" ).draggable();
    } );

    // met un listener pour repérer quand on survole un élément
    for (var i=0; i<draggableObjects.length; i++) {
        document.addEventListener('mouseover', spotlight);
        document.addEventListener('mouseout', turnOffSpotlight);
    }

    // met un listener pour repérer quand on clique un projet
    // et ainsi afficher le contenu du projet
    for (var j=0; j<itemProjects.length; j++) {
        // console.log("displayProject listener added");
        itemProjects[j].addEventListener('mouseover', displayShortDescr);
        itemProjects[j].addEventListener('mouseout', hideShortDescr);
        itemProjects[j].addEventListener('click', displayProject);
    }


    var projectDisplayed = document.getElementById("bloc-image");
    projectDisplayed.addEventListener('click', closeProject);


}

function hideShortDescr() {
    isDescrActive = false;
    blocShortDescr.style.display = "none";
}

function displayShortDescr(e) {

    isDescrActive = true;

    var id = (e.target.id).slice(8);
    var blocShortDescr = document.getElementById('shortDescr');
    blocShortDescr.style.display = "block";
    blocShortDescr.innerHTML = projects[id].shortDescription;

}