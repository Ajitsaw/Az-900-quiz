'use client';

import { useState, useEffect } from 'react';
import { getRandomQuestion } from '../data/questions';

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  useEffect(() => {
    // Load initial random question
    loadNewQuestion();
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

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading quiz...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="quiz-container">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Quiz Application
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-4">
            <span className="text-sm text-gray-600">Question ID: {currentQuestion.id}</span>
          </div>
          
          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
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
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>

          {showAnswer && (
            <div className="answer-reveal mt-4">
              <strong>Correct Answer:</strong> {currentQuestion.answer}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={handleRevealAnswer}
              disabled={showAnswer}
              className={`btn ${showAnswer ? 'btn-secondary' : 'btn-primary'} ${showAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {showAnswer ? 'Answer Revealed' : 'Reveal Answer'}
            </button>

            <button
              onClick={handleNextQuestion}
              className="btn btn-primary"
            >
              Next Question
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          Answered: {answeredQuestions.size} questions
        </div>
      </div>
    </div>
  );
}