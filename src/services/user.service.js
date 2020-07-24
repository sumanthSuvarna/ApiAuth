import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3020/api/users";

class UserService {
  getPublicContent() {
    return "Home Page";
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
}

export default new UserService();
