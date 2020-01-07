var monCanvas;
var gc;
var maCase;
var tableau;
var jeJoue;
var Scorejs;
var Sia;
var Sj;
var CASEW;
var CASEH;

function start(){
    monCanvas=document.getElementById("carre");
    gc=monCanvas.getContext('2d');
    CASEH=monCanvas.height;
    CASEW=monCanvas.width/2;
    draw("camilla",0,0);
    draw("loki",CASEW,0);
}

function init(){
    alert("Bonjour chère joueur , certains osent dire que Camilla est supérieur à Loki dans Fire Emblem Heroes, votre devoir est de les combatre à un jeux de morpion: Bonne chance ");
    monCanvas.style.backgroundColor="#FFB6C1";
    Scorejs=document.getElementById("score");
    Sia=0;
    Sj=0;
    CASEH=monCanvas.height/3;
    CASEW=monCanvas.width/3;
    jeJoue=Math.floor(Math.random()*2);
    resetTab();
    if(jeJoue==0)
        faireJoueurOrdi();
    afficherPlateau();
    monCanvas.addEventListener("click",choisirCase,false);
    
}

function Score(){
    Scorejs.innerHTML=("Camilla:"+Sia+" / Loki "+Sj);
}

function resetTab(){
    tableau= [
        [-1,-1,-1],
        [-1,-1,-1],
        [-1,-1,-1]
    ]
    gc.clearRect(0,0,monCanvas.width,monCanvas.height);
    Score();
    if (jeJoue==0){
        alert("Nouvelle partie, l'IA commence");
        faireJoueurOrdi();
    }
    else
        alert("Nouvelle partie,le joueur commence");
    afficherPlateau();
}

function trouveAlignement(){
    console.log("fonction trouveAlignement");
    var value;
    for(var i=0;i<3;i++){
        if((tableau[0][i]==0 && tableau[1][i]==0 && tableau[2][i]==0)|| (tableau[i][0]==0 && tableau[i][1]==0 && tableau[i][2]==0)||(tableau[0][0]==0 && tableau[1][1]==0 && tableau[2][2]==0)||(tableau[2][0]==0 && tableau[1][1]==0 && tableau[0][2]==0)){
            console.log("IA alignement");
            i=3;
            value= 0;
        }
        else if((tableau[0][i]==1 && tableau[1][i]==1 && tableau[2][i]==1)|| (tableau[i][0]==1 && tableau[i][1]==1 && tableau[i][2]==1)||(tableau[0][0]==1 && tableau[1][1]==1 && tableau[2][2]==1)||(tableau[2][0]==1 && tableau[1][1]==1 && tableau[0][2]==1)){
            console.log("joueur alignement");
            i=3;
            value= 1;
        }
        else{
            console.log("Aucun alignement");
            value= -1;
        }
    }
    return value;
}

function gagnant(u){
    switch(u){
        case 0:
            alert("Vous êtes un bonobo, vous avez perdu contre une Camilla!");
            Sia++;
            resetTab();
            break;
        case 1:
            alert("Bravo , vous avez battut une camilla qui joue au pif (vive loki!)");
            Sj++;
            resetTab();
            break;
        default:
            alert("erreur vous avez cassé le jeu!");
            break;
    }
        
}

function faireJoueurOrdi(){
    do{
        var col=Math.floor(Math.random()*3);
        var lig=Math.floor(Math.random()*3);
    }
    while (tableau[lig][col]!=-1 && egalite()==false)
        tableau[lig][col]=jeJoue;
    changerJoueur();
    setTimeout(function(){afficherPlateau();},100);
}

function choisirCase(evt){
    var abs=evt.pageX;
    var ord=evt.pageY;
    abs-=monCanvas.offsetLeft;
    ord-=monCanvas.offsetTop;
    if (tableau[Math.floor(abs/200)][Math.floor(ord/200)]==-1){
        tableau[Math.floor(abs/200)][Math.floor(ord/200)]=jeJoue;
        changerJoueur();
        afficherPlateau();
    }
    console.log(abs+"/"+ord);
}

function changerJoueur(){
    if(jeJoue==0)
        jeJoue=1;
    else{
        jeJoue=0;
        if (trouveAlignement()==-1)
                faireJoueurOrdi();
    }
}

function egalite(){
    var egalite=false;
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if (tableau[i][j]!=-1)
                egalite=true;
            else{
                j=2;
                i=2;
                egalite=false;
            }
        }
    }
    console.log("egalite:"+egalite);
    return egalite;
}

function matchNul(){
    alert("Bon bas personne n'a gagné,au moins vous avez pas perdu (c'est faux c'est pas folichon comme performance)");
    resetTab();
    afficherPlateau();
}

function afficherPlateau(){
    gc.beginPath();
    gc.strokeStyle="black";
    for (var i=1;i<3;i++){
        gc.moveTo(i*monCanvas.width/3,0);
        gc.lineTo(i*monCanvas.width/3,monCanvas.height);
    }
    for (var i=1;i<3;i++){
        gc.moveTo(0,i*monCanvas.height/3);
        gc.lineTo(monCanvas.width,i*monCanvas.height/3);
    }
    gc.stroke();
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
                maCase= new Case((i*monCanvas.width/3),(j*monCanvas.height/3),tableau[i][j]);
                maCase.affichermoi();
        }
    }
    var ali=trouveAlignement();
    console.log("var ali:"+ali);
    setTimeout(function(){if (ali!=-1) gagnant(ali);else if (egalite()==true) matchNul();},50);
}

function draw(nom,x,y){
    var img= new Image();
    img.src="./img/"+nom+".png";
    img.onload=function(){
        gc.drawImage(img,x,y,CASEW,CASEH);
    }
}