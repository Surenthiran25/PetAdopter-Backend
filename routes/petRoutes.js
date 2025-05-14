const express = require('express');
const {
  getPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
  updatePetStatus
} = require('../controllers/petController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.route('/')
  .get(getPets)
  .post(protect, authorize('admin'), upload.array('photos', 5), createPet);

router.route('/:id')
  .get(getPet)
  .put(protect, authorize('admin'), upload.array('photos', 5), updatePet)
  .delete(protect, authorize('admin'), deletePet);

router.put('/:id/status', protect, authorize('admin'), updatePetStatus);

module.exports = router;