//Codepen code updated
let loans = [
    { loan_year: 2020, loan_amount: 10000.0, loan_int_rate: 0.0453 },
    { loan_year: 2021, loan_amount: 10000.0, loan_int_rate: 0.0453 },
    { loan_year: 2022, loan_amount: 10000.0, loan_int_rate: 0.0453 },
    { loan_year: 2023, loan_amount: 10000.0, loan_int_rate: 0.0453 },
    { loan_year: 2024, loan_amount: 10000.0, loan_int_rate: 0.0453 }
  ];
  //global variables/Professor's code
  let loanWithInterest = 0;
  let int = 0;
  let payments;
   //Javascript Function 
  //Comma is added when value is over $1000
  function toComma(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  //Add $$$ signs
  let toMoney = (value) => {
    return `\$${toComma(value.toFixed(2))}`;
  };
  //Saves data locally in the users device
  let saveForm = () => {
    localStorage.setItem(`as06`, JSON.stringify(loans));
  };
  //Updates the form saved in the local storage
  let loadForm = () => {
    if (localStorage.getItem(`as06`) != null) {
      loans = JSON.parse(localStorage.getItem(`as06`));
      updateForm();
    } else {
      alert(`Error: no saved values`);
    }
  };
  
  //JQUERY Functions
  // Entry form
  function loadDoc() {
    // pre-fill defaults for first loan year
    var defaultYear = loans[0].loan_year; 
    //Incrementing default year using Jquery selector
    $("#loan_year0" + 1).val(defaultYear++); 
    var defaultLoanAmount = loans[0].loan_amount;
    //Setting default loan using Jquery selector
    $("#loan_amt0" + 1).val(defaultLoanAmount.toFixed(2)); 
    var defaultInterestRate = loans[0].loan_int_rate;
    //Setting default interest rate using Jquery selector
    $("#loan_int0" + 1).val(defaultInterestRate); 
    var loanWithInterest = loans[0].loan_amount * (1 + loans[0].loan_int_rate);
    // toMoney and setting default loan with interest using Jquery selector
    $("#loan_bal0" + 1).text(toMoney(loanWithInterest)); 
  
    // pre-fill defaults for other loan years/professsors code
    // asking 2,3,4,5
    for (var i = 2; i < 6; i++) {
        //increment year
      $(`#loan_year0${i}`).val(defaultYear++); 
      //This cannot be edited
      $(`#loan_year0${i}`).attr("disabled", "true"); 
      $(`#loan_year0${i}`).css({
        backgroundColor: "red",
        color: "white"
      }); //Makes it looked disabled
      $(`#loan_amt0${i}`).val(defaultLoanAmount.toFixed(2));
      $(`#loan_int0${i}`).val(defaultInterestRate);
      $(`#loan_int0${i}`).attr("disabled", "true");
      $(`#loan_int0${i}`).css({
        backgroundColor: "red",
        color: "white"
      });
      //Updates interest to give the total value
      loanWithInterest = 
        (loanWithInterest + defaultLoanAmount) * (1 + defaultInterestRate);
         //Add $$$ signs and comma at balance
      $("#loan_bal0" + i).text(toMoney(loanWithInterest)); 
    } // end: "for" loop
  
    //all input fields: select contents on focus
    //highlight background skyblue when clicked 
    $("input[type=text]").focus(function () {
      $(this).select();
      $(this).css("background-color", "skyblue");
    });
    $("input[type=text]").blur(function () {
      $(this).css("background-color", "white");
      updateLoansArray();
    });
   } // end: function loadDoc()
  
  function updateLoansArray() {
    //Take inputs from user and change loans array using regex
  
    // regex tester web site: https://www.regexpal.com/
    //Have to start with 19 or 20 followed by two numbers
    let yearP = /^(19|20)\d{2}$/; 
    //first digit has to start 1-9 and followed by none, one or more additional digits and then plus two or one decimal digit.
    let amtP = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/; 
    //have zero at the start have 1 to 5 decimal places
    let intP = /^(0|)+(.[0-9]{1,5})?$/; 
    let valid = true;
  
    //checks yearP matches the year pattern. background turns orange if false
    if (!yearP.test($(`#loan_year01`).val())) {
      valid = false;
      $(`#loan_year01`).css("background-color", "orange");
    }
    //checks if amtP matches the ammount pattern. background turns orange if false
    for (i = 1; i < 6; i++) {
      if (!amtP.test($(`#loan_amt0${i}`).val())) {
        valid = false;
        $(`#loan_amt0${i}`).css("background-color", "orange");
      }
    }
    //check if intP matches the interest rate pattern. background turns orange if false
    if (!intP.test($(`#loan_int01`).val())) {
      valid = false;
      $(`#loan_int01`).css("background-color", "orange");
    }
  
    //if users input are true then it updates the variables and form
    if (valid) {
      loans[0].loan_year = parseInt($("#loan_year01").val());
      for (var i = 1; i < 5; i++) {
        loans[i].loan_year = loans[0].loan_year + i;
      }
      for (i = 1; i < 6; i++) {
        let amt = parseFloat($(`#loan_amt0${i}`).val()).toFixed(2);
        loans[i - 1].loan_amount = amt;
      }
      let rate = parseFloat($("#loan_int01").val());
      for (i = 0; i < 5; i++) {
        loans[i].loan_int_rate = rate;
      }
  // only updates if inputs are valid then it will update the form
      updateForm(); 
    } // end: if
  } // end: function updateLoansArray()
  
 
  //Display entry form
  //Updates form with correct calculations
  let updateForm = () => {
    loanWithInterest = 0;
    let totalAmt = 0;
    for (i = 1; i < 6; i++) {
      $(`#loan_year0${i}`).val(loans[i - 1].loan_year);
      let amt = loans[i - 1].loan_amount;
      $(`#loan_amt0${i}`).val(amt);
      totalAmt += parseFloat(amt);
      $(`#loan_int0${i}`).val(loans[i - 1].loan_int_rate);
      loanWithInterest =
        (loanWithInterest + parseFloat(amt)) * (1 + loans[0].loan_int_rate);
      $("#loan_bal0" + i).text(toMoney(loanWithInterest));
    }
    int = loanWithInterest - totalAmt;
    //show the interest
    $(`#loan_int_accrued`).text(toMoney(int)); 
  }; // end: function updateForm()
  
  //ANGULAR
  //Create variable and assign value to angular
  var app = angular.module("myApp", []);
  
  //Takes the total amount of loan and spread it in how many years 
  app.controller("myCtrl", function ($scope) {
    // controller connects HTML
    $scope.payments = []; 
    $scope.populate = function () {
      //populates the payments array
      //updates form
      updateForm(); 
  
      //payments
      //calculate total loan
      let total = loanWithInterest; 
      let iRate = loans[0].loan_int_rate;
      let r = iRate / 12;
      let n = 11;
      //Formula for loan payment
      //https://www.thebalance.com/loan-payment-calculations-315564
      let pay =
      //Formula to get the same payments for every period
        12 * (total / (((1 + r) ** (n * 12) - 1) / (r * (1 + r) ** (n * 12)))); 
      for (let i = 0; i < 10; i++) {
        //Loops calculate as the period increase
        total -= pay;
        let int = total * iRate;
        $scope.payments[i] = {
          year: loans[4].loan_year + i + 1,
          payment: toMoney(pay),
          amt: toMoney(int),
          ye: toMoney((total += int))
        };
      }
      // Calculates the very last payment and gives us the remaining balance
      $scope.payments[10] = {
        year: loans[4].loan_year + 11,
        payment: toMoney(total),
        amt: toMoney(0),
        ye: toMoney(0)
      };
    };
  });
