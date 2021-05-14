const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const rfidService = require('../services/rfid.service');
const https = require('http');
const extraService = require('../services/extra.service');

const createRfid = catchAsync(async (req, res) => {
  const rfid = await rfidService.createRfid(req.body);
  res.status(httpStatus.CREATED).send(rfid);
});
const getRfids = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'tagId', 'catInside']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await rfidService.queryRfids(filter, options);
  res.send(result);
});

const scannedRfid = catchAsync(async (req, res) => {
  const user = await rfidService.scannedRfid(req.params.tagId);

  if (!user) {
    https
      .get('http://127.0.0.1:5000/sendNotification?title=A stray animal is on the door', (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log(data.explanation);
        });
      })
      .on('error', (err) => {
        console.log('Error: ' + err.message);
      });
    throw new ApiError(httpStatus.NOT_FOUND, 'RFID not found');
  }

  const filter = pick(req.query, ['deviceToken']);
  const options = pick("{ sortBy: 'created_at:desc' }", [('sortBy', 'limit', 'page')]);

  const result = await extraService.queryRfids(filter, options);

  const resultArr = result.results;
  const newArr = resultArr[resultArr.length - 1];
  https
    .get(
      'http://127.0.0.1:5000/sendNotification?title=' + user.name + ' gained entry&deviceToken=' + newArr.deviceToken,
      (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log(data.explanation);
        });
      }
    )
    .on('error', (err) => {
      console.log('Error: ' + err.message);
    });
  if (newArr.entryOnly) {
    if (!user.catInside) {
      https
        .get('http://127.0.0.1:5000/stepperRotateOpen', (resp) => {
          let data = '';

          // A chunk of data has been received.
          resp.on('data', (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            console.log(data.explanation);
          });
        })
        .on('error', (err) => {
          console.log('Error: ' + err.message);
        });
      const rfid = await rfidService.updateRfidById(req.params.tagId);
      res.send(rfid);
    } else {
      res.send('cat outside');
    }
  } else {
    https
      .get('http://127.0.0.1:5000/stepperRotateOpen', (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log(data.explanation);
        });
      })
      .on('error', (err) => {
        console.log('Error: ' + err.message);
      });
    const rfid = await rfidService.updateRfidById(req.params.tagId);
    res.send(rfid);
  }
});

const getRfid = catchAsync(async (req, res) => {
  const user = await rfidService.getRfidByTagId(req.params.tagId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RFID not found');
  }
  res.send(user);
});

const deleteRfid = catchAsync(async (req, res) => {
  await rfidService.deleteRfidById(req.params.tagId);
  res.status(httpStatus.NO_CONTENT).send();
});
module.exports = {
  createRfid,
  getRfids,
  getRfid,
  scannedRfid,
  deleteRfid,
};
