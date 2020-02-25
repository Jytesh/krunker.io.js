**cdn**

# **BETA**

### Instalation
```html
<script src="**/build/krunker.io.js?build=BETA"></script>
```
### loading the constroctor
```js
var client = new kij()
```
### getting leaderboard
```js
client.fetchLeaderboard("funds").then(d => console.log(d)) // it will order by funds
```
### getting players
```js
client.fetchPlayer("hoodgail").then(d => console.log(d))
```
### getting weapon
```js
client.weapon("Sniper Rifle").then(d => console.log(d))
```
### getting classes
```js
client.class("hunter").then(d => console.log(d))
```
### getting all items
```js
client.fetchItems().then(d => console.log(d)) 
```
### getting api version
```js
client.version().then(d => console.log(d)) // it will return the version
```
