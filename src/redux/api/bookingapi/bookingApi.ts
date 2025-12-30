import axios from "axios";
const API_URL = "http://localhost:3003/bookings";

export const fetchBookingsApi = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addBookingApi = async (payload) => {
  const res = await axios.post(API_URL, payload);
  return res.data;
};

export const updateBookingStatusApi = async (id, status) => {
  const res = await axios.patch(`${API_URL}/${id}`, { status });
  return res.data;
};
