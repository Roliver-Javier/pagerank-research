const express = require('express');
const router = express.Router();
const googleTrends = require('google-trends-api');
const fs = require('fs');

router.post('/keywords', (req, res) => {
  let writeStream = fs.createWriteStream('keywords.txt');
  try {
    writeStream.write(req.body.keywords.join(','));
    res.status(201).send();
  } catch (err) {
    res.status(404).send('Sorry, cannot find that');
  }
});
router.get('/metrics', async (req, res, next) => {
  fs.readFile('keywords.txt', 'utf8', async (err, keywords) => {
    if (err) {
      res.status(500).send();
      return console.log(err);
    }
    try {
      const keywordArr = keywords.split(',');
      let metrics = await googleTrends.interestOverTime({
        keyword: [...keywordArr],
      });

      if (metrics) {
        //const result = { keys: [...keywordArr], values: timelineData };
        res.send(metrics);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  });
});

module.exports = router;
