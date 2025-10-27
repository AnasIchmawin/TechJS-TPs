const inquirer = require('inquirer');
const https = require('https');

// Récupérer des données de l'API
function getAPI(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

// Créer un Pokémon
async function creerPokemon(nom) {
    const data = await getAPI(`https://pokeapi.co/api/v2/pokemon/${nom}`);
    
    const pokemon = {
        nom: data.name,
        pv: 200,
        pvMax: 200,
        attaque: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        vitesse: data.stats[5].base_stat,
        attaques: []
    };
    
    // Prendre 4 attaques au hasard
    const attaquesDispos = data.moves.sort(() => Math.random() - 0.5);
    
    for (let move of attaquesDispos) {
        if (pokemon.attaques.length >= 4) break;
        
        try {
            const info = await getAPI(move.move.url);
            if (info.power > 0) {
                pokemon.attaques.push({
                    nom: info.name,
                    puissance: info.power
                });
            }
        } catch (e) {}
    }
    
    // Ajouter une attaque par défaut si besoin
    while (pokemon.attaques.length < 4) {
        pokemon.attaques.push({ nom: 'charge', puissance: 40 });
    }
    
    return pokemon;
}

// Calculer les dégâts
function calculerDegats(attaquant, defenseur, attaque) {
    const base = attaque.puissance + attaquant.attaque - defenseur.defense / 2;
    const degats = Math.floor(base * (0.8 + Math.random() * 0.4));
    return Math.max(10, degats);
}

// Afficher les stats
function afficherStats(pokemon) {
    console.log(`\n${pokemon.nom.toUpperCase()}`);
    console.log(`PV: ${pokemon.pv}/${pokemon.pvMax} | ATK: ${pokemon.attaque} | DEF: ${pokemon.defense}`);
}

// Combat principal
async function combat(joueur, ennemi) {
    console.log('\n========== COMBAT ==========');
    console.log(`${joueur.nom.toUpperCase()} vs ${ennemi.nom.toUpperCase()}`);
    
    let tour = 1;
    
    while (joueur.pv > 0 && ennemi.pv > 0) {
        console.log(`\n--- Tour ${tour} ---`);
        afficherStats(joueur);
        afficherStats(ennemi);
        
        // Le joueur choisit son attaque
        const choix = joueur.attaques.map((a, i) => ({
            name: `${i + 1}. ${a.nom} (Puissance: ${a.puissance})`,
            value: i
        }));
        
        const reponse = await inquirer.prompt([{
            type: 'list',
            name: 'attaque',
            message: 'Votre attaque:',
            choices: choix
        }]);
        
        const attaqueJoueur = joueur.attaques[reponse.attaque];
        const attaqueEnnemi = ennemi.attaques[Math.floor(Math.random() * 4)];
        
        // Le plus rapide attaque en premier
        if (joueur.vitesse >= ennemi.vitesse) {
            // Joueur attaque
            const degats = calculerDegats(joueur, ennemi, attaqueJoueur);
            ennemi.pv = Math.max(0, ennemi.pv - degats);
            console.log(`\nVous utilisez ${attaqueJoueur.nom}! -${degats} PV`);
            
            await new Promise(r => setTimeout(r, 800));
            
            // Ennemi attaque si toujours vivant
            if (ennemi.pv > 0) {
                const degats2 = calculerDegats(ennemi, joueur, attaqueEnnemi);
                joueur.pv = Math.max(0, joueur.pv - degats2);
                console.log(`\n${ennemi.nom} utilise ${attaqueEnnemi.nom}! -${degats2} PV`);
            }
        } else {
            // Ennemi attaque
            const degats = calculerDegats(ennemi, joueur, attaqueEnnemi);
            joueur.pv = Math.max(0, joueur.pv - degats);
            console.log(`\n${ennemi.nom} utilise ${attaqueEnnemi.nom}! -${degats} PV`);
            
            await new Promise(r => setTimeout(r, 800));
            
            // Joueur attaque si toujours vivant
            if (joueur.pv > 0) {
                const degats2 = calculerDegats(joueur, ennemi, attaqueJoueur);
                ennemi.pv = Math.max(0, ennemi.pv - degats2);
                console.log(`\nVous utilisez ${attaqueJoueur.nom}! -${degats2} PV`);
            }
        }
        
        await new Promise(r => setTimeout(r, 1000));
        tour++;
    }
    
    console.log('\n============================');
    if (joueur.pv > 0) {
        console.log('VICTOIRE!');
    } else {
        console.log('DEFAITE...');
    }
    console.log('============================\n');
}

// Lancer le jeu
async function demarrer() {
    console.log('\n===== JEU POKEMON =====\n');
    
    try {
        console.log('Chargement...\n');
        const liste = await getAPI('https://pokeapi.co/api/v2/pokemon?limit=50');
        
        const choix = liste.results.map((p, i) => ({
            name: `${i + 1}. ${p.name}`,
            value: p.name
        }));
        
        const reponse = await inquirer.prompt([{ 
            type: 'list',
            name: 'pokemon',
            message: 'Choisissez votre Pokémon:',
            choices: choix,
            pageSize: 10
        }]);
        
        console.log(`\nVous avez choisi ${reponse.pokemon}!`);
        console.log('Chargement...');
        
        const joueur = await creerPokemon(reponse.pokemon);
        
        // Adversaire aléatoire
        const ennemiNom = liste.results[Math.floor(Math.random() * 50)].name;
        console.log(`\nAdversaire: ${ennemiNom}!`);
        console.log('Chargement...');
        
        const ennemi = await creerPokemon(ennemiNom);
        
        console.log('\nC\'est parti!');
        await new Promise(r => setTimeout(r, 1000));
        
        // Combat
        await combat(joueur, ennemi);
        
        // Rejouer?
        const encore = await inquirer.prompt([{
            type: 'confirm',
            name: 'oui',
            message: 'Rejouer?',
            default: true
        }]);
        
        if (encore.oui) {
            console.clear();
            await demarrer();
        } else {
            console.log('\nMerci d\'avoir joué!\n');
        }
        
    } catch (erreur) {
        console.error('Erreur:', erreur.message);
    }
}

demarrer();