var saveButton = document.getElementById("saveButton");
const connectButton = document.getElementById("connectButton");
const autoLoginCheckbox = document.getElementById("autoLoginCheckbox");
const usernameTextbox = document.getElementById("usernameTextbox");
const passwordTextbox = document.getElementById("passwordTextbox");
const githubLink = document.getElementById("githubLink");


GetCredentials();

githubLink.addEventListener("click", function () {
    shell.openExternal("github.com/lalan-desai");
}
);

usernameTextbox.addEventListener('input', function () {
    connectButton.disabled = true;
    connectButton.style.background = '#2b4a79';
    connectButton.style.color = '#828282';
});
passwordTextbox.addEventListener('input', function () {
    connectButton.disabled = true;
    connectButton.style.background = '#2b4a79';
    connectButton.style.color = '#828282';
});

autoLoginCheckbox.addEventListener('change', function () {
    chrome.storage.local.set({ 'autoLogin': autoLoginCheckbox.checked });
});



function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time || 1000);
    });
}



async function GetCredentials() {
    var uname, pwd;
    chrome.storage.local.get('username', function (result) {
        if (result['username'] == null) {
            usernameTextbox.value = "";
        }
        else {
            usernameTextbox.value = result['username'];
            uname = result['username'];
        }
    });
    chrome.storage.local.get('password', function (result) {
        if (result['password'] == null) {
            passwordTextbox.value = "";
        }
        else {
            passwordTextbox.value = result['password'];
            pwd = result['password'];
        }
    });
    chrome.storage.local.get('autoLogin', function (result) {
        if (result['autoLogin'] == null) {
            autoLoginCheckbox.checked = true;
        }
        else {
            autoLoginCheckbox.checked = result['autoLogin'];
        }

    });
    await sleep(10);
    document.getElementById("frame").innerHTML += "<form id='loginForm' style='display:none' target='formresponse' action='http://192.168.1.9:3000'method='POST'><input type='text' name='mode' value='191' /><input type='text' name='username' value='" + uname + "' /><input type='text' name='password' value='" + pwd + "' /><input type='text' name='a' value='" + new Date().getTime() + "' /><input type='text' name='producttype' value='0' /><input type='submit'></form>";
    document.getElementById("frame").innerHTML += "<iframe id='framewindow' name='formresponse'></iframe>";
}

connectButton.addEventListener("click", d => {
    Connect();
});






async function Connect() {
    if (usernameTextbox.value == "" || passwordTextbox.value == "") {
        usernameTextbox.classList.remove("run-animation");
        passwordTextbox.classList.remove("run-animation");
        
        await sleep(200);
    }
    else {
        var form = document.getElementById("loginForm");
        form.submit();
    }


}

saveButton.addEventListener("click", e => {
    var username = document.getElementById("usernameTextbox").value;
    var password = document.getElementById("passwordTextbox").value;
    chrome.storage.local.set({ "username": username }, function () { console.log("Username set") });
    chrome.storage.local.set({ "password": password }, function () { console.log("Password set") });
    document.getElementById("loginForm").remove();
    document.getElementById("framewindow").remove();
    GetCredentials();
    sleep(10);
    connectButton.disabled = false;
    connectButton.style.background = '#0d6efd';
    connectButton.style.color = '#fff';
});




