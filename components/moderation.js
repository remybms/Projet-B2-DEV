const fs = require('fs');

export function Moderation(message) {
    const contenuFichier = fs.readFileSync("/home/remybms/projet-b2-dev/components/moderation.txt", 'utf-8');

    var motsPhrase = message.toLowerCase().split(/\s+/);
    var motsFichier = contenuFichier.toLowerCase().split(/\s+/);
    var isSame = false

    motsPhrase.forEach(function(motPhrase) {
        motsFichier.forEach(function(motFichier) {
            if (motPhrase === motFichier) {
                isSame = true
            }
        });
    });
    if(isSame){
        return "Not good"
    } else {
        return "Good";
    }
    
}