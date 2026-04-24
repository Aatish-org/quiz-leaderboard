const { fetchEventsForPoll, submitLeaderboard } = require('./apiService');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const runQuizChallenge = async () => {
  console.log('Starting the Quiz Leaderboard data aggregation process.');
  console.log('----------------------------------------------------');

  console.log('Phase 1: Polling API for event data...');
  const allEvents = [];
  for (let i = 0; i < 10; i++) {
    try {
      console.log(`Executing poll ${i + 1} of 10...`);
      const response = await fetchEventsForPoll(i);
      if (response.data && Array.isArray(response.data.events)) {
        allEvents.push(...response.data.events);
      }
    } catch (error) {
      console.error(`  -> Error during poll ${i + 1}: ${error.message}`);
    }
    if (i < 9) {
      await sleep(5000);
    }
  }
  console.log('\nPhase 1 Complete: Data polling finished.');
  console.log('----------------------------------------------------');

  console.log('\nPhase 2: Processing data and calculating scores...');
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
  console.log('Phase 2 Complete: Score aggregation finished.');
  console.log('----------------------------------------------------');

  console.log('\nPhase 3: Formatting and Finalizing Leaderboard...');
  let finalLeaderboard = [];
  for (const [participant, totalScore] of leaderboardScores.entries()) {
    finalLeaderboard.push({ participant, totalScore });
  }
  finalLeaderboard.sort((a, b) => b.totalScore - a.totalScore);
  console.log('Phase 3 Complete: Leaderboard finalized.');
  console.log('Final Leaderboard to be submitted:');
  console.table(finalLeaderboard);
  console.log('----------------------------------------------------');

  console.log('\nFinal Phase: Submitting the result to the validator...');
  try {
    const response = await submitLeaderboard(finalLeaderboard);
    console.log('Submission successful!');
    console.log('Server Response:');
    console.log(response.data);
  } catch (error) {
    console.error('An error occurred during submission:', error.response ? error.response.data : error.message);
  }
  console.log('----------------------------------------------------');
  console.log('\nChallenge complete!');
};

runQuizChallenge();