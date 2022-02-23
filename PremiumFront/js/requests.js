var proxy = 56923;
var urlApi = 'http://localhost:'+proxy+'/api/';

function getStates(){
    request = $.ajax({
        url: urlApi + 'premium/states',
        type: "get",
        async: true
    });

    request.done(function(response){
        console.log(response);
        loadStates(response);
    });

    request.fail(function() {
        showAlert("There was a problem with the API, please check the URL or is the service is running.");
        disableControls();
    });

}

function getPlans(){
    request = $.ajax({
        url: urlApi + 'premium/plans',
        type: "get",
        async: true
    });

    request.done(function(response){
        console.log(response);
        loadPlans(response);
    });

    request.fail(function(jqXHR, textStatus, errorThrown) {
        showAlert("There was a problem with the API, please check the URL or is the service is running.");
        disableControls();
    });
}

function sendPremium() {  
    let select = document.getElementById("states");
    var selectedState = select.options[select.selectedIndex].value;
    console.log(selectedState);

    var date = document.getElementById("nacimiento").value;
    console.log(date);

    var age = document.getElementById("age").value;
    console.log(age);

    select = document.getElementById("plans");
    var selectedPlan = select.options[select.selectedIndex].value;
    console.log(selectedPlan);

    hideAlert();

    let myKeyVals = {
        date: date,
        age: age,
        state: selectedState,
        plan: selectedPlan
    }
    request = $.ajax({
        url: urlApi + 'premium',
        data : myKeyVals,
        type: "post",
        async: true
    });

    request.done(function(response){

        console.log(response);
        if(response.message=="Ok") {
            setResponse(response.responsePlan);
            enableControls();
        }
        else {
            showAlert(response.message);
            disableControls();
        }
    });

    request.fail(function(jqXHR) {
        if(jqXHR.status==400) showAlert("There was a problem with the request, please check the parameters and try again.");
        else if(jqXHR.status==404) showAlert("There was a problem with the service, please try again.");
        else showAlert("There was a problem with the API, please check the URL or is the service is running.")
    });

}