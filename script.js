function calculatePoints() {
    const tablets = parseInt(document.getElementById('tablets').value) || 0;
    const compasses = parseInt(document.getElementById('compasses').value) || 0;
    const gears = parseInt(document.getElementById('gears').value) || 0;
    const scienceGuild = document.getElementById('scienceGuild').checked;
    const military = parseInt(document.getElementById('military').value) || 0;
    const civil = parseInt(document.getElementById('civil').value) || 0;
    const commercial = parseInt(document.getElementById('commercial').value) || 0;
    const guilds = parseInt(document.getElementById('guilds').value) || 0;
    const wonders = parseInt(document.getElementById('wonders').value) || 0;
    const gold = parseInt(document.getElementById('gold').value) || 0;

    let sciencePoints = calculateSciencePoints(tablets, compasses, gears, scienceGuild);
    let totalPoints = sciencePoints + military + civil + commercial + guilds + wonders + Math.floor(gold / 3);

    document.getElementById('totalPoints').innerText = totalPoints;

    // Afficher la meilleure option de guilde si la guilde des scientifiques est cochée
    if (scienceGuild) {
        const bestOption = getBestScienceGuildOption(tablets, compasses, gears);
        document.getElementById('bestOption').style.display = 'block';
        document.getElementById('bestOptionIcon').src = `symbols/${bestOption}.png`;
        document.getElementById('bestOptionIcon').style.display = 'inline';
    } else {
        document.getElementById('bestOption').style.display = 'none';
    }
}

function calculateSciencePoints(tablets, compasses, gears, scienceGuild) {
    const minSet = Math.min(tablets, compasses, gears);
    const pointsFromSets = minSet * 7;
    const pointsFromTablets = tablets * tablets;
    const pointsFromCompasses = compasses * compasses;
    const pointsFromGears = gears * gears;

    let bestOptionPoints = 0;
    if (scienceGuild) {
        const bestOption = getBestScienceGuildOption(tablets, compasses, gears);
        if (bestOption === 'tablet') {
            bestOptionPoints = (tablets + 1) * (tablets + 1) - pointsFromTablets;
        } else if (bestOption === 'compass') {
            bestOptionPoints = (compasses + 1) * (compasses + 1) - pointsFromCompasses;
        } else if (bestOption === 'gear') {
            bestOptionPoints = (gears + 1) * (gears + 1) - pointsFromGears;
        }
    }

    return pointsFromSets + pointsFromTablets + pointsFromCompasses + pointsFromGears + bestOptionPoints;
}

function getBestScienceGuildOption(tablets, compasses, gears) {
    const tabletPoints = (tablets + 1) * (tablets + 1) - tablets * tablets;
    const compassPoints = (compasses + 1) * (compasses + 1) - compasses * compasses;
    const gearPoints = (gears + 1) * (gears + 1) - gears * gears;

    if (tabletPoints >= compassPoints && tabletPoints >= gearPoints) {
        return 'tablet';
    } else if (compassPoints >= tabletPoints && compassPoints >= gearPoints) {
        return 'compass';
    } else {
        return 'gear';
    }
}

function calculatePointsByCard() {
    const cards = [
        { id: 'atelier', type: 'gear' },
        { id: 'scriptorium', type: 'tablet' },
        { id: 'officine', type: 'compass' },
        { id: 'laboratoire', type: 'gear' },
        { id: 'ecole', type: 'tablet' },
        { id: 'bibliotheque', type: 'tablet' },
        { id: 'dispensaire', type: 'compass' },
        { id: 'observatoire', type: 'gear' },
        { id: 'etude', type: 'gear' },
        { id: 'universite', type: 'tablet' },
        { id: 'academie', type: 'compass' },
        { id: 'loge', type: 'compass' },
        { id: 'guildeScientifiques', type: 'guild' }
    ];

    let tablets = 0;
    let compasses = 0;
    let gears = 0;
    let scienceGuild = false;

    cards.forEach(card => {
        if (document.getElementById(card.id).checked) {
            if (card.type === 'tablet') {
                tablets++;
            } else if (card.type === 'compass') {
                compasses++;
            } else if (card.type === 'gear') {
                gears++;
            } else if (card.type === 'guild') {
                scienceGuild = true;
            }
        }
    });

    let sciencePoints = calculateSciencePoints(tablets, compasses, gears, scienceGuild);
    let totalPoints = sciencePoints; // Ajoutez d'autres points ici si nécessaire

    document.getElementById('totalPointsByCard').innerText = totalPoints;

    // Afficher la meilleure option de guilde si la guilde des scientifiques est cochée
    if (scienceGuild) {
        const bestOption = getBestScienceGuildOption(tablets, compasses, gears);
        document.getElementById('bestOptionByCard').style.display = 'block';
        document.getElementById('bestOptionIconByCard').src = `symbols/${bestOption}.png`;
        document.getElementById('bestOptionIconByCard').style.display = 'inline';
    } else {
        document.getElementById('bestOptionByCard').style.display = 'none';
    }
}

function openTab(evt, tabName) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    tablinks = document.getElementsByClassName('tablink');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

// Event listeners for real-time calculation
document.querySelectorAll('.inputField').forEach(item => {
    item.addEventListener('input', calculatePoints);
});

document.querySelectorAll('.cardCheckbox').forEach(item => {
    item.addEventListener('change', calculatePointsByCard);
});

document.getElementById('scienceGuild').addEventListener('change', calculatePoints);
document.getElementById('guildeScientifiques').addEventListener('change', calculatePointsByCard);
