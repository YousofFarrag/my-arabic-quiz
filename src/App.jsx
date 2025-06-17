import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResultsModal, setShowResultsModal] = useState(false);

  // Questions array (no duplicates)
  const questions = [
    {
      question: "أنا ______ معلم.",
      options: ["هو", "هي", "أنت", "أكون"],
      correctAnswer: "أكون"
    },
    {
      question: "الطعام في ______.",
      options: ["السرير", "المطبخ", "الشارع", "السيارة"],
      correctAnswer: "المطبخ"
    },
    {
      question: "الطقس ______ اليوم.",
      options: ["لذيذ", "جميل", "صغير", "عجوز"],
      correctAnswer: "جميل"
    },
    {
      question: "أذهب إلى ______ كل صباح.",
      options: ["النوم", "اللعب", "المدرسة", "الأكل"],
      correctAnswer: "المدرسة"
    },
    {
      question: "______ التفاح أحمر اللون.",
      options: ["القلم", "الكرسي", "الكلب", "التفاح"],
      correctAnswer: "التفاح"
    }
  ];

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (option) => {
    if (!isAnswerChecked) {
      setSelectedAnswer(option);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer) {
      setIsAnswerChecked(true);
      if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        setScore(prevScore => prevScore + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setShowResultsModal(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setShowResultsModal(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div dir="rtl" style={{ width: '100%' }}>
      <div className="quiz-container">
        <h1 className="quiz-title"> تعلم اللغة العربية </h1>
        <p className="quiz-desc">أجب عن الأسئلة التالية.</p>
        <div className="question-counter">
          السؤال {currentQuestionIndex + 1} من {questions.length}
        </div>
        <div className="question-box">
          <p className="question-text">{currentQuestion.question}</p>
        </div>
        <div className="options-grid">
          {currentQuestion.options.map((option, index) => {
            let btnClass = 'option-btn';
            if (selectedAnswer === option) {
              if (isAnswerChecked) {
                btnClass += option === currentQuestion.correctAnswer ? ' correct' : ' wrong';
              } else {
                btnClass += ' selected';
              }
            } else if (isAnswerChecked && option === currentQuestion.correctAnswer) {
              btnClass += ' correct';
            }
            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={btnClass}
                disabled={isAnswerChecked}
              >
                {option}
              </button>
            );
          })}
        </div>
        {isAnswerChecked && (
          <div className={`feedback-box ${selectedAnswer === currentQuestion.correctAnswer ? 'correct' : 'wrong'}`}>
            {selectedAnswer === currentQuestion.correctAnswer ? (
              <span>إجابة صحيحة!</span>
            ) : (
              <span>إجابة خاطئة. الإجابة الصحيحة هي: <span style={{ color: '#15803d' }}>{currentQuestion.correctAnswer}</span></span>
            )}
          </div>
        )}
        <div>
          {!isAnswerChecked ? (
            <button
              onClick={handleCheckAnswer}
              className="action-btn"
              disabled={!selectedAnswer}
            >
              تحقق من الإجابة
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="action-btn"
            >
              {currentQuestionIndex === questions.length - 1 ? "عرض النتائج" : "السؤال التالي"}
            </button>
          )}
        </div>
      </div>
      {showResultsModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="results-modal">
            <h2 className="results-title">النتائج النهائية</h2>
            <div className="results-score">
              لقد حصلت على <span style={{ color: '#22c55e', fontWeight: 800 }}>{score}</span> من أصل <span style={{ color: '#2563eb', fontWeight: 800 }}>{questions.length}</span> إجابات صحيحة!
            </div>
            <button
              onClick={handleRestartQuiz}
              className="restart-btn"
            >
              ابدأ الاختبار مرة أخرى
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
