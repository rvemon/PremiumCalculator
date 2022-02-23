var periods = [ { name: 'Monthly', numberOfMonths: 1}, 
                {name: 'Quarterly', numberOfMonths: 3}, 
                {name: 'Semi-Annu', numberOfMonths: 6}, 
                {name: 'Annual', numberOfMonths: 12}
            ];

$( document ).ready(function() {
    loadConfiguration();
    disableControls();
});

function loadConfiguration(){
    getStates();
    getPlans();
    loadPeriods();
}

function showAlert(text){
    $('#alert').empty().append(text);
    $("#alert").css("visibility", "visible");
}

function hideAlert(){
    $("#alert").css("visibility", "hidden");
}

function disableControls(){
    $('[id^=carrier_]').prop( "disabled", true );
    $('[id^=premium_]').prop( "disabled", true );
    $('[id^=annual_]').prop( "disabled", true );
    $('[id^=monthly_]').prop( "disabled", true );
    $('#periods').prop("disabled", true);
}

function enableControls(){
    $('[id^=carrier_]').prop( "disabled", false );
    $('[id^=premium_]').prop( "disabled", false );
    $('[id^=annual_]').prop( "disabled", false );
    $('[id^=monthly_]').prop( "disabled", false );
    $('#periods').prop("disabled", false);
}

document.getElementById("periods").onchange = function(){calculateAmount()};

document.getElementById("nacimiento").onchange = function(){calculateAge()};

function loadStates(json){
    var options = "";
    json.forEach(function(state){
        options += "<option value='"+state.abbreviation+"'>"+state.abbreviation+" - "+state.name+"</option>";
        
    });
    $("#states").append(options);
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

function calculateAmount(){
    var select = document.getElementById("periods");
    var selectedValue = select.options[select.selectedIndex].value;
    console.log(selectedValue);
    setAmounts(selectedValue);
}

function setAmounts(value){

    $('[id^=premium_]').each(function(){
        var number = this.id.split('_').pop();
        var monthly = (parseFloat(this.value) / parseFloat(value)).toFixed(2);
        var annually = (parseFloat(this.value) * (12/ parseFloat(value))).toFixed(2);

        $("#annual_"+number).val(isNaN(annually)?'':annually);
        $("#monthly_"+number).val(isNaN(monthly)?'':monthly);
    });
    
}

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

