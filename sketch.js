var categories = [];
var categoryName = ["Datavisualisation", "Game", "Generative", "Writing", "Rhetorics", "Cartography"];

var projects = [];
var projectsName = ["Jeux Avignon", "Déjà Vu?!", "Pénombre"];

var firstRow = true;

var draggableObjects = document.getElementsByClassName("draggable");
var itemProjects = document.getElementsByClassName("project");
var counter = 0;

function setup() {
  createCanvas(windowWidth,windowHeight);

  for (var i=0; i<categoryName.length; i++) {
    // on crée les catégories
    categories.push(new Category(
      i,
      categoryName[i],
      int(random(1000)),
      int(random(400))
      ));

    // on affiche les catégories
    categories[i].create();
  }


  var jsonData = JSON.parse(data);


// on affiche les projets
  for (var j=0; j<jsonData.projects.length; j++) {

    projects.push(new Project(
      j,
      jsonData.projects[j].name, 
      jsonData.projects[j].year,
      jsonData.projects[j].shortDescription, 
      jsonData.projects[j].description,
      int(random(1000)), 
      int(random(400)),
      jsonData.projects[j].relatedTo,
      jsonData.projects[j].picture
      ));
    // projects[j].setup();
    projects[j].create();
    // projects[j].draw();
    // projects[j].draw();
  }

 draggable();

}


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


function mouseClicked() {
setInterval(function() {

  

      for (var i=0; i<projects.length; i++) {
        // console.log("hello");
        projects[i].moveALittleBit(projects[i].posX, projects[i].posY);
      }

      
}, 2000);
}


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
          // document.getElementById("project-" + i).style.borderBotton = "3px solid white";
          document.getElementById("project-" + i).style.textTransform = "uppercase";
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
            draggableObjects[n].style.textTransform = "uppercase";
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
    draggableObjects[i].style.background = "";
    draggableObjects[i].style.textTransform= "";
  }
}


function draw() {

  background(0);

for (var i=0; i<projects.length; i++) {
    // projects[i].draw();
    // projects[i].update();
    // console.log("project[i].offsetLeft" + document.getElementById('project-' + i).offsetLeft);
    projects[i].update(document.getElementById('project-' + i).offsetLeft, document.getElementById('project-' + i).offsetTop);

}
// if (counter == 0) {
//   // moveALittle();

// }

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
      document.addEventListener('click', displayProject);
      }


      var image = document.getElementById("bloc-image");

      for (var k=0; k<image.length; k++) {
        document.addEventListener('click', closeProject);
      }

}

function closeProjet() {
  
}

function displayProject(e) {

// pour trouver le numéro du projet on slice son id qui est du type "project-x" pour ne récupérer que x
var id = (e.target.id).slice(8);
// id = parseInt(id);

var image = document.getElementById("bloc-image");
var blocTexte = document.getElementById("bloc-texte");

console.log(projects[0].picture)

// ajoute l'image
image.style.backgroundImage = "url(img/" + projects[id].picture + ")";
image.style.pointerEvents = "auto";
image.style.opacity = 1;

// ajoute le texte
blocTexte.getElementsByTagName("h4")[0].innerHTML = projects[id].name;
blocTexte.getElementsByTagName("p")[0].innerHTML = projects[id].year;
blocTexte.getElementsByTagName("p")[1].innerHTML = projects[id].description;


}


/*** Class Project() ***/

function Project(_id, _name, _year, _shortDescr, _descr, _posX, _posY, _relatedTo, _picture) {

  // Project.prototype.setup = function() {
  this.name = _name;
  this.year = _year;
  this.shortDescription = _shortDescr;
  this.description = _descr;
  this.posX = _posX;
  this.posY = _posY;
  // this.pictures = [];
  // this.relatedTo = [];
  this.relatedTo = _relatedTo;
  this.id = _id;
  this.picture = _picture;

  var displacement = 23;

 
 // crée les éléments et les rajoutend au DOM
  Project.prototype.create = function() {

    var newBalise = document.createElement('h4');
    newBalise.setAttribute('class', 'draggable project');
    newBalise.setAttribute('id', "project-" + this.id);
    newBalise.style.left = this.posX;
    newBalise.style.top = this.posY;
    newBalise.innerHTML = this.name;
    var firstElement = document.getElementById("first");
    var contentElement = document.getElementById("content");
    document.body.insertBefore(newBalise,firstElement); 

    // définit le style du trait
    fill(255);
    stroke(255,255,255);
    strokeWeight(0.2);

  }

  // trace les lignes
  Project.prototype.update = function(_posX, _posY) {

    this.posX = _posX;
    this.posY = _posY;

    for (var i=0; i<this.relatedTo.length; i++) {
      for (var j=0; j<categoryName.length; j++) {

        if (this.relatedTo[i] == categories[j].name) {
          // line(this.posNumberX, this.posNumberY, categories[j].posX, categories[j].posY);
          ellipse(this.posX, this.posY, 3,3);
          // line(this.posNumberX, this.posNumberY, categories[j].posX, categories[j].posY);

          // on récupère la position des catégories avec offsetLeft et offsetTop 
          // cela permet d'avoir la position réelle même quand l'élément est draggé ou en transition
          catPosX = document.getElementById("category-" + j).offsetLeft;
          catPosY = document.getElementById("category-" + j).offsetTop;

          var c=document.getElementById("defaultCanvas0");
          var ctx=c.getContext("2d");
          ctx.beginPath();
          ctx.moveTo(this.posX,this.posY);
          ctx.lineTo(catPosX,catPosY);
          ctx.stroke();
          
        }
      }
    }


  }

  Project.prototype.moveALittleBit = function(_posX, _posY) {

    this.posX = _posX;
    this.posY = _posY;

    this.posX = parseInt(this.posX);
    this.posY = parseInt(this.posY);

    // console.log("this.posX " + this.posX);
    // console.log("typeof" + typeof this.posX);

    this.posX+=int(random(-displacement,displacement));
    this.posY+=int(random(-displacement,displacement));

    if (this.posX < 2000 && this.posY < 1000) {
      // comme le style va direct en inline on ne met pas le "px"
      document.getElementById('project-' + this.id).style.left = this.posX;
      document.getElementById('project-' + this.id).style.top = this.posY;
    }

  
  }




}


/*** Class Category() ***/

function Category(_id, _name, _posX, _posY) {
  this.name = _name;
  this.posX = _posX;
  this.posY = _posY;
  this.id = _id;

  Category.prototype.create = function() {
    var newBalise = document.createElement('h3');
    newBalise.setAttribute('class', 'draggable category');
    newBalise.setAttribute('id', 'category-' + this.id);
    newBalise.style.left = this.posX;
    newBalise.style.top = this.posY;
    newBalise.innerHTML = this.name;
    var firstElement = document.getElementById("first");
    var contentElement = document.getElementById("content");
    document.body.insertBefore(newBalise,firstElement);
  }



}