module.exports = {
  succeed: function (result) {
    console.log('context succeed');
    console.log(result);
    process.exit(0);
  },

  fail: function (error) {
    console.error(error);
    process.exit(1);
  },

  done: function (error, result) {
    if (error) {
      console.error(error);
      process.exit(1);
    } else {
      console.log(result);
      process.exit(0);
    }
  }
};
