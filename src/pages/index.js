'use client';

import { useState, useEffect } from 'react';
import { getRandomQuestion } from '../data/questions';

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [totalQuestions] = useState(100);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNewQuestion();
    setIsLoading(false);
  }, []);

  const loadNewQuestion = () => {
    const newQuestion = getRandomQuestion(currentQuestion?.id);
    setCurrentQuestion(newQuestion);
    setSelectedOption('');
    setShowAnswer(false);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleRevealAnswer = () => {
    setShowAnswer(true);
    if (currentQuestion) {
      setAnsweredQuestions(prev => new Set(prev).add(currentQuestion.id));
    }
  };

  const handleNextQuestion = () => {
    loadNewQuestion();
  };

  if (isLoading || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  const progressPercentage = (answeredQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen py-8">
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>Azure Certification Quiz</h1>
        </div>
        
        <div className="quiz-content">
          <div className="question-section">
            <div className="question-meta">
              <span className="question-number">Question {currentQuestion.id}</span>
              <span className="question-progress">{answeredQuestions.size} of {totalQuestions} answered</span>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <h2 className="question-text">{currentQuestion.question}</h2>

            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <label 
                  key={index}
                  className={`option-label ${selectedOption === option ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="quiz-option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionChange(option)}
                    className="option-input"
                  />
                  <span className="option-text">{option}</span>
                </label>
              ))}
            </div>

            {showAnswer && (
              <div className="answer-reveal">
                <h3>✅ Correct Answer:</h3>
                <p>{currentQuestion.answer}</p>
              </div>
            )}
          </div>

          <div className="quiz-controls">
            <button
              onClick={handleRevealAnswer}
              disabled={showAnswer || !selectedOption}
              className={`btn ${showAnswer ? 'btn-secondary' : 'btn-success'} ${!selectedOption ? '' : 'btn-pulse'}`}
            >
              {showAnswer ? '✓ Answer Revealed' : '🔍 Reveal Answer'}
            </button>

            <button
              onClick={handleNextQuestion}
              className="btn btn-primary"
            >
              Next Question →
            </button>
          </div>

          <div className="quiz-stats">
            <div className="stat-item">
              <span className="stat-number">{answeredQuestions.size}</span>
              <span className="stat-label">Answered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{totalQuestions - answeredQuestions.size}</span>
              <span className="stat-label">Remaining</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{Math.round(progressPercentage)}%</span>
              <span className="stat-label">Complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}