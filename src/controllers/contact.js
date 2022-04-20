const { v4: uid } = require("uuid");
const { defaultDatabase: database } = require("../config/database");
const { defaultResponse } = require("../utils/defaultResponse");
const db_ref = "contact-list";

exports.createContact = async (req, res) => {
  const payload = req.body;

  if (!payload.name || !payload.contact) {
    const response = defaultResponse(true, 400, "all fields are required");
    return res.status(400).json({ ...response });
  }
  payload["uid"] = uid();

  await database
    .ref(db_ref)
    .child(payload.uid)
    .set(payload)
    .then(() => {
      const response = defaultResponse(false, 201, "created");
      return res.status(201).json({ ...response });
    })
    .catch((err) => {
      const response = defaultResponse(
        true,
        err.statusCode || 500,
        err.message
      );
      return res.status(response.status).json({ ...response });
    });
};

exports.getAllContacts = async (req, res) => {
  await database
    .ref(db_ref)
    .once("value", (records) => {
      const list = [];
      records.forEach((contact) => {
        list.push(contact.val());
      });
      const response = defaultResponse(false, 200, "ok");
      return res.status(200).json({ ...response, data: list });
    })
    .catch((err) => {
      const response = defaultResponse(
        true,
        err.statusCode || 500,
        err.message
      );
      return res.status(response.status).json({ ...response });
    });
};

exports.getContactById = async (req, res) => {
  const { idContact } = req.params;

  await database
    .ref(`${db_ref}/${idContact}`)
    .once("value", (records) => {
      const contact = records.val() || null;
      const response = defaultResponse(false, 200, "ok");
      return res.status(200).json({ ...response, data: contact });
    })
    .catch((err) => {
      const response = defaultResponse(
        true,
        err.statusCode || 500,
        err.message
      );
      return res.status(response.status).json({ ...response });
    });
};

exports.deleteContactById = async (req, res) => {
  const { idContact } = req.params;

  await database
    .ref(`${db_ref}/${idContact}`)
    .remove()
    .then(() => {
      const response = defaultResponse(false, 200, "ok");
      return res.status(200).json({ ...response });
    })
    .catch((err) => {
      const response = defaultResponse(
        true,
        err.statusCode || 500,
        err.message
      );
      return res.status(response.status).json({ ...response });
    });
};

exports.updateContact = async (req, res) => {
  const { idContact } = req.params;
  const payload = req.body;

  await database
    .ref(`${db_ref}/${idContact}`)
    .update(payload)
    .then((records) => {
      console.log(records);
      return res.send("ok");
    })
    .catch((err) => {
      res.send("error");
    });
};
