const traders = require('./traders');
const nse_share = require('./nse_share');
const portfolio = require('./portfolio');

module.exports = {

    // NSE LISTED COMPANIES DETAILS
    company_details : nse_share.company_details,
    company_names : nse_share.company_names,

    // USER OPERATIONS
    login : traders.getuser,
    createuser : traders.createuser,
    deleteuser : traders.deleteuser,

    // PORTFOLIO OPERATION
    buy_share : portfolio.buy_share,
    sell_share : portfolio.sell_share,
    show_demat_account : portfolio.show_demat_account,
    show_share_holding : portfolio.show_share_holding,

    get_test : nse_share.company_names,
    post_test : traders.createuser
}
