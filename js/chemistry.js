
function calculatePlayerChemistryPsition(formation, fieldPlayer) {
    const playerPosition = formation.prototype[fieldPlayer.cardId].pos === fieldPlayer.player.position;
    return playerPosition ? 10 : 0;
}

function calculatePlayerChemistryClub(fieldPlayer, fieldPlayers) {
    const playerClub = fieldPlayer.player.club;
    const clubLinks = fieldPlayers.filter(fp => fp.player.club === playerClub).length;
    return clubLinks > 1 ? 3 : 0;
}

function calculatePlayerChemistryLeague(formation, fieldPlayer, fieldPlayers) {
    const playerLeague = fieldPlayer.player.league;
    const allLinks = []
    formation.links.forEach(link => {
        if (link.includes(fieldPlayer.cardId)) {
            allLinks.push(link);
        }
    });
    let adjacentPlayers = [];

    allLinks.forEach(link => {
        link.forEach(pos => {
            if (pos !== fieldPlayer.cardId) {
                let fp = fieldPlayers.find(fp => fp.cardId === pos);
                if (fp) {
                    adjacentPlayers.push(fp);
                }
            }
        });
    });

    if (adjacentPlayers.length === 0) {
        return 0;
    }


    const leagueLinks = adjacentPlayers.filter(ap => ap.player.league === playerLeague).length;
    return Math.min(leagueLinks, 2) * 2;
}

function calculatePlayerChemistryNationality(fieldPlayer, fieldPlayers) {
    const allNationalities = fieldPlayers.map(fp => fp.player.nationality);
    return allNationalities.filter(n => n === fieldPlayer.player.nationality).length > 1 ? 1 : 0;
}

function calculatePlayersChemistry(formation, fieldPlayers) {
    if (fieldPlayers.length === 0) {
        return 0;
    }
    return fieldPlayers.reduce((total, fieldPlayer) => {
        const position = calculatePlayerChemistryPsition(formation, fieldPlayer);

        const club = calculatePlayerChemistryClub(fieldPlayer, fieldPlayers);

        const league = calculatePlayerChemistryLeague(formation, fieldPlayer, fieldPlayers);

        const nationality = calculatePlayerChemistryNationality(fieldPlayer, fieldPlayers);

        return total + position + club + league + nationality;
    }, 0);
}
