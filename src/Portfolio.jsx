import { useState, useEffect, useRef } from "react";
import { ExternalLink, Mail, Phone, ChevronDown, Code2, Briefcase, Sparkles, Zap, Shield, BarChart3, Globe, Layers, Coffee, MessageSquare, BookOpen, ArrowUpRight, FileText, PenTool, Eye, Lock, Lightbulb, Users, GitBranch, Calendar, ChevronRight } from "lucide-react";

// ─── Scroll-Fade Section ───
function FadeSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Skill Pill ───
function Pill({ children, color = "blue" }) {
  const c = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    pink: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    slate: "bg-slate-700/40 text-slate-300 border-slate-600/30",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${c[color]||c.blue}`}>{children}</span>;
}

// ─── Animated Score Ring ───
function ScoreRing({ score, size = 100 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const [go, setGo] = useState(false);
  const sw = 6, r = (size - sw) / 2, circ = 2 * Math.PI * r;
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!go) return;
    let c = 0; const step = score / 50;
    const t = setInterval(() => { c += step; if (c >= score) { setVal(score); clearInterval(t); } else setVal(Math.floor(c)); }, 16);
    return () => clearInterval(t);
  }, [go, score]);
  const off = circ - (val / 100) * circ;
  const col = score >= 90 ? "#22c55e" : score >= 70 ? "#eab308" : score >= 50 ? "#f97316" : "#ef4444";
  return (
    <div ref={ref} className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 absolute">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e293b" strokeWidth={sw} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={sw}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 1.2s ease-out" }} />
      </svg>
      <span className="text-xl font-bold text-white">{val}</span>
    </div>
  );
}

// ─── Flow Diagram ───
function FlowDiagram({ steps }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs">
      {steps.map((s, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="px-2.5 py-1 bg-slate-800/80 border border-slate-700/40 rounded-lg text-slate-300">{s}</span>
          {i < steps.length - 1 && <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />}
        </span>
      ))}
    </div>
  );
}

// ─── Challenge Card ───
function ChallengeCard({ icon: Icon, title, problem, solution, color = "blue" }) {
  const colors = { blue: "border-blue-500/30 bg-blue-500/5", green: "border-emerald-500/30 bg-emerald-500/5", purple: "border-purple-500/30 bg-purple-500/5", orange: "border-orange-500/30 bg-orange-500/5" };
  return (
    <div className={`p-5 rounded-xl border ${colors[color]} transition-all hover:scale-[1.01]`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-slate-400" />
        <h4 className="text-sm font-semibold text-white">{title}</h4>
      </div>
      <div className="space-y-2 text-xs leading-relaxed">
        <p className="text-slate-500"><span className="text-red-400/80 font-medium">문제:</span> {problem}</p>
        <p className="text-slate-400"><span className="text-emerald-400/80 font-medium">해결:</span> {solution}</p>
      </div>
    </div>
  );
}

// ─── Nav ───
function Nav({ active }) {
  const items = [
    { id: "hero", label: "소개" }, { id: "feels-off", label: "feels off" },
    { id: "commit-for-me", label: "commit for me" }, { id: "about", label: "경력 & 스킬" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
        <span className="text-white font-bold tracking-tight">SW<span className="text-blue-400">.</span></span>
        <div className="flex gap-1">
          {items.map((s) => (
            <button key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${active === s.id ? "bg-blue-500/10 text-blue-400" : "text-slate-500 hover:text-white"}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ═══════════════ MAIN ═══════════════
export default function Portfolio() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const ids = ["hero", "feels-off", "commit-for-me", "about"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.2 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <style>{`
        @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .grad-text { background:linear-gradient(135deg,#60a5fa,#a78bfa,#60a5fa); background-size:200% 200%;
          animation:gradientShift 4s ease infinite; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        html { scroll-behavior:smooth; }
        ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-track { background:#0f172a; } ::-webkit-scrollbar-thumb { background:#334155; border-radius:3px; }
        .case-study { scroll-margin-top: 3.5rem; }
      `}</style>

      <Nav active={active} />

      {/* ══════════ HERO ══════════ */}
      <section id="hero" className="case-study pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-400 mb-6">
              <Sparkles className="w-3 h-3" /> AI 도구를 적극 활용하는 개발자
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-3">김승우</h1>
            <p className="text-xl sm:text-2xl font-medium mb-6">
              <span className="grad-text">Frontend / Fullstack Developer</span>
            </p>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed mb-8">
              네트워크 보안 엔지니어 출신 → 프론트엔드 개발자 전향.
              React · TypeScript · Spring Boot 기반 7년차.
              WebRTC, WebAudioAPI, AI 연계 등 다양한 도메인에서 실무 경험을 쌓아왔습니다.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <a href="mailto:kopi05@kakao.com" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors">
                <Mail className="w-4 h-4" /> 연락하기
              </a>
              <a href="https://velog.io/@milo" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors">
                <BookOpen className="w-4 h-4" /> 블로그
              </a>
            </div>
          </FadeSection>

          {/* Quick project preview */}
          <FadeSection delay={200}>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { name: "feels off", desc: "AI UX 분석 서비스", color: "from-indigo-500/20 to-purple-500/20", border: "border-indigo-500/20", id: "feels-off" },
                { name: "commit for me", desc: "AI 개발 일지 자동 생성", color: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-500/20", id: "commit-for-me" },
              ].map((p) => (
                <button key={p.id} onClick={() => document.getElementById(p.id)?.scrollIntoView({ behavior: "smooth" })}
                  className={`group p-5 bg-gradient-to-br ${p.color} border ${p.border} rounded-2xl text-left hover:scale-[1.02] transition-all`}>
                  <p className="font-bold text-white mb-1">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.desc}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-3 group-hover:text-blue-400 transition-colors">
                    자세히 보기 <ArrowUpRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════ CASE STUDY 1: feels off ══════════ */}
      <section id="feels-off" className="case-study py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <FadeSection>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>🔍</div>
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Case Study 01</span>
                <h2 className="text-3xl font-bold text-white">feels off</h2>
              </div>
            </div>
            <p className="text-lg text-slate-300 mt-3 mb-2">스크린샷 한 장이면 AI가 UX를 분석하고, 개선 포인트 3개를 제안합니다.</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href="https://feels-off.vercel.app" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-medium transition-colors">
                <Globe className="w-3.5 h-3.5" /> Live Site
              </a>
              <a href="https://velog.io/@milo/이-UI-왜-불편하지-AI-UX-분석-사이트-feels-off-개발기" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium transition-colors">
                <BookOpen className="w-3.5 h-3.5" /> 개발기 블로그
              </a>
            </div>
          </FadeSection>

          {/* Motivation */}
          <FadeSection delay={100}>
            <div className="mt-12 p-6 bg-slate-900/60 border border-slate-800/50 rounded-2xl">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-400" /> 왜 만들었나
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                디자이너 없이 개발하다 보면 "뭔가 불편한데... 뭐가 문제지?" 하는 순간이 많습니다.
                Figma 커뮤니티에 올려도 피드백이 느리고, 주변에 물어보면 "괜찮은데?"로 끝나죠.
                <span className="text-white font-medium"> GPT-4o-mini에 Vision이 있으니, 스크린샷을 던지면 UX 전문가처럼 분석해주면 어떨까?</span>
              </p>
            </div>
          </FadeSection>

          {/* Core Flow */}
          <FadeSection delay={150}>
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" /> 핵심 플로우 (3~5초)
              </h3>
              <FlowDiagram steps={["스크린샷 업로드", "Sharp 리사이즈", "GPT-4o-mini Vision", "JSON 파싱", "결과 표시"]} />
              <p className="text-xs text-slate-500 mt-3">대기 중 2초마다 바뀌는 로딩 메시지 14개로 체감 대기시간 최소화</p>
            </div>
          </FadeSection>

          {/* Features Grid */}
          <FadeSection delay={200}>
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">주요 기능</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { emoji: "🌶️", title: "Roast 모드", desc: "독설가 UX 전문가 모드. 프롬프트 하나로 전환, 구현 비용 ~0" },
                  { emoji: "🥚", title: "이스터에그", desc: "feels off 자체를 분석하면 100점 + 극찬" },
                  { emoji: "🏛️", title: "Hall of Shame", desc: "분석 결과 공개 갤러리. 최저 점수 순 정렬" },
                  { emoji: "📊", title: "어드민 대시보드", desc: "가입자·분석수·토큰 사용량·일별 차트 (Recharts)" },
                  { emoji: "🔒", title: "3중 레이트 리밋", desc: "FingerprintJS + IP + userId 조합" },
                  { emoji: "💬", title: "카카오톡 공유", desc: "Kakao JS SDK lazy load" },
                ].map((f, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-slate-800/30 border border-slate-700/20 rounded-xl">
                    <span className="text-lg shrink-0">{f.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{f.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>

          {/* Tech Challenges */}
          <FadeSection delay={250}>
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" /> 기술적 도전
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <ChallengeCard icon={PenTool} color="purple"
                  title="프롬프트 엔지니어링 — AI를 UX 전문가로"
                  problem="점수가 60~70에 수렴. 대시보드에 '글씨가 많다'며 깎고, 잘 만든 UI에도 억지로 깎음"
                  solution="점수 분포 가이드 명시 + 컨텍스트 우선 파악 규칙 + suggestions 톤을 '더 좋아질 수 있는 점'으로 전환" />
                <ChallengeCard icon={Lock} color="orange"
                  title="Auth.js v5 + 카카오 연동 삽질 4연타"
                  problem="scope Configuration 에러, 기존 가입자 프로필 null, 배포 환경 즉시 로그아웃, 환경변수 trailing \\n"
                  solution="Auth 로직을 순수 함수로 추출 → 23개 테스트 케이스로 안정화. .trim()으로 환경변수 방어" />
                <ChallengeCard icon={Layers} color="blue"
                  title="이미지 저장 — S3 없이 base64"
                  problem="MVP에서 인프라 최소화 필요. 별도 스토리지 운영 부담"
                  solution="Sharp 768px JPEG 70% → base64로 DB 직접 저장. 이미지당 ~50-100KB, 500MB 무료 DB에 수천 건 수용" />
              </div>
            </div>
          </FadeSection>

          {/* Tech Stack + Cost */}
          <FadeSection delay={300}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">기술 스택</h3>
                <div className="flex flex-wrap gap-1.5">
                  {["Next.js 16", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "GPT-4o-mini Vision",
                    "Supabase PostgreSQL", "Prisma 7", "Auth.js v5", "Sharp", "FingerprintJS", "Vercel"
                  ].map((t) => <Pill key={t} color="slate">{t}</Pill>)}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">운영 비용</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "분석당", value: "$0.0002" },
                    { label: "월 100건 기준", value: "~$0.70" },
                    { label: "DB·호스팅", value: "무료" },
                    { label: "월 총 비용", value: "~$1" },
                  ].map((c, i) => (
                    <div key={i} className="p-2.5 bg-slate-800/30 border border-slate-700/20 rounded-lg text-center">
                      <p className="text-sm font-bold text-emerald-400">{c.value}</p>
                      <p className="text-xs text-slate-500">{c.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>

          {/* Learnings */}
          <FadeSection delay={350}>
            <div className="mt-10 p-5 bg-slate-800/20 border border-slate-700/20 rounded-2xl">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-orange-400" /> 배운 것들
              </h3>
              <div className="space-y-2">
                {[
                  "환경변수는 절대 믿지 마라 — .trim() 하나가 하루를 살린다",
                  "Auth 콜백에서 에러 나면 세션이 통째로 날아간다 — try-catch 필수",
                  "AI 프롬프트에 구체적인 숫자를 주면 더 다양한 결과가 나온다",
                  "로딩 시간이 길면 재밌는 메시지로 버텨라 — 체감 대기시간이 확 줄어든다",
                ].map((l, i) => (
                  <p key={i} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="text-blue-400 mt-px shrink-0">→</span> {l}
                  </p>
                ))}
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════ CASE STUDY 2: commit for me ══════════ */}
      <section id="commit-for-me" className="case-study py-20 px-6 bg-slate-900/30 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <FadeSection>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}>📝</div>
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Case Study 02</span>
                <h2 className="text-3xl font-bold text-white">commit for me</h2>
              </div>
            </div>
            <p className="text-lg text-slate-300 mt-3 mb-2">Git 커밋 로그를 넣으면 AI가 개발 일지를 자동으로 써줍니다.</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href="https://commit-for-me.vercel.app" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-medium transition-colors">
                <Globe className="w-3.5 h-3.5" /> Live Site
              </a>
              <a href="https://velog.io/@milo/커밋만-하세요.-일지는-제가-쓸게요-commit-for-me-만들었습니다" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium transition-colors">
                <BookOpen className="w-3.5 h-3.5" /> 개발기 블로그
              </a>
              <a href="https://velog.io/@milo/주변-개발자-피드백-하나로-서비스가-달라졌다" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium transition-colors">
                <MessageSquare className="w-3.5 h-3.5" /> 피드백 반영기
              </a>
            </div>
          </FadeSection>

          {/* Motivation */}
          <FadeSection delay={100}>
            <div className="mt-12 p-6 bg-slate-900/60 border border-slate-800/50 rounded-2xl">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-400" /> 왜 만들었나
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                개발 일지를 쓰는 건 중요하다는 걸 알지만, 코딩 끝나고 일지까지 쓰기가 귀찮습니다.
                <span className="text-white font-medium"> 커밋은 어차피 하니까 — 커밋 로그를 기반으로 일지를 자동 생성하면 어떨까?</span>
                라는 생각에서 시작했습니다.
              </p>
            </div>
          </FadeSection>

          {/* Core Flow */}
          <FadeSection delay={150}>
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" /> 핵심 플로우
              </h3>
              <FlowDiagram steps={["GitHub 로그인", "레포·날짜 선택", "커밋 목록 확인", "AI 일지 생성", "편집 & 내보내기"]} />
            </div>
          </FadeSection>

          {/* Features Grid */}
          <FadeSection delay={200}>
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">주요 기능</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { emoji: "🎯", title: "3가지 프리셋", desc: "개인 회고 / 이직 준비 / 팀 공유용" },
                  { emoji: "📊", title: "계층적 기간 요약", desc: "일간→주간→월간→연간 레고처럼 쌓는 구조" },
                  { emoji: "📦", title: "다중 레포 지원", desc: "통합/분리 모드 토글 전환" },
                  { emoji: "🔗", title: "Notion / Medium 내보내기", desc: "원클릭 외부 플랫폼 연동" },
                  { emoji: "🔥", title: "통계 대시보드", desc: "GitHub 스타일 히트맵, 월별 통계, 연속 기록" },
                  { emoji: "🛡️", title: "보안 레이어", desc: "Prompt Injection 15패턴 + Moderation API" },
                ].map((f, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-slate-800/30 border border-slate-700/20 rounded-xl">
                    <span className="text-lg shrink-0">{f.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{f.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>

          {/* Feedback-Driven Development */}
          <FadeSection delay={250}>
            <div className="mt-10 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
              <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" /> 피드백 주도 개발
              </h3>
              <p className="text-sm text-slate-400 mb-4">주변 개발자에게 써보라고 했더니, 예상 못한 질문이 돌아왔습니다.</p>
              <div className="space-y-4">
                <div className="pl-4 border-l-2 border-emerald-500/30">
                  <p className="text-sm text-white font-medium">"일지는 좋은데... 이걸 언제 다시 보지?"</p>
                  <p className="text-xs text-slate-500 mt-1">→ 일간 단위는 너무 파편화. 이력서 쓸 때 일지 수십 개를 뒤지는 건 비현실적</p>
                  <p className="text-xs text-emerald-400 mt-1">→ <span className="font-medium">계층적 요약 시스템 도입</span>: 주간 = 일간의 요약, 월간 = 주간의 요약, 연간 = 월간의 요약</p>
                </div>
                <div className="pl-4 border-l-2 border-emerald-500/30">
                  <p className="text-sm text-white font-medium">"레포가 하나가 아닌데..."</p>
                  <p className="text-xs text-slate-500 mt-1">→ 실무에선 frontend, backend, infra 레포가 분리. 하나만 선택하면 전체 그림이 안 나옴</p>
                  <p className="text-xs text-emerald-400 mt-1">→ <span className="font-medium">다중 레포 선택 + 통합/분리 모드</span> 추가</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 italic">"작은 피드백 하나가 핵심 기능이 될 수 있다"</p>
            </div>
          </FadeSection>

          {/* Tech Challenges */}
          <FadeSection delay={300}>
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" /> 기술적 도전
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <ChallengeCard icon={Layers} color="green"
                  title="계층적 요약 시스템 설계"
                  problem="월간 요약 시 일지 30개를 다시 읽으면 AI 토큰 낭비 + 요약 품질 저하"
                  solution="주간 요약 4개만 참고하는 레고 블록 구조. 토큰 절약 + 요약 품질 향상" />
                <ChallengeCard icon={Shield} color="orange"
                  title="Prompt Injection 방어"
                  problem="커밋 메시지에 악의적인 프롬프트를 넣는 공격 가능성"
                  solution="한/영 15개 패턴 탐지 + OpenAI Moderation API 입출력 검사 + Zod 스키마 전체 검증" />
              </div>
            </div>
          </FadeSection>

          {/* Tech Stack */}
          <FadeSection delay={350}>
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">기술 스택</h3>
              <div className="flex flex-wrap gap-1.5">
                {["Next.js 16", "TypeScript", "Tailwind CSS", "GPT-4o-mini", "Neon PostgreSQL",
                  "Prisma", "NextAuth.js v5", "Upstash Redis", "Zod", "Vercel"
                ].map((t) => <Pill key={t} color="slate">{t}</Pill>)}
              </div>
            </div>
          </FadeSection>

          {/* Learnings */}
          <FadeSection delay={400}>
            <div className="mt-10 p-5 bg-slate-800/20 border border-slate-700/20 rounded-2xl">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-orange-400" /> 배운 것들
              </h3>
              <div className="space-y-2">
                {[
                  "혼자 만들면 '내가 쓸 것'만 만들게 된다 — 다른 사람의 시선은 완전히 다른 사용 패턴을 보여준다",
                  "기록은 쌓는 것 자체가 목적이 아니다 — 추상화되어야 활용 가치가 높아진다",
                  "다중 레포는 예외가 아니라 실무의 기본값이다",
                  "AI가 커밋 메시지를 그대로 인용하지 않고 자연스럽게 풀어쓰게 만드는 프롬프트가 은근히 까다로웠다",
                ].map((l, i) => (
                  <p key={i} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="text-emerald-400 mt-px shrink-0">→</span> {l}
                  </p>
                ))}
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════ ABOUT (경력 & 스킬 — 간략) ══════════ */}
      <section id="about" className="case-study py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <FadeSection>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-blue-400" /> 경력 요약
            </h2>
          </FadeSection>

          {/* Career Timeline — compact */}
          <FadeSection delay={100}>
            <div className="space-y-3">
              {[
                { company: "주식회사 에이치나인", period: "2025.08 ~ 재직 중", role: "React · NFX Framework · Playwright · RAG · LLM", highlight: "SK하이닉스 NFX 프레임워크 고도화 & AI POC 프로젝트" },
                { company: "(주)투스카이", period: "2024.06 ~ 2025.08", role: "React · TypeScript · Jest · Zod", highlight: "SAP 대체 업무 시스템 긴급 인수→정식 오픈, 비상대피 기능 개발" },
                { company: "주식회사 온더라이브", period: "2022.04 ~ 2024.06", role: "React · Spring Boot · WebRTC · WebAudioAPI", highlight: "웹툰 더빙 도구, 중계방송 플랫폼, NLP 데이터 가공 등 6개 프로젝트" },
                { company: "주식회사 인포인", period: "2019.01 ~ 2022.02", role: "네트워크 보안 · 시스템 운영", highlight: "화성시 도시안전센터 네트워크 설계, 정보보안감사 S등급" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-slate-800/20 border border-slate-700/20 rounded-xl hover:bg-slate-800/40 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-sm font-semibold text-white">{c.company}</span>
                      <span className="text-xs text-slate-500">{c.period}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{c.highlight}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {c.role.split(" · ").map((t) => <Pill key={t} color="slate">{t}</Pill>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-600 mt-4">성결대학교 | 정보통신공학부 통신공학전공</p>
          </FadeSection>

          {/* Skills summary */}
          <FadeSection delay={200}>
            <div className="mt-12">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-purple-400" /> 기술 스택
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { cat: "Frontend", items: "React.js · TypeScript · Next.js · React Hook Form · Zod · Tailwind CSS · Framer Motion", color: "blue" },
                  { cat: "Testing", items: "Jest · Playwright (E2E)", color: "green" },
                  { cat: "Backend", items: "Spring Boot · Java · FastAPI · Python · MySQL · PostgreSQL · Prisma", color: "purple" },
                  { cat: "Infra & AI", items: "WebRTC · WebAudioAPI · WebSocket · OpenAI API · RAG · LLM · Penpot Plugin · MCP", color: "orange" },
                ].map((s) => (
                  <div key={s.cat} className="p-4 bg-slate-800/20 border border-slate-700/20 rounded-xl">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{s.cat}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.items.split(" · ").map((t) => <Pill key={t} color={s.color}>{t}</Pill>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════ FOOTER / CONTACT ══════════ */}
      <footer className="py-12 px-6 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <FadeSection>
            <h2 className="text-2xl font-bold mb-3">함께 일해요</h2>
            <p className="text-sm text-slate-400 mb-6">새로운 기회나 협업에 관심 있으시다면 편하게 연락주세요.</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <a href="mailto:kopi05@kakao.com" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors">
                <Mail className="w-4 h-4" /> kopi05@kakao.com
              </a>
              <a href="tel:+821072559534" className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors">
                <Phone className="w-4 h-4" /> 010-7255-9534
              </a>
            </div>
          </FadeSection>
          <p className="text-slate-700 text-xs mt-10">© 2026 김승우</p>
        </div>
      </footer>
    </div>
  );
}
