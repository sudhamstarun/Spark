package main

// This file wants to act as the mortgage exchange platform where it keeps track of the transactions being stored on the ledger
/*
import (
	"bytes"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"math"
	"math/rand" //some random number generation for insurance quotes, and fico scores
	"strconv"
	"time" //needed to record transaction history for each time ledger entry is updated

	"github.com/hyperledger/fabric/core/chaincode/shim" // import for Chaincode Interface
	pb "github.com/hyperledger/fabric/protos/peer"      // import for peer response
)
*/

// Defined to implement chaincode interface
type Mrtgexchg struct {
}

// trying to generate random parameters for now
const (
	FicoHigh           = 800.0
	FicoLow            = 600.0
	FicoThreshold      = 650.0
	InsuranceHigh      = 5000.0
	InsuranceLow       = 2500.0
	InsuranceThreshold = 0.0
	AppraisalHigh      = 2000000.0
	AppraisalLow       = 750000.0
	RecordsChaincode   = "recordschaincode"
	RecordsChannel     = "records"
	LendingChaincode   = "lendingchaincode"
	LendingChannel     = "lending"
	BooksChaincode     = "bookschaincode"
	BooksChannel       = "books"
	QueryBooksString   = "queryBooks"
	QueryLendingString = "queryLending"
)

type RealEstate struct {
	RealEstateID       string // unique identifier for the current problem
	Address            string
	Value              float64
	Details            string // this will contain its status on the exchange
	Owner              string
	TransactionHistory map[string]string
}
