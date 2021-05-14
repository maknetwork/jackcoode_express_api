const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const rfidValidation = require('../../validations/rfid.validation');
const rfidController = require('../../controllers/rfid.controller');

const router = express.Router();

router.route('/').post(validate(rfidValidation.createRfid), rfidController.createRfid).get(rfidController.getRfids);

router.route('/scanned/:tagId').get(validate(rfidValidation.scannedRfid), rfidController.scannedRfid);
router
  .route('/:tagId')
  .get(validate(rfidValidation.getRfid), rfidController.getRfid)
  .delete(validate(rfidValidation.deleteRfid), rfidController.deleteRfid);
module.exports = router;
