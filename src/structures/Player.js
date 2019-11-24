module.exports = class {
    constructor (data) {
        const stats = JSON.stringify(data.player_stats);
        
        const classes = ["Triggerman", "Hunter", "Run N Gun", "Spray N Pray", "Vince", "Detective", "Marksman", "Rocketeer", "Agent", "Runner", "Bowman", "Commando"];
        
        return {
            username: data.player_name,
            displayName: (data.player_clan ? data.player_name + " [" + data.player_clan + "]" : data.player_name)
            id: data.player_id,
            stats: {
                shots: stats.s,
                hits: stats.h,
                accuracy: stats.s / stats.h,
                
                nukes: stats.n,
                
                kills: data.player_kills,
                deaths: data.player_deaths,
                kdr: (data.player_kills / data.player_deaths).toFixed(2),
                
                gamesPlayed: data.player_games_played,
                wins: data.player_wins,
                losses: data.player_games_played - data.player_wins,
                wlr: (data.player_wins / (data.player_games_played - data.player_wins)).toFixed(2)
            },
            social: {
                clan: data.player_clan ? data.player_clan : null,
                following: data.player_following || 0,
                followers: data.player_followed || 0,
            },
            
        };
    }
}
