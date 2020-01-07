function Case(x,y,j){
    const VIDE=-1;
    const ORDI =0;
    const JOUEUR=1;
    
    this.posx=x;
    this.posy=y;
    this.joueur=j;
    
    //Les methodes
    this.setJoueur=function(j){
        this.joueur=j;
    }
    this.getJoueur=function(){
        return this.joueur;
    }
    this.setPosx=function(j){
        this.posx=j;
    }
    this.getPosx=function(){
        return (this.posx);
    }
    this.setPosy=function(j){
        this.posy=j;
    }
    this.getPosy=function(){
        return this.posy;
    }
    this.affichermoi=function(){
        var X=this.getPosx();
        var Y=this.getPosy();
        switch(this.getJoueur()){
            case 0:
                draw("camilla",X,Y);
                break;
                
            case 1:
                draw("loki",X,Y);
                break;
                
            default:
                break;
        }
    }
    
}