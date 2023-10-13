const SiteManager = require('../models/siteManagerModel');
const mongoose = require('mongoose');

// get all site managers
const getSiteManagers = async (req, res) => {
  const sitemanagers = await SiteManager.find({}).sort({ createdAt: -1 });

  res.status(200).json(sitemanagers);
};

// get single site manager
const getSiteManager = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such sitemanager' });
  }

  const sitemanager = await SiteManager.findById(id);

  if (!sitemanager) {
    return res.status(404).json({ error: 'No such found' });
  }

  res.status(200).json(sitemanager);
};

// create new site manager
const createSiteManager = async (req, res) => {
  const { name, username, sitename, siteaddress, mobileno, email, password } =
    req.body;

  // add to db
  try {
    const siteManager = await SiteManager.create({
      name,
      username,
      sitename,
      siteaddress,
      mobileno,
      email,
      password,
    });
    res.status(200).json(siteManager);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete site manager
const deleteSiteManager = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Site Manager' });
  }

  const sitemanager = await SiteManager.findOneAndDelete({ _id: id });

  if (!sitemanager) {
    return res.status(400).json({ error: 'No such found' });
  }

  res.status(200).json(sitemanager);
};

//update site manager
const updateSiteManager = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Site Manager' });
  }

  const sitemanager = await SiteManager.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!sitemanager) {
    return res.status(400).json({ error: 'No such found' });
  }

  res.status(200).json(sitemanager);
};

module.exports = {
  getSiteManagers,
  getSiteManager,
  createSiteManager,
  deleteSiteManager,
  updateSiteManager,
};
