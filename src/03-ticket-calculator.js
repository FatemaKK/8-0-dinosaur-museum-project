
/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/

const { extras } = require("../data/tickets");
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
//return a number 
//the total of priceincents
//create a loop
//check if tickets.property[key] = ticketsInfo.ticketType
//check tickets.description = ticketInfo.ticketType
//check tickets.priceIncents[key] = ticketInfo.entrantType
//add accordingly
//if not return error message //> string

function calculateTicketPrice(tickets, ticketInfo) {
  let total = 0;

  let ticksType = ticketInfo.ticketType
  if(tickets.hasOwnProperty(ticketInfo.ticketType)){
    let costType = tickets[ticksType].priceInCents
    let entrant = ticketInfo.entrantType
    if(costType.hasOwnProperty(entrant)){
      total += costType[entrant]
    } else {
      return `Entrant type '${entrant}' cannot be found.`
    }
  } else {
    return `Ticket type '${ticksType}' cannot be found.`
  }
  let extraTicks = ticketInfo.extras
    if(ticketInfo.extras.length > 0){
      let ticketsPlus = tickets.extras
      for (let extraTick of extraTicks){
        if(ticketsPlus.hasOwnProperty(extraTick)){
          total += ticketsPlus[extraTick].priceInCents[ticketInfo.entrantType]
        } else {
          return `Extra type '${ticketInfo.extras}' cannot be found.`
        }
      }
    }
    return total;
  }
   

// * EXAMPLE:
//  *  const ticketInfo = {
//       ticketType: "membership",
//       entrantType: "child",
//       extras: ["movie"],
//     };
//     calculateTicketPrice(tickets, ticketInfo);
//     //> 2500

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */
//return a string
//a string with each ticket purchased 
//the total price of each ticket
//create a loop
//the loop is to check if the total from the above function (that is being used as a helper function) returns a string
//create a loop
//this loop is to check if there are any extras
//if there are we need to add that to the total receipt
//the price has to be converted to 0.00 from cents
    
function purchaseTickets(tickets, purchases) {
  let finalTotal = 0;
  let total = 0;
  let receiptLines = "";
  let receiptAdd = "";
  let receiptX = "";
  for (let purchase of purchases){
    if(typeof(calculateTicketPrice(tickets, purchase)) === 'string'){
      return calculateTicketPrice(tickets, purchase)
    }
    let capEntrant = purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1) + " "
    if (tickets.hasOwnProperty(purchase.ticketType)){
      receiptAdd = tickets[purchase.ticketType].description + ": " + "$"
    }
    let centsTotal = calculateTicketPrice(tickets, purchase)
    let extraTicks = purchase.extras
    if(purchase.extras.length > 0){
      centsTotal = (centsTotal/100).toFixed(2)
      let ticketsPlus = tickets.extras
      for (let i = 0; i < extraTicks.length; i++){
        let extraTick = extraTicks[i]
        if(ticketsPlus.hasOwnProperty(extraTick)){
          if (i === extraTicks.length - 1){
            receiptX += ticketsPlus[extraTick].description + ")\n"
          }if(i !== extraTicks.length - 1){
            receiptX += ticketsPlus[extraTick].description + ", "
          }
        }
      }
      receiptX = " (" + receiptX
    }else{
      centsTotal = (centsTotal/100).toFixed(2) + "\n"
    }
    total += calculateTicketPrice(tickets, purchase)
    receiptLines += (capEntrant + receiptAdd + centsTotal + receiptX)
    receiptX = "";
  }
  finalTotal = (total/100).toFixed(2)
  return "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n" + receiptLines
  + "-------------------------------------------\nTOTAL: $" + finalTotal;
}


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
