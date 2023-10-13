const express = require('express');
const {
  getSiteManagers,
  getSiteManager,
  createSiteManager,
  deleteSiteManager,
  updateSiteManager,
} = require('../controllers/siteManagerController');

const router = express.Router();

// GET all site managers
router.get('/', getSiteManagers);

// GET single site managers
router.get('/:id', getSiteManager);

//POST a site manager
router.post('/', createSiteManager);

//DELETE a site manager
router.delete('/:id', deleteSiteManager);

//UPDATE a site manager
router.patch('/:id', updateSiteManager);

module.exports = router;
