var categories = [];
var categoryName = ["Datavisualisation", "Game", "Generative", "Writing", "Rhetorics", "Cartography"];

var projects = [];
var projectsName = ["Jeux Avignon", "Déjà Vu?!", "Pénombre"];

var firstRow = true;

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
      jsonData.projects[j].shortDescription, 
      int(random(1000)), 
      int(random(400)),
      jsonData.projects[j].relatedTo
      ));
    // projects[j].setup();
    projects[j].create();
    // projects[j].draw();
  }

 draggable();

}


// change la disposition des éléments
function moveEverything() {

  // récupère tous les éléments draggable donc tout les éléments
  var draggableObjects = document.getElementsByClassName("draggable");

  // leur attribue une nouvelle position aléatoire
  for (var i=0; i<draggableObjects.length; i++) {
    var posX = int(random(windowWidth));
    var posY = int(random(windowHeight));
    draggableObjects[i].style.top = posY + "px";
    draggableObjects[i].style.left = posX + "px";
  }
}


function moveALittle() {
  for (var i=0; i<projects.length; i++) {
    projects[i].moveALittleBit();
  }
}

function metEnExergue() {
  
}

function draw() {

  background(0);

for (var i=0; i<projects.length; i++) {
    projects[i].draw();
    projects[i].moveALittleBit();
}


}


// rend les éléments draggable avec jquery ui
function draggable() {
    $( document ).ready(function() {
    $( ".draggable" ).draggable();
  } );

}


/*** Class Project() ***/

function Project(_id, _name, _descr, _posX, _posY, _relatedTo) {

  // Project.prototype.setup = function() {
  this.name = _name;
  this.descr = _descr;
  this.posX = _posX;
  this.posY = _posY;
  // this.pictures = [];
  // this.relatedTo = [];
  this.relatedTo = _relatedTo;
  this.id = _id;

 
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

  }

  Project.prototype.moveALittleBit = function() {
    // this.posNumberX+=random(-2,2);
    // this.posNumberY+=random(-2,2);
  }

// Trace les lignes entre les catégories et les projets
  Project.prototype.draw = function() {

    // récupère la position des éléments dans le DOM grâce à l'id qui leur a été donné
    // car ils peuvent être draggués avec jquery-ui draggable
      this.posX = document.getElementById('project-' + this.id).style.left;
      this.posY = document.getElementById('project-' + this.id).style.top;


    // les variables reçues par document.getElementById('project-' + this.id).style.left sont de type "150px"
    // or p5 peut uniquement appliquer une valeur comme "150"
    // donc on enlève le "px"
    this.posNumberX = (this.posX).replace('px', '');
    this.posNumberY = (this.posY).replace('px', '');

    fill(255);
    stroke(255,255,255);
    strokeWeight(0.2);

    for (var i=0; i<this.relatedTo.length; i++) {
      for (var j=0; j<categoryName.length; j++) {

        // On fait la même chose pour les catégories
        categories[j].posX = document.getElementById('category-' + j).style.left;
        categories[j].posY = document.getElementById('category-' + j).style.top;

        categories[j].posX = (categories[j].posX).replace('px', '');
        categories[j].posY = (categories[j].posY).replace('px', '');

        if (this.relatedTo[i] == categories[j].name) {
          // line(this.posNumberX, this.posNumberY, categories[j].posX, categories[j].posY);
          ellipse(this.posNumberX, this.posNumberY, 3,3);
          line(this.posNumberX, this.posNumberY, categories[j].posX, categories[j].posY);
          
        }
      }
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