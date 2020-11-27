function chart(method) {
  let res = null;
  if (method === "GET") {
    res = [10, 40, 70, 10, 30, 50];
  } else {
    res = [];
  }
  return res;
}

module.exports = chart;
