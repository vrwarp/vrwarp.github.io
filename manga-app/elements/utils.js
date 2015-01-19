function getUrl(url, requestCreatedCallback) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);
        
        req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };
        
        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
                };
        
        // Call request created callback if available.
        if (requestCreatedCallback) {
            requestCreatedCallback (req);
        }
        
        // Make the request
        req.send();
    });
}

function getJsonUrl(url, requestCreatedCallback) {
    return getUrl(url, requestCreatedCallback).then(function (response) {
        try {
            return JSON.parse(response);
        } catch (x) {
            console.warn('getJsonUrl_ caught an exception trying to parse response as JSON:');
            console.warn('url:', url);
            console.warn(x);
            return Promise.reject(x);
        }
    });
}

var convertHTMLEntitiesToString = (function() {
    var temp = document.createElement('p');
    return function (text) {
        temp.innerHTML = text.replace("<", "&lt;").replace(">", "&gt;");
        return temp.textContent;
    };
})();

