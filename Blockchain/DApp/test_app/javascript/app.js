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
