import axios from "axios";
import { useHistory } from "react-router-dom";

export const loginCall = async (userCreadential, dispatch) => {
  dispatch({ type: "LOGIN_START" });

  try {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      userCreadential
    );
    dispatch({ type: "LOGIN_SUCCESS", playload: res.data });
    // useHistory.push('/')
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL" });
  }
};
