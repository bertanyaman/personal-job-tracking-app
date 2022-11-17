var express = require('express');
var router = express.Router();

/* GET priorities listing. */
router.get('/', function (req, res, next) {

  const priorityItems = [{
      value: 'Trivial',
      label: 'Trivial',
    },
    {
      value: 'Regular',
      label: 'Regular',
    },
    {
      value: 'Urgent',
      label: 'Urgent'
    }
  ];

  res.json({
    result: priorityItems
  });

});

module.exports = router;