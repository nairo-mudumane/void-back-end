const {
  createContact,
  getAllContacts,
  getContactById,
  deleteContactById,
  updateContact,
} = require("../controllers/contact");

module.exports = (app) => {
  app.route("/contacts").post(createContact).get(getAllContacts);
  app
    .route("/contacts/:idContact")
    .get(getContactById)
    .delete(deleteContactById)
    .patch(updateContact);
};
