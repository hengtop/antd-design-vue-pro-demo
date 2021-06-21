/* 定义mock数据 */
function chart(method){
  let res = null;
  switch (method){
    case 'GET':
      res = [120, 40, 60, 45, 120, 34];
      break;
    default:
      res = null;  
  }
  return res;
}

module.exports = chart;