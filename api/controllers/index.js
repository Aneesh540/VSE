const traders = require('./traders');
const nse_share = require('./nse_share');

module.exports = {

    getuser : traders.getuser,
    createuser : traders.createuser,
    buy_share : traders.buy_share,
    company_details : nse_share.company_details
}
