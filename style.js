
const nameElement = document.getElementById("inputName");
const mailElement = document.getElementById("inputMail");
const queryMsgElement = document.getElementById("inputQuery");

var nameVal;
var emailVal;
var queryMessage;
var messageText;

// Client sided validation because I don't want to redirect for validation
function validate() {
    nameVal = nameElement.value;
    // Regular expression pattern to match valid names
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!nameRegex.test(nameVal) || nameVal.trim().length === 0) {
        return 0;
    }

    emailVal = mailElement.value;
    // Regular expression pattern to match valid email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailVal) || emailVal.trim().length === 0) {
        return 1;
    }

    queryMessage = queryMsgElement.value;
    if (queryMessage.trim().length === 0) {
        return 2;
    }

    return 3;
}

var form = document.getElementById("mail");

async function submitQuery(event) {
    isvalid = validate();
    if (isvalid == 3) {
        var data = new FormData(event.target);
        targetHTTP = "https://formspree.io/f/mrgnplwd";
        
        fetch(targetHTTP, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert("Thanks for your submission!");
            } else {
                response.json().then(data => {
                    if (Object.hasOwnProperty(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form");
                    }
                })
            }
        }).catch(error => {
            alert("Oops! There was a problem submitting your form");
        });

        form.reset();
    } else {
        const inputElement = ["Name", "Email", "Message"];
        alert('Make sure you have filled ' + inputElement[isvalid] + ' correctly');
    }
}



async function handleSubmit(event) {
    event.preventDefault();
    await submitQuery(event);
}

form.addEventListener("submit", handleSubmit);