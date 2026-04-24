const axios = require('axios');
const { BASE_URL, REG_NO } = require('./config');

const fetchEventsForPoll = (pollIndex) => {
  const url = `${BASE_URL}/quiz/messages?regNo=${REG_NO}&poll=${pollIndex}`;
  return axios.get(url);
};

const submitLeaderboard = (leaderboard) => {
  const url = `${BASE_URL}/quiz/submit`;
  const payload = {
    regNo: REG_NO,
    leaderboard,
  };
  return axios.post(url, payload);
};

// Use module.exports to expose the functions
module.exports = {
  fetchEventsForPoll,
  submitLeaderboard,
};