const express = require('express');
const {
  getAdoptions,
  getAdoption,
  createAdoption,
  updateAdoptionStatus,
  deleteAdoption,
  getUserAdoptionHistory,
  getPetAdoptionRequests
} = require('../controllers/adoptionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getAdoptions)
  .post(protect, createAdoption);

router.route('/:id')
  .get(protect, getAdoption)
  .delete(protect, authorize('admin'), deleteAdoption);

router.put('/:id/status', protect, updateAdoptionStatus);
router.get('/history', protect, getUserAdoptionHistory);
router.get('/pet/:petId', protect, authorize('admin'), getPetAdoptionRequests);

module.exports = router;