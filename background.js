chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const starturl = `https://friends.roblox.com/v1/my/friends/requests?limit=100&sortOrder=Desc`;
  var cursor = ""; // Initialize cursor to an empty string
  var cursorurl = `https://friends.roblox.com/v1/my/friends/requests?limit=100&cursor=${cursor}&sortOrder=Desc`;
  let rawCookie = "";
  let requests = 0; // Initialize total requests count

  if (request.action === "start") {
    chrome.cookies.getAll({ domain: "roblox.com" }, function (cookies) {
      // Iterate through the cookies array to create the raw cookie string
      for (const cookie of cookies) {
        rawCookie += `${cookie.name}=${cookie.value}; `;
      }

      if (rawCookie) {
        // Remove the trailing space and semicolon
        rawCookie = rawCookie.slice(0, -2);
        //console.log("Raw Cookie:", rawCookie);

        fetchRequests(cursorurl); // Start fetching requests
      } else {
        console.log("No cookies found.");
      }
    });
  }

  function fetchRequests(url) {
    const requestOptions = {
      method: "GET",
      headers: {
        Cookie: rawCookie,
      },
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          cursor = encodeURIComponent(data.nextPageCursor);
          cursorurl = `https://friends.roblox.com/v1/my/friends/requests?limit=100&cursor=${cursor}&sortOrder=Desc`;

          requests += data.data.length; // Increment total requests count
          console.log("Total Requests:", requests);

          fetchRequests(cursorurl); // Fetch next page
        } else {
          sendResponse({ req: requests });
        }
      })
      .catch((error) => {
        console.log("friend request get error:", error);
      });
  }

  return true; // Important: Return true to keep the message channel open
});
