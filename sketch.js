var categories = [];
var categoryName = ["Datavisualisation", "Game", "Generative", "Writing", "Rhetorics", "Cartography"];

var projects = [];
var projectsName = ["Jeux Avignon", "Déjà Vu?!", "Pénombre"];

var firstRow = true;

var draggableObjects = document.getElementsByClassName("draggable");
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

      
}, 1000);
    

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
    projects[i].draw();
    projects[i].update();
    // projects[i].update(projects[i].offsetLeft, projects[i].offsetTop);
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

  }

  Project.prototype.update = function() {

    // this.posX = _posX;
    // this.posY = _posY;

    for (var i=0; i<this.relatedTo.length; i++) {
      for (var j=0; j<categoryName.length; j++) {

        if (this.relatedTo[i] == categories[j].name) {
          // line(this.posNumberX, this.posNumberY, categories[j].posX, categories[j].posY);
          ellipse(this.posNumberX, this.posNumberY, 3,3);
          // line(this.posNumberX, this.posNumberY, categories[j].posX, categories[j].posY);

          var c=document.getElementById("defaultCanvas0");
          var ctx=c.getContext("2d");
          ctx.beginPath();
          ctx.moveTo(this.posNumberX,this.posNumberY);
          ctx.lineTo(categories[j].posX,categories[j].posY);
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
          // ellipse(this.posNumberX, this.posNumberY, 3,3);
          // line(this.posNumberX, this.posNumberY, categories[j].posX, categories[j].posY);
          
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