import axios from 'axios';
import { BASE_URL, REG_NO } from './config.js';

export const fetchEventsForPoll = (pollIndex) => {
  const url = `${BASE_URL}/quiz/messages?regNo=${REG_NO}&poll=${pollIndex}`;
  return axios.get(url);
};

export const submitLeaderboard = (leaderboard) => {
  const url = `${BASE_-URL}/quiz/submit`;
  const payload = { regNo: REG_NO, leaderboard };
  return axios.post(url, payload);
};