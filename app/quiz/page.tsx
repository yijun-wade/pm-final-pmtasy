'use client';

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";



// 10개 진단 문항 배열
const questions = [
  {
    question: "1. PM으로서 제품 비전과 전략을 설정할 때, 가장 중요한 요소는 무엇인가요?",
    options: ["시장 동향", "기술 혁신", "고객의 피드백", "경쟁사의 전략"],
    correctAnswer: "고객의 피드백",
    domain: "제품 비전 및 전략",
  },
  {
    question: "2. 고객의 요구 사항을 파악할 때 가장 효과적인 방법은 무엇인가요?",
    options: ["고객 인터뷰", "설문조사", "시장 조사", "SNS 분석"],
    correctAnswer: "고객 인터뷰",
    domain: "고객 요구 사항 파악 및 분석",
  },
  {
    question: "3. 기술적인 문제를 해결할 때 가장 우선시해야 할 요소는 무엇인가요?",
    options: ["개발 속도", "시스템 안정성", "유지보수성", "팀 리소스"],
    correctAnswer: "시스템 안정성",
    domain: "기술적 구현 및 아키텍처",
  },
  {
    question: "4. 팀원 간의 협업을 최적화하기 위한 가장 중요한 요소는 무엇인가요?",
    options: ["명확한 역할 분담", "정기적인 회의", "팀의 사기", "정확한 목표 설정"],
    correctAnswer: "정확한 목표 설정",
    domain: "팀워크와 리더십",
  },
  {
    question: "5. 비즈니스 목표를 설정할 때 중요한 지표는 무엇인가요?",
    options: ["ROAS(광고비 대비 수익)", "매출 성장률", "고객 만족도", "시장 점유율"],
    correctAnswer: "ROAS(광고비 대비 수익)",
    domain: "비즈니스 목표 및 ROI",
  },
  {
    question: "6. 데이터 기반 의사결정에서 중요한 것은 무엇인가요?",
    options: ["정확한 데이터 수집", "빠른 분석 도구", "리더의 직관", "경쟁사의 데이터"],
    correctAnswer: "정확한 데이터 수집",
    domain: "데이터 기반 의사결정",
  },
  {
    question: "7. 프로세스 개선을 위한 첫 번째 단계는 무엇인가요?",
    options: ["문제 정의", "목표 설정", "팀 구성", "프로세스 매핑"],
    correctAnswer: "문제 정의",
    domain: "프로세스 및 개선",
  },
  {
    question: "8. 팀 내 커뮤니케이션을 개선하기 위한 방법은 무엇인가요?",
    options: ["정기적인 피드백 세션", "명확한 업무 분배", "비공식적인 회의", "팀 외부와의 소통 강화"],
    correctAnswer: "정기적인 피드백 세션",
    domain: "팀워크와 리더십",
  },
  {
    question: "9. 제품 개선을 위한 데이터 분석 방법은 무엇인가요?",
    options: ["A/B 테스트", "고객 설문", "경쟁사 분석", "소셜 미디어 분석"],
    correctAnswer: "A/B 테스트",
    domain: "고객 요구 사항 파악 및 분석",
  },
  {
    question: "10. 비즈니스 목표와 ROI를 계산할 때 중요한 요소는 무엇인가요?",
    options: ["시장 트렌드", "고객 피드백", "투자 수익률", "경쟁사 분석"],
    correctAnswer: "투자 수익률",
    domain: "비즈니스 목표 및 ROI",
  },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 문항별 점수 계산 함수
  const scoreForQuestion = (question: any, answer: string) => {
    return question.correctAnswer === answer ? 10 : 0;  // 정답일 경우 10점 부여
  };

  // 총 점수 계산
  const totalScore = answers.reduce((total, answer, index) => {
    return total + scoreForQuestion(questions[index], answer);
  }, 0);

  // 레벨 계산 (예시: 0~40점은 레벨 1, 41~60점은 레벨 2, 등)
  const getLevel = (score: number) => {
    if (score <= 40) return 'Lv.1 초보 PM';  // 0~40점
    if (score <= 60) return 'Lv.2 중급 PM';  // 41~60점
    if (score <= 70) return 'Lv.3 숙련 PM';  // 61~70점
    if (score <= 90) return 'Lv.4 고급 PM';  // 71~90점
    return 'Lv.5 전설의 PM';  // 91~100점
  };

  // 결과 화면에서 표시할 레벨
  const level = getLevel(totalScore);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const answerString = answers.join(',');
    window.location.href = `/result?answers=${answerString}`;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d1117', color: '#fff' }}>
      <div style={{ padding: '40px 20px' }}>
        <h1 style={{ fontSize: '36px', textAlign: 'center' }}>PM 혼자만 레벨업</h1>
        <div style={{ maxWidth: '600px', margin: '0 auto', marginTop: '40px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#facc15' }}>
            {questions[currentQuestionIndex].question}
          </h2>

          {/* 선택지 */}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
            {questions[currentQuestionIndex].options.map((option, idx) => (
              <div
                key={idx}
                onClick={() => handleAnswerChange({ target: { value: option } } as React.ChangeEvent<HTMLInputElement>, currentQuestionIndex)}
                style={{
                  marginBottom: '10px',
                  backgroundColor: '#1f2937',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  backgroundColor: answers[currentQuestionIndex] === option ? '#facc15' : '#1f2937',
                }}
              >
                <label htmlFor={option} style={{ fontSize: '18px', color: '#f0f6fc' }}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* 네비게이션 */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          {currentQuestionIndex < questions.length - 1 && (
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              disabled={answers[currentQuestionIndex] === ''}
              style={{
                padding: '10px 20px',
                backgroundColor: '#facc15',
                color: '#1f2937',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                marginRight: '20px',
              }}
            >
              다음
            </button>
          )}
          {currentQuestionIndex === questions.length - 1 && (
            <button
              onClick={handleSubmit}
              style={{
                padding: '10px 20px',
                backgroundColor: '#facc15',
                color: '#1f2937',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              결과 보기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
