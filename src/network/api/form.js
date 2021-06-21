import request from "../index";

export const stepForm = (payload) => {
  return request({
    method:"post",
    url:"/api/form",
    data:payload
  })
}