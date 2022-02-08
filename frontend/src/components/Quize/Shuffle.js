export const shuffleAnswers = (question) => {
  if (!question) {
    return [];
  }

  return question
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};
