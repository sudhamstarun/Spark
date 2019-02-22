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
