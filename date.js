

module.exports.getdate=getdate;
function getdate()
{
  var today=new Date();
  var currday=today.toLocaleDateString("eng-us");
  return currday;
}

module.exports.getday=getday
function getday()
{
  var today=new Date();
  var currday=today.getDay();
  return currday;
}

// module.exports is an object in a Node.js file that holds the exported values and functions from that module
