import request from "../index";


export const chartOptions = (id) => {
  return request({
    method:'GET',
    url:'/api/dashboard/chart',
    params:{
      id
    }
  })
}