# RestFul api
### URL
| https://krunker-api.glitch.me |
 ------------------------------

## Rest url
```js
var url = "https://krunker-api.glich.me"
```


### getting users stats
```
url + "/user/?name=hoodgail"
```

### getting clan stats
```
url + "/clan/?name=T"
```

### getting leaderboard
> params
 - kills
 - funds
 - elo
 - elo2
 - elo4
 - Wins
 - time
 - clans
```
url + "/leaderboard/?orderBy=kills"
```

### getting spin chance
``` js
url + `?type=heroic&rare=contraband&kr=2000`
```
