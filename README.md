# uncapped-friend-requests-roblox

This extension uncaps your Roblox friend requests from 500.

Not recommended to those who may have an extensive friend request list (50,000+) as it may slow down.

How does this work?
The extension will call the Roblox API and get 100 friend requests. It will then continue calling the Roblox API until all of the lists of friend requests are grabbed.

Why can't it just call the Roblox API once?
The Roblox API caps out the list per API call to 100. To get around this, the extension will get the next list, and continue to call the API until all the pages are called.