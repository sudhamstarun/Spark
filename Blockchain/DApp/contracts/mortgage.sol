pragma solidity ^0.5.0;

contract mortgage{
    /* constructor will be used to deploy the smart contract on blockchain.
    Setting initial account balance to 1000000 and loan status to 'Initiated'.
    Also, at the moment the support for doubles and floats in Solidity is rather weak so might
    have to stick with float.
    */

    // Declaring all the necessary
    int constant STATUS_INITIATED = 0;
    int constant STATUS_SUBMITTED = 1;
    int constant STATUS_APPROVED  = 2;
    int constant STATUS_REJECTED  = 3;

    // Events - publicize actions to external listeners
    event LienReleased(address _owner);
    event LienTrasferred (address _owner);
    event LoanStatus (int _status);

    // address of the loanApplicant
    address loanApplicant;

    // store the property details
    struct Property {
      bytes32  addressOfProperty;
      uint32 purchasePrice;
      address owner;
    }

    // store the loan terms
    struct LoanTerms{
      uint32 term;
      uint32 interest;
      uint32 loanAmount;
      uint32 annualTax;
      uint32 annualInsurance;
    }

    // struct datatype to store the monthly payment structure
    struct MonthlyPayment{
        uint32 pi;
        uint32 tax;
        uint32 insurance;
    }

    // store the details of the loan contract */
    struct Loan {
        LoanTerms loanTerms;
        Property property;
        MonthlyPayment monthlyPayment;
        ActorAccounts actorAccounts;
        int status; // values: REJECTED, SUBMITTED, APPROVED,
    }


    // names of the nodes that would be present on the blockchain
    struct ActorAccounts {
      address mortgageHolder;
      address insurer;
      address irs;
    }

    // name instances of our structs
    Loan loan;
    LoanTerms loanTerms;
    Property property;
    MonthlyPayment monthlyPayment;
    ActorAccounts actorAccounts;

    //FUNCTIONS DEFINED BELOW

    function Mortgage() public{
        loanApplicant = msg.sender;
        loan.status = STATUS_INITIATED;
        balances[msg.sender] = 100000000000000000000000;
    }

    /* Deposit money to actors account and modify the balance  */
    function deposit(address receiver, uint amount) public returns(uint256){
        if (balances[msg.sender] < amount) return 0;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        //checkMortgagePayoff(); // need to define this function
        return balances[receiver];
    }

    // check if mortgage payment if complete, if complete, then release the property lien to the homeowner

    function checkMortgagePayoff() public{
        if(balances[loan.actorAccounts.mortgageHolder]
                ==loan.monthlyPayment.pi*12*loan.loanTerms.term &&
            balances[loan.actorAccounts.insurer]
                ==loan.monthlyPayment.tax*12*loan.loanTerms.term &&
            balances[loan.actorAccounts.irs]
                ==loan.monthlyPayment.insurance*12*loan.loanTerms.term
        ){
            loan.property.owner = loanApplicant;
            emit LienReleased (loan.property.owner);
        }
    }

    // Add loan details into the contract
    function submitLoan(
            bytes32 _addressOfProperty,
            uint32 _purchasePrice,
            uint32 _term,
            uint32 _interest,
            uint32 _loanAmount,
            uint32 _annualTax,
            uint32 _annualInsurance,
            uint32 _monthlyPi,
            uint32 _monthlyTax,
            uint32 _monthlyInsurance,
            address _mortgageHolder,
            address _insurer,
            address _irs
    ) public{
        loan.property.addressOfProperty = _addressOfProperty;
        loan.property.purchasePrice = _purchasePrice;
        loan.loanTerms.term=_term;
        loan.loanTerms.interest=_interest;
        loan.loanTerms.loanAmount=_loanAmount;
        loan.loanTerms.annualTax=_annualTax;
        loan.loanTerms.annualInsurance=_annualInsurance;
        loan.monthlyPayment.pi=_monthlyPi;
        loan.monthlyPayment.tax=_monthlyTax;
        loan.monthlyPayment.insurance=_monthlyInsurance;
        loan.actorAccounts.mortgageHolder = _mortgageHolder;
        loan.actorAccounts.insurer = _insurer;
        loan.actorAccounts.irs = _irs;
        loan.status = STATUS_SUBMITTED;
    }

    // Gets loan details from the contract
    function getLoanData() public view returns(
            bytes32 _addressOfProperty,
            uint32 _purchasePrice,
            uint32 _term,
            uint32 _interest,
            uint32 _loanAmount,
            uint32 _annualTax,
            uint32 _annualInsurance,
            int _status,
            uint32 _monthlyPi,
            uint32 _monthlyTax,
            uint32 _monthlyInsurance) {
        _addressOfProperty = loan.property.addressOfProperty;
        _purchasePrice=loan.property.purchasePrice;
        _term=loan.loanTerms.term;
        _interest=loan.loanTerms.interest;
        _loanAmount=loan.loanTerms.loanAmount;
        _annualTax=loan.loanTerms.annualTax;
        _annualInsurance=loan.loanTerms.annualInsurance;
        _monthlyPi=loan.monthlyPayment.pi;
        _monthlyTax=loan.monthlyPayment.tax;
        _monthlyInsurance=loan.monthlyPayment.insurance;
        _status = loan.status;
    }

    // Approve or reject loan
    function approveRejectLoan(int _status) bankOnly public{
        //if(msg.sender == loanApplicant) throw;
        loan.status = _status ;
        /* if status is approved, transfer the lien of the property
        to the mortgage holder */
        if(_status == STATUS_APPROVED)
        {
            loan.property.owner  = msg.sender;
            emit LienTrasferred(loan.property.owner);
        }
        emit LoanStatus(loan.status);
    }

    // CONDUCTING MAPPING now

    // Maps addresses of the actors in the mortgage contract with their balances

    mapping (address => uint256) public balances;

    /* Function called by mortgageHolder */
    modifier bankOnly {
      if(msg.sender != loan.actorAccounts.mortgageHolder) {
         revert("lol");
      }
      _;
   }
}
