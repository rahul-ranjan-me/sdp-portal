var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

/**
 * Create a contact
 */
exports.create = function(req, res) {
console.log(req.body)
  var item = new Enquiry.model(),
    data = (req.method == 'POST') ? req.body : req.query;

  var newEnquiry = new Enquiry.model();
  var updater = newEnquiry.getUpdateHandler(req);

  updater.process(req.body, {
    flashErrors: true,
    fields: 'name, email, phone, enquiryType, message',
    errorMessage: 'There was a problem submitting your enquiry:',
  }, function (err) {
    if (err) return res.json({ error: err });

    res.json({
      success: true
    });
  });

}