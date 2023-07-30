import axios from "axios";

class TestService {
  BASE_URL: string;
  responseMap: { [path: string]: any };

  constructor() {
    this.BASE_URL = "https://reqres.in/api/";
  }

  //protect against race conditions, we want the last result returned even if an earlier one takes longer
  async request(path: string, req: Promise<any>) {
    return req;
  }

  async get(path: string, params?: any) {
    return axios({
      method: "get",
      url: this.BASE_URL + path,
      params: params,
    }).then((res) => res.data);
  }

  async post(path: string, data?: any) {
    return axios({
      method: "post",
      url: this.BASE_URL + path,
      data: data,
    }).then((res) => res.data);
  }

  async patch(path: string, data?: any) {
    return axios({
      method: "patch",
      url: this.BASE_URL + path,
      data: data,
    }).then((res) => res.data);
  }

  async put(path: string, data?: any) {
    return axios({
      method: "put",
      url: this.BASE_URL + path,
      data: data,
    }).then((res) => res.data);
  }

  async delete(path: string, data?: any) {
    return axios({
      method: "delete",
      url: this.BASE_URL + path,
      data: data,
    }).then((res) => res.data);
  }
}

export default new TestService();
