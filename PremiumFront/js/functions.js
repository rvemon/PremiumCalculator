var proxy = 56923;
var urlApi = 'http://localhost:'+proxy+'/api/';

var periods = [ { name: 'Monthly', numberOfMonths: 1}, 
                {name: 'Quarterly', numberOfMonths: 3}, 
                {name: 'Semi-Annu', numberOfMonths: 6}, 
                {name: 'Annual', numberOfMonths: 12}
            ];

$( document ).ready(function() {
    loadConfiguration();
});

function showAlert(text){
    $('#alert').empty().append(text);
    $("#alert").css("visibility", "visible");
}

function hideAlert(){
    $("#alert").css("visibility", "hidden");
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
        if(response.message=="Ok") setResponse(response.responsePlan);
        else showAlert(response.message);
    });

    request.fail(function(jqXHR) {
        if(jqXHR.status==400) showAlert("There was a problem with the request, please check the parameters and try again.");
        else if(jqXHR.status==404) showAlert("There was a problem with the service, please try again.");
        else showAlert("There was a problem with the API, please check the URL or is the service is running.")
    });

}

function setResponse(json){
    let carrierString  = "<div>Carrier</div>";
    let premiumString  = "<div>Premium</div>";
    let annualString  = "<div>Annual</div>";
    let monthlyString  = "<div>Montly</div>";

    json.forEach((element, index) => {
        carrierString += "<div><input id='carrier_"+index+"' value='"+element.carrier+"'></div>";
        premiumString += "<div><input id='premium_"+index+"' value='"+element.price+"' type='number'></div>";
        annualString += "<div><input id='annual_"+index+"' type='number'></div>";
        monthlyString += "<div><input id='monthly_"+index+"' type='number'></div>";
    });

    $("#carrier_col").empty().append(carrierString);
    $("#premium_col").empty().append(premiumString);
    $("#annual_col").empty().append(annualString);
    $("#monthly_col").empty().append(monthlyString);

    calculateAmount();
}

function loadConfiguration(){
    getStates();
    getPlans();
    loadPeriods();
}

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
        showAlert("There was a problem with the API, please check the URL or is the service is running.")
    });

}

function loadStates(json){
    var options = "";
    json.forEach(function(state){
        options += "<option value='"+state.abbreviation+"'>"+state.abbreviation+" - "+state.name+"</option>";
        
    });
    $("#states").append(options);
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
        showAlert("There was a problem with the API, please check the URL or is the service is running.")
    });
}

function loadPlans(json){
    var options = "";
    json.forEach(function(plan){
        options += "<option padding-bottom: 0.5rem; value='"+plan.name+"'>"+plan.name+"</option>";
        
    });
    $("#plans").append(options);
}

function loadPeriods(){
    var options = "";
    periods.forEach(function(period){
        options += "<option padding-bottom: 0.5rem; value='"+period.numberOfMonths+"'>"+period.name+"</option>";
        
    });
    $("#periods").append(options);
}

document.getElementById("periods").onchange = function(){calculateAmount()};

function calculateAmount(){
    var select = document.getElementById("periods");
    var selectedValue = select.options[select.selectedIndex].value;
    console.log(selectedValue);
    setAmounts(selectedValue);
}

function setAmounts(value){
    //validates if the input is empty or not number
    $('[id^=premium_]').each(function(){
        var number = this.id.split('_').pop();
        var monthly = (parseFloat(this.value) / parseFloat(value)).toFixed(2);
        var annually = (parseFloat(this.value) * (12/ parseFloat(value))).toFixed(2);

        $("#annual_"+number).val(isNaN(annually)?'':annually);
        $("#monthly_"+number).val(isNaN(monthly)?'':monthly);
    });
    
}

document.getElementById("nacimiento").onchange = function(){calculateAge()};

function calculateAge(){
    var date = document.getElementById("nacimiento").value;

    date = new Date(date);

    var monthDiff = Date.now() - date.getTime();

    var dateDiff = new Date(monthDiff);

    var year = dateDiff.getUTCFullYear();

    var age = Math.abs(year - 1970);

    console.log("edad: "+ age);
    $('#age').val(age);



}

