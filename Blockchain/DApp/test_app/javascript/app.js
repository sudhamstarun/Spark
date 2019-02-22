// DEFINE REQIURED VARIABLES HERE

var loanContractAddress;
var defaultGas = 99999990;
var accounts, bankAccount, ownerAccount, IRSaccount, insurerAccount;

function deployLoanContract() {
  Mortgage.new({ from: ownerAccount, gas: defaultGas })
    .then(function(loanInstance) {
      loanContractAddress = loanInstance.address;
      $("#sectionAAddress").html(
        '<i class="fa fa-address-card"></i> ' +
          '<a  target="#" onclick="getLoanData(' +
          loanInstance.address +
          ');return false;" href="' +
          loanInstance.address +
          ' ">' +
          loanInstance.address +
          "</a>"
      );
      $("#sectionBAddress").html(
        '<i class="fa fa-address-card"></i> ' +
          '<a  target="#" onclick="getLoanData(' +
          loanInstance.address +
          ');return false;" href="' +
          loanInstance.address +
          ' ">' +
          loanInstance.address +
          "</a>"
      );
      $("#sectionCAddress").html(
        '<i class="fa fa-address-card"></i> ' +
          '<a  target="#" onclick="getLoanData(' +
          loanInstance.address +
          ');return false;" href="' +
          loanInstance.address +
          ' ">' +
          loanInstance.address +
          "</a>"
      );
      $("#sectionDAddress").html(
        '<i class="fa fa-address-card"></i> ' +
          '<a  target="#" onclick="getLoanData(' +
          loanInstance.address +
          ');return false;" href="' +
          loanInstance.address +
          ' ">' +
          loanInstance.address +
          "</a>"
      );

      $("#sectionATxnHash").html(
        '<i class="fa fa-list-alt"></i> ' + loanInstance.transactionHash
      );
    })
    .then(function() {
      getStatus();
    })
    .then(function() {
      var ct = Mortgage.at(loanContractAddress);
      ct.getBalance(ownerAccount).then(function(data) {
        $("#ownerBalance").html(data.c[0] / 100);
      });
    });
}

function getStatus() {
  var ct = Mortgage.at(loanContractAddress);
  ct.getLoanData().then(function(data) {
    if (data[7].c[0] == 0) {
      $("#sectionAStatus").html("Initiated");
      $("#sectionBStatus").html("Initiated");
      $("#sectionCStatus").html("Initiated");
      $("#sectionDStatus").html("Initiated");
    } else if (data[7].c[0] == 1) {
      $("#sectionAStatus").html("Submitted");
      $("#sectionBStatus").html("Submitted");
      $("#sectionCStatus").html("Submitted");
      $("#sectionDStatus").html("Submitted");
    } else if (data[7].c[0] == 2) {
      $("#sectionAStatus").html("Approved");
      $("#sectionBStatus").html("Approved");
      $("#sectionCStatus").html("Approved");
      $("#sectionDStatus").html("Approved");
    }
  });
}

function submitLoan() {
  var ct = Mortgage.at(loanContractAddress);
  var _addressOfProperty = $("#propertyAddress").val();
  var _purchasePrice = $("#purchasePrice").val() * 100;
  var _term = $("#YR").val() * 100;
  var _interest = $("#IR").val() * 100;
  var _loanAmount = $("#LA").val() * 100;
  var _annualTax = $("#AT").val() * 100;
  var _annualInsurance = $("#AI").val() * 100;
  var _monthlyPi = $("#PI").val() * 100;
  var _monthlyTax = $("#MT").val() * 100;
  var _monthlyInsurance = $("#MI").val() * 100;
  ct.submitLoan
    .sendTransaction(
      _addressOfProperty,
      _purchasePrice,
      _term,
      _interest,
      _loanAmount,
      _annualTax,
      _annualInsurance,
      _monthlyPi,
      _monthlyTax,
      _monthlyInsurance,
      bankAccount,
      insurerAccount,
      irsAccount,
      { from: ownerAccount, gas: defaultGas }
    )
    .then(function(txHash) {
      getStatus();
    })
    .then(function() {
      ct.getLoanData().then(function(data) {
        $("#totalBankBalance").html((data[8].c[0] / 100) * 12 * 30);
        $("#bankBalance").html("0");
        $("#outstandingBankBalance").html((data[8].c[0] / 100) * 12 * 30);

        $("#totalInsurerBalance").html((data[9].c[0] / 100) * 12 * 30);
        $("#insurerBalance").html("0");
        $("#outstandingInsurerBalance").html((data[9].c[0] / 100) * 12 * 30);

        $("#totalIrsBalance").html((data[10].c[0] / 100) * 12 * 30);
        $("#irsBalance").html("0");
        $("#outstandingIrsBalance").html((data[10].c[0] / 100) * 12 * 30);
      });
    })
    .catch(function(e) {
      console.log("catching---->" + e);
      if (
        (e + "").indexOf("invalid JUMP") ||
        (e + "").indexOf("out of gas") > -1
      ) {
        // We are in TestRPC
      } else if ((e + "").indexOf("please check your gas amount") > -1) {
        // We are in Geth for a deployment
      } else {
        throw e;
      }
    });
}

function approveLoan() {
  var ct = Mortgage.at(loanContractAddress);
  ct.approveRejectLoan
    .sendTransaction(2, { from: bankAccount, gas: defaultGas })
    .then(function(txHash) {
      getStatus();
    });
}

function getLoanData() {
  var ct = Mortgage.at(loanContractAddress);
  ct.getLoanData().then(function(data) {
    $("#propAddr").html(hex2string(data[0]));
    $("#purPrice").html(data[1].c[0] / 100);
    $("#termYrs").html(data[2].c[0] / 100);
    $("#intr").html(data[3].c[0] / 100);
    $("#loanAmt").html(data[4].c[0] / 100);
    $("#annTax").html(data[5].c[0] / 100);
    $("#annIns").html(data[6].c[0] / 100);

    $("#modalLoanDetails").modal({
      keyboard: true,
      backdrop: "static"
    });
  });
}
