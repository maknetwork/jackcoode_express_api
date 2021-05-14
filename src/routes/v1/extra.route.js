const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const extraValidation = require('../../validations/extra.validation');
const extraController = require('../../controllers/extra.controller');

const router = express.Router();

router.route('/').post(validate(extraValidation.createRfid), extraController.createRfid).get(extraController.getRfids);
router
  .route('/:deviceToken')
  .get(validate(extraValidation.getRfid), extraController.getRfid)
  .patch(validate(extraValidation.updateUser), extraController.updateUser)
  .delete(validate(extraValidation.deleteRfid), extraController.deleteRfid);
module.exports = router;
