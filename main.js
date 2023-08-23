/*global chrome*/

var starturl = `https://friends.roblox.com/v1/my/friends/requests?limit=100&sortOrder=Desc`;
//var cursorurl = `https://friends.roblox.com/v1/my/friends/requests?limit=100&cursor=${cursor}&sortOrder=Desc`

//required for the api to actually work
var userCookie = document.cookie
const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Cookie': userCookie
    }
}
var test = chrome.cookies.getAll({domain: origin})

console.log(test)

fetch(starturl, requestOptions)
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.log('friend request get error:', error);
})