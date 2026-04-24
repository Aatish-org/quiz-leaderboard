const axios = require('axios');

const BASE_URL = 'https://devapigw.vidalhealthtpa.com/srm-quiz-task';
const REG_NO = '2024CS101';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const runQuizChallenge = async () => {
  console.log("Starting the Quiz Leaderboard data aggregation process.");
  console.log("----------------------------------------------------");

  console.log("Phase 1: Polling API for event data...");
  const allEvents = [];
  for (let i = 0; i < 10; i++) {
    try {
      const url = `${BASE_URL}/quiz/messages?regNo=${REG_NO}&poll=${i}`;
      console.log(`Executing poll ${i + 1} of 10...`);
      const response = await axios.get(url);
      if (response.data && Array.isArray(response.data.events)) {
        allEvents.push(...response.data.events);
        console.log(`  -> Success: Retrieved ${response.data.events.length} events.`);
      } else {
        console.log(`  -> Notice: Poll ${i + 1} returned no events or has an unexpected format.`);
      }
    } catch (error) {
      console.error(`  -> Error during poll ${i + 1}: ${error.message}`);
    }
    if (i < 9) {
      console.log("  Pausing for 5 seconds as per API requirements...");
      await sleep(5000);
    }
  }
  console.log("\nPhase 1 Complete: Data polling finished.");
  console.log(`Total events collected: ${allEvents.length}.`);
  console.log("----------------------------------------------------");

  console.log("\nPhase 2: Processing data and calculating scores...");

  const leaderboardScores = new Map();
  const processedEntries = new Set();

  for (const event of allEvents) {
    const { roundId, participant, score } = event;
    const uniqueKey = `${roundId}-${participant}`;

    if (!processedEntries.has(uniqueKey)) {
      processedEntries.add(uniqueKey);
      const currentScore = leaderboardScores.get(participant) || 0;
      leaderboardScores.set(participant, currentScore + score);
    }
  }

  console.log("Phase 2 Complete: Score aggregation finished.");
  console.log(`Unique entries processed: ${processedEntries.size}.`);
  console.log("Aggregated scores:");

  for (const [participant, totalScore] of leaderboardScores.entries()) {
      console.log(`  - ${participant}: ${totalScore} points`);
  }
  console.log("----------------------------------------------------");
};

runQuizChallenge();