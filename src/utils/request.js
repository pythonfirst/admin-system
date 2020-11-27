import axios from "axios";
import { Notification } from "ant-design-vue";

export function request(options) {
  return axios(options)
    .then(res => {
      console.log("res", res);
      return res;
    })
    .catch(error => {
      console.log("err", error.response); // 这里不明白为什么error是文字，error.response又可以作为对对象。
      const {
        response: { status, statusText }
      } = error;
      Notification.open({
        type: "error",
        message: status,
        description: statusText,
        onClick: () => {
          console.log("Notification Clicked!");
        }
      });
      return Promise.reject(error);
    });
}
