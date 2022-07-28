chrome.runtime.onStartup.addListener(function () {
    chrome.storage.local.get('autoLogin', function (result) {
        if (result['autoLogin']) {
            console.log("Logging in");

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("mode", "191");
            urlencoded.append("username", "bca20111");
            urlencoded.append("password", "d8e7");
            urlencoded.append("a", new Date().getTime());
            urlencoded.append("producttype", "0");

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            fetch("http://10.9.150.45:8090/login.xml", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
        else {
            console.log("Auto login is disabled");
        }
    });
})

