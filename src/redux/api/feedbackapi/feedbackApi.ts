
import axios from "axios";
const API_URL = "http://localhost:3003/feedbacks";

export const fetchFeedbacksApi = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addFeedbackApi = async (payload) => {
  const res = await axios.post(API_URL, payload);
  return res.data;
};
