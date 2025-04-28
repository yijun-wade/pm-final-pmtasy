'use client';

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

// ✅ 퀘스트 배열
const quests = [
  { emoji: "🎯", title: "사이드 프로젝트 기획하기", description: "작은 아이디어를 기획서로 정리해보세요", xp: 20 },
  { emoji: "📚", title: "PM 관련 도서 1권 읽기", description: '"INSPIRED" 같은 책을 읽어보세요', xp: 15 },
  { emoji: "🧠", title: "유저 인터뷰 3회 진행하기", description: "주변 지인 대상으로 짧게 인터뷰", xp: 25 },
  { emoji: "🎤", title: "팀원 피드백 세션 열어보기", description: "팀원들에게 직접 피드백 받기", xp: 20 },
  { emoji: "🚀", title: "신규 서비스 아이디어 제안하기", description: "상상력을 발휘해서 서비스 제안서 작성", xp: 30 },
  { emoji: "🛠️", title: "프로토타입 툴 사용해보기", description: "Figma, ProtoPie 등을 써서 아이디어 스케치", xp: 15 },
  { emoji: "📈", title: "간단한 데이터 분석하기", description: "SQL이나 스프레드시트로 데이터 가공해보기", xp: 20 },
  { emoji: "📝", title: "PRD 문서 작성 연습", description: "제품 요구사항 문서를 1개 써보기", xp: 25 },
  { emoji: "🤝", title: "다른 PM과 커피챗 하기", description: "업계 PM과 1:1 대화 나누기", xp: 20 },
  { emoji: "🎯", title: "2주간 나만의 목표 설정 & 리뷰", description: "스스로 정한 목표를 2주간 관리하고 돌아보기", xp: 30 },
];

export default function ResultPage() {
  const searchParams = useSearchParams();
  const answerString = searchParams.get("answers");

  const [completed, setCompleted] = useState(Array(quests.length).fill(false));
  const [xp, setXp] = useState(0);

  const handleComplete = (index: number) => {
    const newCompleted = [...completed];
    newCompleted[index] = true;
    setCompleted(newCompleted);
    setXp(prev => prev + quests[index].xp);
  };

  // average 계산시 NaN 처리
  const average = answerString
    ? answerString.split(",").map(Number).reduce((acc, cur) => acc + cur, 0) / answerString.split(",").length
    : 0;

  // NaN이 나오지 않도록 처리
  const finalAverage = isNaN(average) ? 0 : average;

  let levelName = "";
  let message = "";

  if (finalAverage < 2) {
    levelName = "Lv.1 PM 알 까기";
    message = "아직 PM 초보입니다. 작은 경험부터 차근차근 쌓아보세요!";
  } else if (finalAverage < 3) {
    levelName = "Lv.2 PM 수습 기간";
    message = "기본적인 PM 스킬을 갖춘 상태입니다. 다양한 프로젝트 경험을 통해 더 많은 실전 감각을 쌓아보세요! 🔥";
  } else if (finalAverage < 4) {
    levelName = "Lv.3 프로젝트 리더";
    message = "여러 프로젝트를 리딩할 수 있는 역량을 갖추었습니다! 이제 더 큰 프로젝트를 도전해보세요! 🚀";
  } else if (finalAverage < 4.5) {
    levelName = "Lv.4 프로덕트 주술사";
    message = "PM 역량이 매우 높습니다! 전략적 사고와 실행을 동시에 할 수 있는 레벨입니다! 🌟";
  } else {
    levelName = "Lv.5 전설의 PM";
    message = "PM계의 전설! 누구보다 탁월한 리더십과 제품 통찰력을 갖췄습니다! 🏆";
  }

  const completedCount = completed.filter(c => c).length;

  let badge = "";
  if (completedCount >= 9) {
    badge = "🏆 전설의 PM 뱃지";
  } else if (completedCount >= 6) {
    badge = "🏅 성장하는 PM 뱃지";
  } else if (completedCount >= 3) {
    badge = "🎖 신입 PM 뱃지";
  }

  // 공유 함수 추가
  const handleShare = () => {
    const shareText = `PM 성장 퀴즈 결과: 당신의 레벨은 ${levelName}입니다! 경험치: ${xp}/100XP. 퀴즈를 함께 풀어보세요!`;
    const shareUrl = window.location.href; // 현재 페이지 URL
    const shareMessage = `${shareText} ${shareUrl}`;
    
    // 클립보드에 복사
    navigator.clipboard.writeText(shareMessage).then(() => {
      // 복사 성공 시 알림
      alert('링크가 클립보드에 복사되었습니다. 친구들에게 공유해보세요!');
    }).catch((error) => {
      // 실패 시 알림
      console.error('복사 실패', error);
      alert('링크 복사에 실패했습니다. 다시 시도해주세요.');
    });
  };

  // 다시 퀴즈풀기 페이지로 이동
  const handleRestartQuiz = () => {
    window.location.href = "/quiz"; // 퀴즈 페이지 URL
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div style={{ minHeight: '100vh', backgroundColor: '#0d1117', color: '#fff' }}>
        {/* XP Progress Bar - sticky */}
        <div style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#0d1117',
          zIndex: 50,
          padding: '10px',
        }}>
          <div style={{
            width: '90%',
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#374151',
            borderRadius: '10px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${Math.min(xp, 100)}%`,
              backgroundColor: '#facc15',
              height: '12px',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <p style={{ textAlign: 'center', marginTop: '6px', fontSize: '14px', color: '#d1d5db' }}>
            경험치: {xp} / 100 XP
          </p>
        </div>

        {/* 본문 */}
        <div style={{ padding: '40px 20px' }}>
          {/* 레벨 결과 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              backgroundColor: '#161b22',
              padding: '30px',
              borderRadius: '20px',
              textAlign: 'center',
              width: '90%',
              maxWidth: '500px',
              margin: '0 auto',
              marginBottom: '40px',
            }}
          >
            <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>{levelName}</h1>
            <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#d1d5db' }}>{message}</h2>
            <p style={{ color: '#6b7280' }}>당신의 평균 점수: {finalAverage.toFixed(2)}점</p>
          </motion.div>

          {/* 뱃지 */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                margin: '20px auto',
                padding: '16px 24px',
                backgroundColor: '#facc15',
                color: '#1f2937',
                borderRadius: '16px',
                width: 'fit-content',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              {badge}
            </motion.div>
          )}

          {/* 결과 공유 버튼 */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={handleShare}
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
              결과 공유하기
            </button>
          </div>

          {/* 레벨업 미션 제목 */}
          <div style={{ textAlign: 'center', margin: '40px 0' }}>
            <h2 style={{ fontSize: '24px', color: '#facc15', fontWeight: 'bold' }}>
              🚀 레벨업 미션을 시작하세요!
            </h2>
          </div>

          {/* 퀘스트 3열 그리드 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
          }}>
            {quests.map((quest, index) => {
              const isCoffeeChat = quest.title.includes("커피챗");
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    backgroundColor: isCoffeeChat ? '#fde68a' : completed[index] ? '#374151' : '#2d333b',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: isCoffeeChat
                      ? '0 0 20px #facc15'
                      : '0 4px 8px rgba(0,0,0,0.3)',
                    color: isCoffeeChat ? '#1f2937' : '#f0f6fc',
                  }}
                >
                  <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{quest.emoji} {quest.title}</h3>
                  <p style={{ marginBottom: '10px', color: isCoffeeChat ? '#374151' : '#d1d5db' }}>{quest.description}</p>
                  {isCoffeeChat ? (
                    <a
                      href="https://forms.gle/T81nVJPfXgpSMzoW7"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '8px 12px',
                        backgroundColor: '#facc15',
                        color: '#1f2937',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        marginTop: '10px',
                        cursor: 'pointer',
                      }}
                    >
                      미션 해볼게요
                    </a>
                  ) : (
                    completed[index] ? (
                      <button
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#9ca3af',
                          color: '#1f2937',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: 'bold',
                          cursor: 'not-allowed',
                          marginTop: '10px'
                        }}
                        disabled
                      >
                        완료됨
                      </button>
                    ) : (
                      <button
                        onClick={() => handleComplete(index)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#facc15',
                          color: '#1f2937',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          marginTop: '10px'
                        }}
                      >
                        미션 해볼게요 (+{quest.xp}xp)
                      </button>
                    )
                  )}
                </motion.div>
              );
            })}
          </div>
          
          {/* 다시 퀴즈풀기 버튼 */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={handleRestartQuiz}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4caf50',  // 다른 색상으로 변경
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              다시 퀴즈 풀기
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
}