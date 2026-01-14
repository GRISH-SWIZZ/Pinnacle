export function calculateQuizScore(answers, correctAnswers) {
  if (!answers || !correctAnswers) return 0;
  
  const totalQuestions = Object.keys(correctAnswers).length;
  if (totalQuestions === 0) return 0;
  
  let correctCount = 0;
  Object.keys(correctAnswers).forEach((questionId) => {
    if (answers[questionId] === correctAnswers[questionId]) {
      correctCount++;
    }
  });
  
  return Math.round((correctCount / totalQuestions) * 100);
}

export function calculateExamScore(answers, questions) {
  if (!answers || !questions || questions.length === 0) return { score: 0, correctCount: 0, totalQuestions: 0 };
  
  const totalQuestions = questions.length;
  let correctCount = 0;
  
  questions.forEach((question) => {
    const userAnswer = answers[question.id];
    const correctAnswer = question.correctAnswer || question.options.find(opt => opt.isCorrect)?.id;
    
    if (userAnswer === correctAnswer) {
      correctCount++;
    }
  });
  
  const score = Math.round((correctCount / totalQuestions) * 100);
  
  return {
    score,
    correctCount,
    totalQuestions,
    passed: score >= (questions[0]?.passingScore || 70),
  };
}

export function calculateProgressPercentage(completed, total) {
  if (!total || total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function calculateAverageScore(scores) {
  if (!scores || scores.length === 0) return 0;
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Math.round(sum / scores.length);
}