//define instrument class
class Instrument{
    constructor(family, loudness, verb){
        this.family=family;
        this.loudness=loudness;
        this.verb=verb;
    }
    play(){
        console.log(this.family + " "+this.verb+" at "+this.loudness);
    }
}
//define woodwind class
class Woodwind extends Instrument{
    constructor(loudness){
        super("Woodwind", loudness, "blows");
    }
}
//define strings class
class Strings extends Instrument{
    constructor(loudness){
        super("Strings", loudness, "pluck");
    }
}
//define percussion class
class Percussion extends Instrument{
    constructor(loudness){
        super("Percussion", loudness, "beats");
    }
}
//place instruments in array
instruments = [new Percussion("high volume"), new Woodwind("a whisper level"), new Strings("medium volume")];
//play all instruments
instruments.forEach(instrument => {
    instrument.play(); 
});
