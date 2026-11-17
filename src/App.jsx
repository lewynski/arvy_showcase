import React, { useState, useEffect, useRef } from 'react';
import {
  Wifi,
  RefreshCw,
  Smartphone,
  Cpu,
  Database,
  Sparkles,
  Sun,
  Moon,
  Layers,
  ShieldCheck,
  Users,
  ArrowRight,
  Copy,
  Check,
  Camera,
  CheckCircle2,
  XCircle,
  Heart,
  Play,
  Server,
  Box,
  Recycle,
  Router,
  Gift,
  Zap,
  Activity,
  Lock
} from 'lucide-react';

// ============================================================================
// GLOBAL STYLES (fade-in, pulse, drop animations)
// ============================================================================
const GLOBAL_CSS = `
@keyframes arvyFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes arvyPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(168, 132, 90, 0.45); } 50% { box-shadow: 0 0 0 10px rgba(168, 132, 90, 0); } }
@keyframes arvyFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
.arvy-fade { animation: arvyFadeUp 0.7s ease both; }
.arvy-pulse { animation: arvyPulse 1.6s ease-in-out infinite; }
.arvy-float { animation: arvyFloat 4s ease-in-out infinite; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { scrollbar-width: none; }
`;

// ============================================================================
// CUSTOM SVG ILLUSTRATIONS: BIBO (PET BOTTLE) & ALU (ALUMINUM CAN)
// ============================================================================
const BiboCharacter = ({ mood = 'happy', onClick }) => {
  const isExcited = mood === 'excited';
  const isCheering = mood === 'cheering';

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer select-none transition-transform duration-300 ${
        isExcited ? 'scale-110 -rotate-6' : isCheering ? '-translate-y-2 scale-105' : 'hover:scale-105'
      }`}
      title="Tap or poke Bibo!"
    >
      {(isExcited || isCheering) && (
        <span className="absolute -top-3 right-1 text-[#E07A6B] animate-bounce pointer-events-none">
          <Heart className="w-4 h-4 fill-current" />
        </span>
      )}
      <svg width="74" height="98" viewBox="0 0 90 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="33" y="6" width="24" height="10" rx="3" fill="#5A9A96" stroke="#2C2520" strokeWidth="2.5" />
        <line x1="38" y1="6" x2="38" y2="16" stroke="#2C2520" strokeWidth="1.5" />
        <line x1="45" y1="6" x2="45" y2="16" stroke="#2C2520" strokeWidth="1.5" />
        <line x1="52" y1="6" x2="52" y2="16" stroke="#2C2520" strokeWidth="1.5" />
        <path d="M36 16H54L58 28H32L36 16Z" fill="#B5DFDB" stroke="#2C2520" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="23" y="28" width="44" height="68" rx="14" fill="#9BD1CC" stroke="#2C2520" strokeWidth="2.5" />
        <path d="M30 36V84" stroke="#E2F5F3" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
        <rect x="24" y="62" width="42" height="18" fill="#7AB8B2" opacity="0.65" />
        <line x1="23" y1="62" x2="67" y2="62" stroke="#2C2520" strokeWidth="1.8" />
        <line x1="23" y1="80" x2="67" y2="80" stroke="#2C2520" strokeWidth="1.8" />
        {isExcited ? (
          <>
            <path d="M33 46L38 43L33 40" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M57 46L52 43L57 40" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M40 50C40 55 50 55 50 50H40Z" fill="#E07A6B" stroke="#2C2520" strokeWidth="2" />
          </>
        ) : (
          <>
            <circle cx="36" cy="44" r="3" fill="#2C2520" />
            <circle cx="35" cy="43" r="1" fill="#FFFFFF" />
            <circle cx="54" cy="44" r="3" fill="#2C2520" />
            <circle cx="53" cy="43" r="1" fill="#FFFFFF" />
            <path d="M41 49C43 52 47 52 49 49" stroke="#2C2520" strokeWidth="2.2" strokeLinecap="round" />
          </>
        )}
        <ellipse cx="31" cy="49" rx="3.5" ry="2" fill="#E88D82" opacity="0.7" />
        <ellipse cx="59" cy="49" rx="3.5" ry="2" fill="#E88D82" opacity="0.7" />
        {isCheering || isExcited ? (
          <>
            <path d="M23 54C14 48 12 40 16 35" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M67 54C76 48 78 40 74 35" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M23 58C16 61 15 68 19 72" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M67 58C74 61 75 68 71 72" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}
        <path d="M36 96V108H31" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M54 96V108H59" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

const AluCharacter = ({ mood = 'happy', onClick }) => {
  const isExcited = mood === 'excited';
  const isCheering = mood === 'cheering';

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer select-none transition-transform duration-300 ${
        isExcited ? 'scale-110 rotate-6' : isCheering ? '-translate-y-2 scale-105' : 'hover:scale-105'
      }`}
      title="Tap or poke Alu!"
    >
      {(isExcited || isCheering) && (
        <span className="absolute -top-3 left-1 text-[#A8845A] animate-bounce pointer-events-none">
          <Sparkles className="w-4 h-4 fill-current" />
        </span>
      )}
      <svg width="74" height="98" viewBox="0 0 90 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42 12C42 9 48 9 48 12V17H42V12Z" stroke="#2C2520" strokeWidth="2" fill="#D5D8DC" />
        <rect x="24" y="17" width="42" height="6" rx="3" fill="#E5E8EC" stroke="#2C2520" strokeWidth="2.5" />
        <rect x="22" y="23" width="46" height="71" rx="8" fill="#CFD4DC" stroke="#2C2520" strokeWidth="2.5" />
        <rect x="23.5" y="59" width="43" height="17" fill="#C49A76" opacity="0.72" />
        <line x1="22" y1="59" x2="68" y2="59" stroke="#2C2520" strokeWidth="1.8" />
        <line x1="22" y1="76" x2="68" y2="76" stroke="#2C2520" strokeWidth="1.8" />
        <rect x="25" y="94" width="40" height="5" rx="2.5" fill="#B6BDC7" stroke="#2C2520" strokeWidth="2.2" />
        <path d="M29 29V87" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.75" />
        {isExcited ? (
          <>
            <path d="M33 43L38 40L33 37" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M57 43L52 40L57 37" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M40 47C40 52 50 52 50 47H40Z" fill="#E07A6B" stroke="#2C2520" strokeWidth="2" />
          </>
        ) : (
          <>
            <circle cx="36" cy="41" r="3" fill="#2C2520" />
            <circle cx="35" cy="40" r="1" fill="#FFFFFF" />
            <circle cx="54" cy="41" r="3" fill="#2C2520" />
            <circle cx="53" cy="40" r="1" fill="#FFFFFF" />
            <path d="M41 46C43 49 47 49 49 46" stroke="#2C2520" strokeWidth="2.2" strokeLinecap="round" />
          </>
        )}
        <ellipse cx="31" cy="46" rx="3.5" ry="2" fill="#E88D82" opacity="0.7" />
        <ellipse cx="59" cy="46" rx="3.5" ry="2" fill="#E88D82" opacity="0.7" />
        {isCheering || isExcited ? (
          <>
            <path d="M22 50C13 44 11 36 15 31" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M68 50C77 44 79 36 75 31" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M22 54C15 57 14 64 18 68" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M68 54C75 57 76 64 72 68" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}
        <path d="M36 99V109H31" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M54 99V109H59" stroke="#2C2520" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

// ============================================================================
// SMALL HELPERS
// ============================================================================
// Smoothly counts a number up (or down) to its new value.
const useAnimatedNumber = (target, duration = 700) => {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(from + (target - from) * t));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
};

const ptsWord = (n) => (n === 1 ? 'point' : 'points');

// ============================================================================
// DATA (every number here matches the ARVY Android app source code)
// ============================================================================
// Wi-Fi voucher tiers from MainActivity.java (pricing card)
const VOUCHER_TIERS = [
  { duration: '10 minutes', cost: 1, seconds: 600 },
  { duration: '30 minutes', cost: 3, seconds: 1800 },
  { duration: '1 hour', cost: 5, seconds: 3600 },
  { duration: '2 hours', cost: 9, seconds: 7200 },
  { duration: '3 hours', cost: 13, seconds: 10800 },
  { duration: '5 hours', cost: 20, seconds: 18000 },
  { duration: '8 hours', cost: 30, seconds: 28800 }
];

// Items the kiosk can take in the demo
const ITEMS = {
  'small-pet': { label: 'Small PET bottle', pts: 1, bin: 'pet-ok', rejected: false, btn: '+1 point' },
  'medium-pet': { label: 'Medium PET bottle', pts: 2, bin: 'pet-ok', rejected: false, btn: '+2 points' },
  can: { label: 'Aluminum can', pts: 3, bin: 'can-ok', rejected: false, btn: '+3 points' },
  crushed: { label: 'Crushed PET bottle', pts: 0, bin: 'pet-bad', rejected: true, btn: 'Crushed: 0 points' }
};

// The 2x2 sorting grid, in the same order as the physical bins
const BINS = [
  { id: 'pet-ok', label: 'Non-Deformed PET' },
  { id: 'pet-bad', label: 'Deformed PET' },
  { id: 'can-ok', label: 'Non-Deformed Cans' },
  { id: 'can-bad', label: 'Deformed Cans' }
];

// The four stages of the machine
const STAGES = [
  {
    number: '01',
    short: 'Camera',
    title: 'Two-Angle Camera Check',
    subtitle: 'Multi-View Optical Capture',
    plain: 'Two cameras photograph the item from two sides, so nothing hides in a blind spot.',
    description:
      'Servo 1 turns the inspection platform 90 degrees inside a matte white plywood box lit by LED strips. Two USB webcams capture two different views.',
    specs: ['2x 1080p USB webcams', 'Servo 1 (90° turntable)', 'Matte white plywood + LED'],
    icon: Camera
  },
  {
    number: '02',
    short: 'AI check',
    title: 'Material & Damage Check',
    subtitle: 'YOLOv8 / YOLOv11 Edge AI',
    plain: 'A fast AI looks at the photos and asks: is this a plastic bottle or a can, and is it crushed?',
    description:
      'The Raspberry Pi 4 runs the YOLO model on the device itself. It tells PET bottles from aluminum cans and checks whether each one is deformed.',
    specs: ['PET bottle vs. aluminum can', 'Deformed vs. non-deformed', 'Runs on the machine, no internet needed'],
    icon: Cpu
  },
  {
    number: '03',
    short: 'Bin sort',
    title: '2x2 Quadrant Bin Sorting',
    subtitle: 'Servo 2 Directional Drop',
    plain: 'A small motor tilts the tray, and the item drops into the right one of four bins.',
    description:
      'Servo 2 tilts the mid-shelf platform. Items drop into four square bins: Non-Deformed PET, Deformed PET, Non-Deformed Cans, and Deformed Cans.',
    specs: ['Servo 2 tilting release', '4 square-partitioned bins', '2x2 quadrant layout'],
    icon: Layers
  },
  {
    number: '04',
    short: 'Points',
    title: 'Cloud Sync & Wi-Fi Reward',
    subtitle: 'MongoDB Atlas + MikroTik Hotspot',
    plain: 'Accepted items add points to your account in the cloud. Your phone then shows the new balance.',
    description:
      'A Node.js and Express API saves your points to MongoDB Atlas. When you redeem points, the MikroTik hAP Lite router checks your voucher code and turns on your internet time.',
    specs: ['MongoDB Atlas cloud database', 'Node.js + Express on Render', 'MikroTik hAP Lite hotspot'],
    icon: Wifi
  }
];

const GLOSSARY = [
  { term: 'Raspberry Pi', meaning: 'A credit-card-sized computer. It is the machine\'s brain.' },
  { term: 'YOLO', meaning: 'A fast AI that spots objects in a photo, like a phone finding faces.' },
  { term: 'Servo', meaning: 'A small motor that turns or tilts a part to an exact angle.' },
  { term: 'MongoDB Atlas', meaning: 'An online database. Your points stay safe even if the machine breaks.' },
  { term: 'API', meaning: 'A messenger that carries data between the app and the database.' },
  { term: 'MikroTik hotspot', meaning: 'The Wi-Fi router that checks your voucher and turns on your internet time.' }
];

const TEAM_MEMBERS = [
  'Jhun Martin E. Bruzo',
  'Angel Briana Yesha A. Dimaano',
  'Frachette S. Dimapilis',
  'Aileen Jasmin L. Go',
  'Charles Nicholas Pamute',
  'Jon Lewyn V. Tanggaro'
];

// ============================================================================
// MAIN APPLICATION
// ============================================================================
export default function App() {
  // Splash screen
  const [showSplash, setShowSplash] = useState(true);
  const [splashFade, setSplashFade] = useState(false);

  // Light cream (default) or dark espresso
  const [darkMode, setDarkMode] = useState(false);

  // Shared app state (the phone and the kiosk both read and write these)
  const [phoneTab, setPhoneTab] = useState('dashboard');
  const [points, setPoints] = useState(36);
  const [bottlesCount, setBottlesCount] = useState(9);
  const [vouchersRedeemed, setVouchersRedeemed] = useState(2);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedText, setLastSyncedText] = useState('Synced with MongoDB Atlas');
  const [copiedUserId, setCopiedUserId] = useState(false);
  const [adminStatusMsg, setAdminStatusMsg] = useState('');

  // Bibo & Alu
  const [buddyMood, setBuddyMood] = useState('happy');
  const [buddySpeech, setBuddySpeech] = useState('Feed the machine and watch us cheer!');

  // Wi-Fi vouchers
  const [selectedTierIdx, setSelectedTierIdx] = useState(2);
  const [activeVoucher, setActiveVoucher] = useState(null);
  const [voucherSecondsLeft, setVoucherSecondsLeft] = useState(0);
  const [copiedVoucher, setCopiedVoucher] = useState(false);

  // Transaction log
  const [transactions, setTransactions] = useState([
    { id: 1, ts: '2026-09-22T04:18:14.149Z', text: 'Account logged in.', type: 'info' },
    { id: 2, ts: '2026-09-04T08:59:31.213Z', text: 'Accepted: Standard aluminum can | +3 point(s)', type: 'accepted' },
    { id: 3, ts: '2026-09-04T08:59:28.536Z', text: 'Accepted: Small plastic bottle | +1 point(s)', type: 'accepted' },
    { id: 4, ts: '2026-09-03T09:00:27.984Z', text: 'Damaged item rejected by integrity check. No points added.', type: 'rejected' },
    { id: 5, ts: '2026-09-03T09:00:25.299Z', text: 'Accepted: Standard aluminum can | +3 point(s)', type: 'accepted' },
    { id: 6, ts: '2026-09-03T08:59:59.323Z', text: 'Accepted: Medium plastic bottle | +2 point(s)', type: 'accepted' }
  ]);

  // Kiosk playground: which stage is lit, and what the last item did
  const [activeStep, setActiveStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [lastItemKey, setLastItemKey] = useState(null);
  const [outcome, setOutcome] = useState(null); // { ok, title, text }
  const timers = useRef([]);

  // "What can my points buy?" slider
  const [calcPoints, setCalcPoints] = useState(9);

  // Animated hero numbers
  const animPoints = useAnimatedNumber(points);
  const animItems = useAnimatedNumber(bottlesCount);
  const animVouchers = useAnimatedNumber(vouchersRedeemed);

  // Splash lifecycle
  useEffect(() => {
    if (!showSplash) return;
    const fadeTimer = setTimeout(() => setSplashFade(true), 900);
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
      setSplashFade(false);
    }, 1200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [showSplash]);

  // Voucher countdown
  useEffect(() => {
    if (!activeVoucher || voucherSecondsLeft <= 0) return;
    const interval = setInterval(() => {
      setVoucherSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeVoucher, voucherSecondsLeft]);

  // Clear pending kiosk animation timers when the page closes
  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const formatCountdown = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [hrs, mins, secs].map((val) => String(val).padStart(2, '0')).join(':');
  };

  // ---- Kiosk: run one item through the four stages -------------------------
  const insertItem = (key) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const item = ITEMS[key];
    // Rejected items stop at the sorting stage (they still go to a bin, with 0 points).
    // Accepted items go all the way to the cloud points step.
    const lastStage = item.rejected ? 2 : 3;

    setBusy(true);
    setOutcome(null);
    setLastItemKey(key);
    setActiveStep(0);
    setBuddyMood('cheering');

    for (let i = 1; i <= lastStage; i++) {
      timers.current.push(setTimeout(() => setActiveStep(i), i * 800));
    }

    timers.current.push(
      setTimeout(() => {
        setBusy(false);
        const nowIso = new Date().toISOString();

        if (item.rejected) {
          setOutcome({
            ok: false,
            title: 'Rejected: 0 points',
            text: 'The crushed item went to the Deformed PET bin. Crushed items earn nothing.'
          });
          setBuddySpeech('Bibo: Oops, I am crushed. Please bring me back uncrushed!');
          setTransactions((prev) => [
            { id: Date.now(), ts: nowIso, text: 'Damaged item rejected by integrity check. No points added.', type: 'rejected' },
            ...prev
          ]);
        } else {
          setPoints((p) => p + item.pts);
          setBottlesCount((b) => b + 1);
          setOutcome({
            ok: true,
            title: `Accepted: +${item.pts} ${ptsWord(item.pts)}`,
            text: `${item.label} sorted and saved to your account.`
          });
          setBuddySpeech(
            item.pts === 3
              ? 'Alu: Clink! Aluminum can accepted, +3 points!'
              : `Bibo: ${item.label} accepted, +${item.pts} ${ptsWord(item.pts)}!`
          );
          setTransactions((prev) => [
            {
              id: Date.now(),
              ts: nowIso,
              text: `Accepted: ${item.label} | +${item.pts} point(s)`,
              type: 'accepted'
            },
            ...prev
          ]);
        }

        timers.current.push(setTimeout(() => setBuddyMood('happy'), 1800));
      }, (lastStage + 1) * 800)
    );
  };

  // ---- Buddy poke -----------------------------------------------------------
  const handlePokeBuddy = (buddyName) => {
    setBuddyMood('excited');
    const messages =
      buddyName === 'Bibo'
        ? [
            'Bibo: Hehe, that tickles! Keep PET bottles uncrushed!',
            'Bibo: Two cameras checked me from every side!',
            'Bibo: Ready to turn plastic bottles into campus Wi-Fi!'
          ]
        : [
            'Alu: Clink-clank! Aluminum cans earn +3 points!',
            'Alu: Wiggle-wiggle! The MikroTik hotspot is online!',
            'Alu: Synced straight to MongoDB Atlas!'
          ];
    setBuddySpeech(messages[Math.floor(Math.random() * messages.length)]);
    setTimeout(() => setBuddyMood('happy'), 1400);
  };

  // ---- Pull-to-refresh style balance check ----------------------------------
  const handleSyncMongo = () => {
    setIsSyncing(true);
    setBuddyMood('cheering');
    setBuddySpeech('Checking your balance with MongoDB Atlas...');
    setTimeout(() => {
      setIsSyncing(false);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSyncedText(`Synced just now (${timeStr})`);
      setBuddyMood('happy');
      setBuddySpeech('Balance matches the database!');
    }, 700);
  };

  const handleCopyUserId = () => {
    navigator.clipboard?.writeText('USER-1363794689').catch(() => {});
    setCopiedUserId(true);
    setTimeout(() => setCopiedUserId(false), 1600);
  };

  // ---- Wi-Fi vouchers -------------------------------------------------------
  const handleRedeemVoucher = () => {
    const tier = VOUCHER_TIERS[selectedTierIdx];
    if (points < tier.cost) return;

    const code = `ARVY-${Math.floor(1000 + Math.random() * 9000)}`;

    setPoints((p) => p - tier.cost);
    setVouchersRedeemed((v) => v + 1);
    setActiveVoucher({ code, duration: tier.duration, cost: tier.cost });
    setVoucherSecondsLeft(tier.seconds);
    setBuddyMood('cheering');
    setBuddySpeech(`Redeemed ${tier.duration} of Wi-Fi!`);

    setTransactions((prev) => [
      {
        id: Date.now(),
        ts: new Date().toISOString(),
        text: `Redeemed WiFi Voucher (${tier.duration}) | -${tier.cost} pt(s) [${code}]`,
        type: 'voucher'
      },
      ...prev
    ]);
    setTimeout(() => setBuddyMood('happy'), 1800);
  };

  const handleCopyVoucher = (code) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedVoucher(true);
    setTimeout(() => setCopiedVoucher(false), 1600);
  };

  // ---- Theme tokens (cream and espresso) ------------------------------------
  const theme = darkMode
    ? {
        bg: '#1B1714',
        surface: '#25201B',
        elevated: '#2F2923',
        primary: '#C8A173',
        secondary: '#91AD8F',
        textPrimary: '#F4EFEA',
        textSecondary: '#B5A89C',
        border: '#3A322B',
        danger: '#E08A7B'
      }
    : {
        bg: '#F6F1EA',
        surface: '#EFE8DD',
        elevated: '#FBF8F3',
        primary: '#A8845A',
        secondary: '#849B82',
        textPrimary: '#2C2520',
        textSecondary: '#6E6259',
        border: '#E2D8CA',
        danger: '#C45D4B'
      };

  const cardStyle = { backgroundColor: theme.elevated, borderColor: theme.border };

  // ---- Derived values for the kiosk ----------------------------------------
  const lastItem = lastItemKey ? ITEMS[lastItemKey] : null;
  // The bin lights up once the item reaches the sorting stage
  const activeBin = lastItem && activeStep >= 2 && (busy || outcome) ? lastItem.bin : null;

  // Wi-Fi calculator values
  const affordableTiers = VOUCHER_TIERS.filter((t) => t.cost <= calcPoints);
  const bestTier = affordableTiers[affordableTiers.length - 1];
  const nextTier = VOUCHER_TIERS.find((t) => t.cost > calcPoints);

  const currentStage = STAGES[activeStep];

  return (
    <div
      style={{ backgroundColor: theme.bg, color: theme.textPrimary }}
      className="min-h-screen transition-colors duration-300 font-sans selection:bg-[#A8845A] selection:text-white"
    >
      <style>{GLOBAL_CSS}</style>

      {/* ==================================================================== */}
      {/* SPLASH                                                                */}
      {/* ==================================================================== */}
      {showSplash && (
        <div
          style={{ backgroundColor: '#F6F1EA' }}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-300 ${
            splashFade ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="flex flex-col items-center space-y-5 px-6 text-center">
            <div className="w-24 h-24 rounded-3xl bg-[#EFE8DD] border-2 border-[#A8845A]/45 shadow-lg flex items-center justify-center arvy-float">
              <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 22C25 14 39 14 48 22" stroke="#A8845A" strokeWidth="4" strokeLinecap="round" />
                <path d="M22 29C28 24 36 24 42 29" stroke="#849B82" strokeWidth="4" strokeLinecap="round" />
                <rect x="23" y="34" width="18" height="22" rx="6" fill="#9BD1CC" stroke="#2C2520" strokeWidth="2.5" />
                <circle cx="29" cy="43" r="1.8" fill="#2C2520" />
                <circle cx="35" cy="43" r="1.8" fill="#2C2520" />
                <path d="M30 47C31.5 48.5 32.5 48.5 34 47" stroke="#2C2520" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[0.25em] text-[#2C2520]">ARVY</h1>
              <p className="text-xs sm:text-sm font-bold tracking-[0.18em] text-[#6E6259] uppercase">
                Smart Recycling &amp; Wi-Fi Rewards
              </p>
            </div>
            <div className="w-48 h-1.5 bg-[#E2D8CA] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#A8845A] rounded-full transition-all duration-1000 ease-out"
                style={{ width: splashFade ? '100%' : '88%' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* STICKY HEADER                                                         */}
      {/* ==================================================================== */}
      <header
        style={{
          backgroundColor: darkMode ? 'rgba(27, 23, 20, 0.92)' : 'rgba(246, 241, 234, 0.92)',
          borderColor: theme.border
        }}
        className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <div
              style={{ backgroundColor: theme.primary }}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
            >
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold tracking-wider text-lg block leading-none">ARVY</span>
              <span style={{ color: theme.textSecondary }} className="text-[10px] font-bold tracking-widest uppercase">
                Smart Recycling &amp; Wi-Fi
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
            {[
              { href: '#playground', label: 'Try It' },
              { href: '#how-it-works', label: 'How It Works' },
              { href: '#architecture', label: 'Architecture' },
              { href: '#team', label: 'Team' }
            ].map((link) => (
              <a key={link.href} href={link.href} style={{ color: theme.textSecondary }} className="hover:opacity-75 transition">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{ backgroundColor: theme.surface, borderColor: theme.border, color: theme.textPrimary }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border hover:opacity-85 transition cursor-pointer"
              title="Switch between light and dark mode"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-[#C8A173]" /> : <Moon className="w-3.5 h-3.5 text-[#A8845A]" />}
              <span className="hidden sm:inline">Switch Theme</span>
            </button>
            <a
              href="#playground"
              style={{ backgroundColor: theme.primary }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white shadow-sm hover:brightness-105 transition"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Try the Demo</span>
            </a>
          </div>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* 1. HERO                                                               */}
      {/* ==================================================================== */}
      <section id="top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Story */}
          <div className="lg:col-span-6 space-y-6 arvy-fade">
            <div
              style={{ backgroundColor: theme.surface, borderColor: theme.border, color: theme.primary }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-extrabold tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>PUP Thesis • Reverse Vending Machine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.08]">
              Recycle a bottle.{' '}
              <span style={{ color: theme.primary }}>Get Wi-Fi back.</span>
            </h1>

            <p style={{ color: theme.textSecondary }} className="text-base sm:text-lg leading-relaxed max-w-xl">
              <strong style={{ color: theme.textPrimary }}>ARVY</strong> is a smart recycling machine. It looks at each
              bottle or can, gives you points, and your points buy internet time on campus.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#playground"
                style={{ backgroundColor: theme.primary }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-extrabold text-white shadow-sm hover:brightness-105 transition"
              >
                <span>Feed the Machine</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#how-it-works"
                style={{ backgroundColor: theme.elevated, borderColor: theme.border, color: theme.textPrimary }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-extrabold border hover:opacity-85 transition"
              >
                <span>See How It Works</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {[
                { label: 'Two-camera check', icon: Camera },
                { label: 'AI spots bottles & cans', icon: ShieldCheck },
                { label: 'Instant Wi-Fi vouchers', icon: Gift }
              ].map((pill) => {
                const PillIcon = pill.icon;
                return (
                  <div
                    key={pill.label}
                    style={{ backgroundColor: theme.surface, borderColor: theme.border, color: theme.textPrimary }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-bold"
                  >
                    <PillIcon className="w-3.5 h-3.5" style={{ color: theme.secondary }} />
                    <span>{pill.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Live stats that count up when the kiosk changes them */}
            <div style={cardStyle} className="p-5 rounded-3xl border grid grid-cols-3 gap-4 max-w-xl">
              <div>
                <span style={{ color: theme.textSecondary }} className="text-[11px] font-bold block">
                  Points banked
                </span>
                <span style={{ color: theme.primary }} className="text-2xl font-extrabold tabular-nums">
                  {animPoints}
                </span>
              </div>
              <div>
                <span style={{ color: theme.textSecondary }} className="text-[11px] font-bold block">
                  Items sorted
                </span>
                <span className="text-2xl font-extrabold tabular-nums">{animItems}</span>
              </div>
              <div>
                <span style={{ color: theme.textSecondary }} className="text-[11px] font-bold block">
                  Wi-Fi vouchers
                </span>
                <span style={{ color: theme.secondary }} className="text-2xl font-extrabold tabular-nums">
                  {animVouchers}
                </span>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="lg:col-span-6 flex flex-col items-center arvy-fade">
            <div className="w-full max-w-[392px] rounded-[48px] p-3 bg-[#231E1A] shadow-2xl border-[4px] border-[#3C332B]">
              <div className="w-28 h-5 bg-[#15120F] rounded-b-2xl mx-auto mb-1.5 flex items-center justify-center gap-2">
                <span className="w-8 h-1 rounded-full bg-[#362F29]" />
                <span className="w-2 h-2 rounded-full bg-[#293941]" />
              </div>

              <div
                style={{ backgroundColor: theme.bg, color: theme.textPrimary }}
                className="rounded-[36px] overflow-hidden border border-black/10 h-[660px] flex flex-col transition-colors duration-300"
              >
                {/* Status bar */}
                <div className="px-6 pt-2.5 pb-1.5 flex items-center justify-between text-[11px] font-bold opacity-85 shrink-0">
                  <span>12:18</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5" />
                    <span
                      style={{ backgroundColor: theme.secondary }}
                      className="px-1.5 py-0.5 rounded text-white text-[9.5px] font-extrabold"
                    >
                      50%
                    </span>
                  </div>
                </div>

                {/* App header + tabs */}
                <div className="px-4 pt-1 pb-2 shrink-0">
                  <div style={cardStyle} className="rounded-2xl p-3.5 border shadow-sm">
                    <span
                      style={{ color: theme.textSecondary }}
                      className="text-[10px] font-extrabold tracking-widest uppercase"
                    >
                      ARVY
                    </span>
                    <h2 className="text-lg font-extrabold leading-tight mt-0.5">
                      {phoneTab === 'dashboard' && 'Dashboard'}
                      {phoneTab === 'rewards' && 'WiFi Reward Redemption'}
                      {phoneTab === 'history' && 'Transaction History'}
                      {phoneTab === 'admin' && 'Admin Panel'}
                      {phoneTab === 'developer' && 'Developer'}
                    </h2>
                    <p style={{ color: theme.textSecondary }} className="text-[11px] mt-0.5 leading-snug">
                      {phoneTab === 'dashboard' && 'Your points, items, and Wi-Fi rewards in one place.'}
                      {phoneTab === 'rewards' && 'Turn your points into timed internet access.'}
                      {phoneTab === 'history' && 'Every deposit and voucher, saved to the database.'}
                      {phoneTab === 'admin' && 'Account controls, voucher management, and event logs.'}
                      {phoneTab === 'developer' && 'About this app and the development team.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar">
                    {[
                      { id: 'dashboard', label: 'Dashboard' },
                      { id: 'rewards', label: 'WiFi Rewards' },
                      { id: 'history', label: 'History' },
                      { id: 'admin', label: 'Admin Panel' },
                      { id: 'developer', label: 'Developer' }
                    ].map((tab) => {
                      const active = phoneTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setPhoneTab(tab.id)}
                          style={{
                            backgroundColor: active ? theme.primary : theme.elevated,
                            color: active ? '#FFFFFF' : theme.textPrimary,
                            borderColor: active ? theme.primary : theme.border
                          }}
                          className="px-3 py-1.5 rounded-full text-[11px] font-bold border whitespace-nowrap transition cursor-pointer"
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3">
                  {/* DASHBOARD */}
                  {phoneTab === 'dashboard' && (
                    <>
                      <div style={cardStyle} className="rounded-2xl p-3.5 border space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-sm">Welcome, haku</h3>
                          <button
                            onClick={handleSyncMongo}
                            style={{ backgroundColor: theme.surface, color: theme.primary }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold cursor-pointer hover:opacity-80"
                          >
                            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                            <span>{isSyncing ? 'Checking...' : 'Check Database'}</span>
                          </button>
                        </div>
                        <p style={{ color: theme.textSecondary }} className="text-[11px] leading-snug">
                          Your balance is read from the database. Pull down or tap Check Database to confirm it matches.
                        </p>
                        <div className="flex items-center justify-between text-[10px] font-bold pt-0.5">
                          <span style={{ color: theme.secondary }}>● {lastSyncedText}</span>
                          <span style={{ color: theme.textSecondary }}>{bottlesCount} bottles/cans</span>
                        </div>
                      </div>

                      <div style={cardStyle} className="rounded-2xl p-3.5 border space-y-2.5">
                        <div>
                          <h3 className="font-extrabold text-sm">Recycling Buddies</h3>
                          <p style={{ color: theme.textSecondary }} className="text-[10.5px] leading-snug mt-0.5">
                            Bibo and Alu live inside the machine. Tap them to see what they say.
                          </p>
                        </div>

                        <div style={{ backgroundColor: theme.surface }} className="rounded-2xl p-3 flex flex-col items-center justify-center">
                          <div
                            style={{ backgroundColor: theme.elevated, borderColor: theme.border, color: theme.textPrimary }}
                            className="px-3 py-1 rounded-full border text-[10px] font-bold mb-2 text-center shadow-sm max-w-full"
                          >
                            {buddySpeech}
                          </div>
                          <div className="flex items-end justify-around w-full px-2">
                            <div className="flex flex-col items-center">
                              <BiboCharacter mood={buddyMood} onClick={() => handlePokeBuddy('Bibo')} />
                              <span style={{ color: theme.textSecondary }} className="text-[10px] font-bold mt-1">
                                Bibo • PET bottle
                              </span>
                            </div>
                            <div className="flex flex-col items-center">
                              <AluCharacter mood={buddyMood} onClick={() => handlePokeBuddy('Alu')} />
                              <span style={{ color: theme.textSecondary }} className="text-[10px] font-bold mt-1">
                                Alu • aluminum can
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          style={{ backgroundColor: theme.surface, borderColor: theme.border }}
                          className="py-2 px-3 rounded-xl border text-center text-[11px] font-extrabold"
                        >
                          {points} points banked.{' '}
                          <span style={{ color: theme.primary }}>
                            {points >= 1 ? 'You can already buy Wi-Fi time.' : 'Feed the machine to earn your first point.'}
                          </span>
                        </div>
                      </div>

                      <div style={cardStyle} className="rounded-2xl p-3.5 border flex items-center justify-between">
                        <div>
                          <span style={{ color: theme.textSecondary }} className="text-[10px] font-bold block">
                            Machine Login ID
                          </span>
                          <span style={{ color: theme.primary }} className="text-sm font-extrabold tracking-wide font-mono">
                            USER-1363794689
                          </span>
                        </div>
                        <button
                          onClick={handleCopyUserId}
                          style={{ backgroundColor: theme.surface, color: theme.textPrimary }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10.5px] font-bold cursor-pointer hover:opacity-80"
                          title="Copy Machine Login ID"
                        >
                          {copiedUserId ? (
                            <>
                              <Check className="w-3.5 h-3.5" style={{ color: theme.secondary }} />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy ID</span>
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}

                  {/* WIFI REWARDS */}
                  {phoneTab === 'rewards' && (
                    <>
                      <div style={cardStyle} className="rounded-2xl p-3.5 border space-y-2">
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-extrabold text-sm">Available Points: {points} pts</h3>
                          <span style={{ color: theme.secondary }} className="text-[10px] font-extrabold">
                            MikroTik Hotspot
                          </span>
                        </div>
                        <p style={{ color: theme.textSecondary }} className="text-[10.5px] leading-snug">
                          Pick a time. The code works until the time runs out.
                        </p>

                        {activeVoucher ? (
                          <div style={{ backgroundColor: theme.secondary }} className="p-3 rounded-xl text-white space-y-1.5 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-[9.5px] uppercase tracking-wider font-bold block opacity-90">
                                  Active WiFi Voucher ({activeVoucher.duration})
                                </span>
                                <span className="text-sm font-mono font-extrabold tracking-wider">{activeVoucher.code}</span>
                              </div>
                              <button
                                onClick={() => handleCopyVoucher(activeVoucher.code)}
                                className="px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-[10.5px] font-bold flex items-center gap-1 cursor-pointer"
                              >
                                {copiedVoucher ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>{copiedVoucher ? 'Copied' : 'Copy'}</span>
                              </button>
                            </div>
                            <div className="text-[10px] font-mono bg-black/15 px-2.5 py-1 rounded-lg flex justify-between">
                              <span>Time left:</span>
                              <span className="font-extrabold">{formatCountdown(voucherSecondsLeft)}</span>
                            </div>
                          </div>
                        ) : (
                          <div
                            style={{ backgroundColor: theme.surface, color: theme.textSecondary }}
                            className="p-2.5 rounded-xl text-[11px] font-bold"
                          >
                            No active WiFi voucher
                          </div>
                        )}
                      </div>

                      <div style={cardStyle} className="rounded-2xl p-3.5 border space-y-2">
                        <div className="flex items-center justify-between border-b pb-1.5" style={{ borderColor: theme.border }}>
                          <span className="text-xs font-extrabold">WiFi Voucher Pricing</span>
                          <span style={{ color: theme.textSecondary }} className="text-[9.5px]">
                            Time • Points
                          </span>
                        </div>
                        <div className="space-y-1">
                          {VOUCHER_TIERS.map((tier, idx) => {
                            const selected = selectedTierIdx === idx;
                            const canAfford = points >= tier.cost;
                            return (
                              <button
                                key={tier.duration}
                                onClick={() => setSelectedTierIdx(idx)}
                                style={{
                                  backgroundColor: selected ? theme.surface : 'transparent',
                                  borderColor: selected ? theme.primary : 'transparent'
                                }}
                                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-xs transition cursor-pointer"
                              >
                                <span className="font-bold">{tier.duration}</span>
                                <span style={{ color: canAfford ? theme.primary : theme.textSecondary }} className="font-extrabold font-mono">
                                  {tier.cost} {ptsWord(tier.cost)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <button
                          onClick={handleRedeemVoucher}
                          disabled={points < VOUCHER_TIERS[selectedTierIdx].cost}
                          style={{
                            backgroundColor: points >= VOUCHER_TIERS[selectedTierIdx].cost ? theme.primary : theme.textSecondary
                          }}
                          className="w-full py-3 rounded-xl text-white text-xs font-extrabold shadow-sm mt-2 transition hover:brightness-105 disabled:opacity-45 cursor-pointer"
                        >
                          Redeem {VOUCHER_TIERS[selectedTierIdx].cost} {ptsWord(VOUCHER_TIERS[selectedTierIdx].cost)} ={' '}
                          {VOUCHER_TIERS[selectedTierIdx].duration} Wi-Fi
                        </button>
                      </div>
                    </>
                  )}

                  {/* HISTORY */}
                  {phoneTab === 'history' && (
                    <div style={cardStyle} className="rounded-2xl p-3.5 border space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold">Transaction Log ({transactions.length})</span>
                        <span style={{ color: theme.secondary }} className="text-[10px] font-bold">● Synced</span>
                      </div>
                      <div className="space-y-2">
                        {transactions.map((entry) => (
                          <div
                            key={entry.id}
                            style={{ backgroundColor: theme.surface, borderColor: theme.border }}
                            className="p-2.5 rounded-xl border text-[10.5px] leading-snug"
                          >
                            <span style={{ color: theme.textSecondary }} className="font-mono block text-[9.5px]">
                              {entry.ts}
                            </span>
                            <span
                              style={{
                                color:
                                  entry.type === 'rejected'
                                    ? theme.danger
                                    : entry.type === 'accepted'
                                    ? theme.secondary
                                    : theme.textPrimary
                              }}
                              className="font-bold"
                            >
                              {entry.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ADMIN */}
                  {phoneTab === 'admin' && (
                    <div className="space-y-2.5">
                      <div style={cardStyle} className="rounded-2xl p-3.5 border space-y-1.5 text-[11px]">
                        <span className="text-xs font-extrabold block">User Account Management</span>
                        <div style={{ color: theme.textSecondary }}>
                          Selected account: <strong style={{ color: theme.textPrimary }}>haku</strong>
                        </div>
                        <div className="font-mono text-[10.5px]" style={{ color: theme.primary }}>
                          User ID: USER-1363794689 • Points: {points} | Bottles: {bottlesCount}
                        </div>
                        {adminStatusMsg && (
                          <div className="text-[10.5px] font-bold pt-0.5" style={{ color: theme.secondary }}>
                            {adminStatusMsg}
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-2 pt-1.5">
                          <button
                            onClick={() => {
                              setPoints((p) => p + 5);
                              setAdminStatusMsg('Admin added +5 points to haku.');
                            }}
                            style={{ backgroundColor: theme.secondary }}
                            className="py-2 rounded-xl text-white text-[10.5px] font-extrabold cursor-pointer hover:brightness-105"
                          >
                            +5 Points
                          </button>
                          <button
                            onClick={() => {
                              setPoints(0);
                              setAdminStatusMsg('Admin reset haku points to 0.');
                            }}
                            style={{ backgroundColor: '#A96456' }}
                            className="py-2 rounded-xl text-white text-[10.5px] font-extrabold cursor-pointer hover:brightness-105"
                          >
                            Reset Points
                          </button>
                        </div>
                      </div>

                      <div style={cardStyle} className="rounded-2xl p-3.5 border space-y-2 text-[10.5px]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold">Machine &amp; Hardware Status</span>
                          <span style={{ color: theme.secondary }} className="font-extrabold text-[10px]">● ONLINE</span>
                        </div>
                        <div style={{ backgroundColor: theme.surface, borderColor: theme.border }} className="p-2.5 rounded-xl border space-y-1.5">
                          <div className="flex justify-between">
                            <span style={{ color: theme.textSecondary }}>Machine ID</span>
                            <span className="font-mono font-extrabold">RVM-ARVY-001</span>
                          </div>
                          <div className="flex justify-between">
                            <span style={{ color: theme.textSecondary }}>Controller</span>
                            <span className="font-bold">Raspberry Pi 4 + Android App</span>
                          </div>
                          <div className="flex justify-between">
                            <span style={{ color: theme.textSecondary }}>Vision Model</span>
                            <span className="font-bold">YOLOv8 / YOLOv11</span>
                          </div>
                          <div className="flex justify-between">
                            <span style={{ color: theme.textSecondary }}>Database</span>
                            <span className="font-bold">MongoDB Atlas (Cloud)</span>
                          </div>
                          <div className="flex justify-between">
                            <span style={{ color: theme.textSecondary }}>Backend</span>
                            <span className="font-bold">Node.js + Express</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DEVELOPER */}
                  {phoneTab === 'developer' && (
                    <div style={cardStyle} className="rounded-2xl p-3.5 border space-y-3 text-[11px]">
                      <div>
                        <h3 className="font-extrabold text-sm">Developer Information</h3>
                        <span style={{ color: theme.primary }} className="text-xs font-extrabold block mt-0.5">
                          PUP Development Team
                        </span>
                      </div>
                      <div className="space-y-1 font-semibold" style={{ color: theme.textSecondary }}>
                        {TEAM_MEMBERS.map((member) => (
                          <div key={member}>• {member}</div>
                        ))}
                      </div>
                      <div style={{ backgroundColor: theme.surface, borderColor: theme.border }} className="p-3 rounded-xl border space-y-1.5 text-[10.5px]">
                        <div>
                          <span style={{ color: theme.textSecondary }} className="font-bold block">Thesis Title</span>
                          <span className="font-extrabold leading-snug block">
                            ARVY: Android-Monitored Reverse Vending Machine Using YOLO-Based Classification and Physical
                            Integrity Verification of PET Bottles and Aluminum Cans
                          </span>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span style={{ color: theme.textSecondary }}>Platform</span>
                          <span className="font-extrabold">Android Studio + MongoDB Atlas</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. TRY IT: FEED THE MACHINE                                           */}
      {/* ==================================================================== */}
      <section id="playground" className="py-20 border-t" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2.5">
            <span style={{ color: theme.primary }} className="text-xs font-extrabold uppercase tracking-widest">
              Try it yourself
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Feed the machine</h2>
            <p style={{ color: theme.textSecondary }} className="text-sm sm:text-base leading-relaxed">
              Pick an item. Watch it travel through the four stages. Accepted items add points to the phone above.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: insert + stage track */}
            <div style={cardStyle} className="lg:col-span-7 rounded-3xl border p-5 sm:p-7 space-y-7">
              <div>
                <h3 className="font-extrabold text-base">Insert an item</h3>
                <p style={{ color: theme.textSecondary }} className="text-xs mt-1">
                  Each item starts the same journey. Only good items earn points.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(ITEMS).map(([key, item]) => {
                  const isBad = item.rejected;
                  return (
                    <button
                      key={key}
                      disabled={busy}
                      onClick={() => insertItem(key)}
                      style={{
                        backgroundColor: isBad ? theme.surface : key === 'can' ? theme.primary : theme.secondary,
                        borderColor: isBad ? '#C45D4B' : 'transparent',
                        color: isBad ? '#C45D4B' : '#FFFFFF'
                      }}
                      className="p-4 rounded-2xl border-2 text-left transition hover:brightness-105 disabled:opacity-60 cursor-pointer"
                    >
                      <span className="block text-sm font-extrabold leading-tight">{item.label}</span>
                      <span className="block text-[11px] font-bold mt-1 opacity-90">{item.btn}</span>
                    </button>
                  );
                })}
              </div>

              {/* Stage track */}
              <div className="relative pt-1">
                <div
                  className="absolute top-[19px] h-1.5 rounded-full"
                  style={{ left: '12.5%', right: '12.5%', backgroundColor: theme.border }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(activeStep / 3) * 100}%`,
                      backgroundColor: outcome && !outcome.ok ? '#C45D4B' : theme.primary
                    }}
                  />
                </div>
                <div className="relative grid grid-cols-4 gap-2">
                  {STAGES.map((s, i) => {
                    const reached = i <= activeStep;
                    const isRejectedHere = outcome && !outcome.ok && reached;
                    const nodeColor = isRejectedHere ? '#C45D4B' : theme.primary;
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.number}
                        onClick={() => setActiveStep(i)}
                        className="flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <span
                          className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            busy && i === activeStep ? 'arvy-pulse' : ''
                          }`}
                          style={{
                            backgroundColor: reached ? nodeColor : theme.surface,
                            borderColor: reached ? nodeColor : theme.border,
                            color: reached ? '#FFFFFF' : theme.textSecondary
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="text-[11px] font-extrabold text-center leading-tight">{s.short}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status box */}
              <div
                style={{ backgroundColor: theme.surface, borderColor: theme.border }}
                className="rounded-2xl p-4 border flex items-start gap-3"
              >
                {busy ? (
                  <RefreshCw className="w-5 h-5 shrink-0 animate-spin" style={{ color: theme.primary }} />
                ) : outcome?.ok ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: theme.secondary }} />
                ) : outcome ? (
                  <XCircle className="w-5 h-5 shrink-0" style={{ color: '#C45D4B' }} />
                ) : (
                  <Activity className="w-5 h-5 shrink-0" style={{ color: theme.textSecondary }} />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-extrabold">
                    {busy ? currentStage.title : outcome ? outcome.title : 'Waiting for an item'}
                  </p>
                  <p style={{ color: theme.textSecondary }} className="text-xs leading-relaxed mt-0.5">
                    {busy ? currentStage.plain : outcome ? outcome.text : 'Tap an item above to start the journey.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: bins + Wi-Fi calculator */}
            <div className="lg:col-span-5 space-y-6">
              <div style={cardStyle} className="rounded-3xl border p-5 sm:p-6 space-y-4">
                <div>
                  <h3 className="font-extrabold text-base">Four-bin sorter</h3>
                  <p style={{ color: theme.textSecondary }} className="text-xs mt-1 leading-relaxed">
                    The tray tilts. The item drops into the bin that matches it.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {BINS.map((bin) => {
                    const lit = activeBin === bin.id;
                    return (
                      <div
                        key={bin.id}
                        style={{
                          backgroundColor: lit ? theme.primary : theme.surface,
                          borderColor: lit ? theme.primary : theme.border,
                          color: lit ? '#FFFFFF' : theme.textPrimary
                        }}
                        className={`rounded-2xl border p-4 min-h-[96px] flex flex-col justify-between transition-all duration-300 ${
                          lit ? 'arvy-pulse -translate-y-0.5' : ''
                        }`}
                      >
                        <Recycle className="w-4 h-4 opacity-80" />
                        <span className="text-xs font-extrabold leading-tight">{bin.label}</span>
                        {lit && <span className="text-[10px] font-bold opacity-90">{lastItem.label} lands here</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={cardStyle} className="rounded-3xl border p-5 sm:p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-base">What can my points buy?</h3>
                    <p style={{ color: theme.textSecondary }} className="text-xs mt-1 leading-relaxed">
                      Slide to see the Wi-Fi you can get.
                    </p>
                  </div>
                  <span style={{ color: theme.primary }} className="text-2xl font-extrabold tabular-nums shrink-0">
                    {calcPoints} {ptsWord(calcPoints)}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="30"
                  value={calcPoints}
                  onChange={(e) => setCalcPoints(Number(e.target.value))}
                  className="w-full cursor-pointer"
                  style={{ accentColor: theme.primary }}
                  aria-label="Points to spend"
                />

                <div style={{ backgroundColor: theme.surface }} className="rounded-2xl p-4 space-y-1.5">
                  {bestTier ? (
                    <p className="text-sm font-extrabold">
                      Best deal now:{' '}
                      <span style={{ color: theme.primary }}>{bestTier.duration} of Wi-Fi</span> for {bestTier.cost}{' '}
                      {ptsWord(bestTier.cost)}.
                    </p>
                  ) : (
                    <p className="text-sm font-extrabold">Earn 1 more point to unlock 10 minutes of Wi-Fi.</p>
                  )}
                  {nextTier && (
                    <p style={{ color: theme.textSecondary }} className="text-xs leading-relaxed">
                      Next: {nextTier.duration}. You need {nextTier.cost - calcPoints} more{' '}
                      {ptsWord(nextTier.cost - calcPoints)}, about {Math.ceil((nextTier.cost - calcPoints) / 3)} more cans.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {VOUCHER_TIERS.map((t) => {
                    const ok = calcPoints >= t.cost;
                    return (
                      <div
                        key={t.duration}
                        style={{
                          backgroundColor: ok ? theme.surface : 'transparent',
                          borderColor: ok ? theme.secondary : theme.border,
                          color: ok ? theme.textPrimary : theme.textSecondary
                        }}
                        className="flex items-center justify-between px-3 py-2 rounded-xl border text-[11px] font-bold"
                      >
                        <span>{t.duration}</span>
                        {ok ? (
                          <Check className="w-3.5 h-3.5" style={{ color: theme.secondary }} />
                        ) : (
                          <span className="font-mono">{t.cost} pts</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. WHY IT MATTERS                                                     */}
      {/* ==================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">
        <div className="max-w-2xl space-y-2.5">
          <span style={{ color: theme.secondary }} className="text-xs font-extrabold uppercase tracking-widest">
            The idea in three steps
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Why ARVY exists</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: 'The problem',
              icon: Recycle,
              text: 'Plastic bottles and cans get thrown away. Crushed ones also jam the plants that sort recyclables, the Material Recovery Facilities (MRFs).'
            },
            {
              step: 'The idea',
              icon: Gift,
              text: 'Give students a reason to bring them back. Every good item earns points, and points buy internet time.'
            },
            {
              step: 'The result',
              icon: Zap,
              text: 'The machine checks each item, the app shows the balance, and the router turns on the Wi-Fi.'
            }
          ].map((card, idx) => {
            const CardIcon = card.icon;
            return (
              <div key={card.step} style={cardStyle} className="p-6 sm:p-7 rounded-3xl border shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    style={{ backgroundColor: theme.surface, color: idx === 1 ? theme.secondary : theme.primary }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  >
                    <CardIcon className="w-5 h-5" />
                  </div>
                  <span style={{ color: theme.textSecondary }} className="text-xs font-extrabold">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold">{card.step}</h3>
                <p style={{ color: theme.textSecondary }} className="text-sm leading-relaxed">
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. HOW IT WORKS (STAGE CARDS + GLOSSARY)                             */}
      {/* ==================================================================== */}
      <section
        id="how-it-works"
        style={{ backgroundColor: theme.surface, borderColor: theme.border }}
        className="py-20 border-y transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2.5">
            <span style={{ color: theme.primary }} className="text-xs font-extrabold uppercase tracking-widest">
              Four stages, one journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How ARVY works</h2>
            <p style={{ color: theme.textSecondary }} className="text-sm sm:text-base leading-relaxed">
              Click any stage to read more. The stage you pick here is the same one lit up in the demo above.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STAGES.map((step, idx) => {
              const IconComponent = step.icon;
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    backgroundColor: isSelected ? theme.elevated : theme.bg,
                    borderColor: isSelected ? theme.primary : theme.border
                  }}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-5 ${
                    isSelected ? 'shadow-lg ring-2 ring-[#A8845A]/30 -translate-y-1' : 'hover:opacity-95 shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        style={{
                          backgroundColor: isSelected ? theme.primary : theme.surface,
                          color: isSelected ? '#FFFFFF' : theme.primary
                        }}
                        className="px-3 py-1 rounded-full text-xs font-extrabold"
                      >
                        STEP {step.number}
                      </span>
                      <IconComponent className="w-5 h-5" style={{ color: isSelected ? theme.primary : theme.secondary }} />
                    </div>

                    <div>
                      <span style={{ color: theme.secondary }} className="text-[11px] font-extrabold block">
                        {step.subtitle}
                      </span>
                      <h3 className="text-lg font-extrabold mt-0.5 leading-snug">{step.title}</h3>
                    </div>

                    <p
                      style={{ backgroundColor: theme.surface, color: theme.textPrimary }}
                      className="text-xs sm:text-sm leading-relaxed rounded-xl p-3"
                    >
                      <strong>In plain words:</strong> {step.plain}
                    </p>

                    <p style={{ color: theme.textSecondary }} className="text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t" style={{ borderColor: theme.border }}>
                    {step.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: theme.secondary }} />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Glossary */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider">Big words, small meanings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {GLOSSARY.map((g) => (
                <div key={g.term} style={cardStyle} className="p-4 rounded-2xl border">
                  <span style={{ color: theme.primary }} className="block text-sm font-extrabold">
                    {g.term}
                  </span>
                  <span style={{ color: theme.textSecondary }} className="block text-xs leading-relaxed mt-1">
                    {g.meaning}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. ARCHITECTURE                                                       */}
      {/* ==================================================================== */}
      <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">
        <div className="max-w-2xl space-y-2.5">
          <span style={{ color: theme.secondary }} className="text-xs font-extrabold uppercase tracking-widest">
            Hardware, cloud, and Wi-Fi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How the pieces connect</h2>
          <p style={{ color: theme.textSecondary }} className="text-sm sm:text-base leading-relaxed">
            Points travel one way, from the machine to the cloud to your phone. Wi-Fi travels the other way, from the
            router to your phone.
          </p>
        </div>

        {/* Flow diagram */}
        <div style={cardStyle} className="rounded-3xl border p-5 sm:p-8 space-y-6">
          <div>
            <span style={{ color: theme.textSecondary }} className="text-[11px] font-extrabold uppercase tracking-wider">
              Points path
            </span>
            <div className="flex flex-col md:flex-row md:items-center gap-3 mt-3">
              {[
                { label: 'RVM Kiosk', sub: 'Raspberry Pi 4', icon: Cpu },
                { label: 'Render API', sub: 'Node.js + Express', icon: Server },
                { label: 'MongoDB Atlas', sub: 'Cloud database', icon: Database },
                { label: 'Your Phone', sub: 'ARVY Android app', icon: Smartphone }
              ].map((node, i, arr) => {
                const NodeIcon = node.icon;
                return (
                  <React.Fragment key={node.label}>
                    <div
                      style={{ backgroundColor: theme.surface, borderColor: theme.border }}
                      className="flex-1 flex items-center gap-3 p-4 rounded-2xl border"
                    >
                      <div style={{ backgroundColor: theme.elevated, color: theme.primary }} className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                        <NodeIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-extrabold leading-tight">{node.label}</p>
                        <p style={{ color: theme.textSecondary }} className="text-[11px] font-bold">{node.sub}</p>
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <ArrowRight className="w-5 h-5 shrink-0 rotate-90 md:rotate-0 self-center" style={{ color: theme.primary }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div>
            <span style={{ color: theme.textSecondary }} className="text-[11px] font-extrabold uppercase tracking-wider">
              Wi-Fi path
            </span>
            <div className="flex flex-col md:flex-row md:items-center gap-3 mt-3">
              {[
                { label: 'Voucher Code', sub: 'Made in the app', icon: Smartphone },
                { label: 'MikroTik hAP Lite', sub: 'Hotspot router', icon: Router },
                { label: 'Internet Access', sub: 'Time-limited', icon: Wifi }
              ].map((node, i, arr) => {
                const NodeIcon = node.icon;
                return (
                  <React.Fragment key={node.label}>
                    <div
                      style={{ backgroundColor: theme.surface, borderColor: theme.border }}
                      className="flex-1 flex items-center gap-3 p-4 rounded-2xl border"
                    >
                      <div style={{ backgroundColor: theme.elevated, color: theme.secondary }} className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                        <NodeIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-extrabold leading-tight">{node.label}</p>
                        <p style={{ color: theme.textSecondary }} className="text-[11px] font-bold">{node.sub}</p>
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <ArrowRight className="w-5 h-5 shrink-0 rotate-90 md:rotate-0 self-center" style={{ color: theme.secondary }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Component cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Edge AI on Raspberry Pi 4',
              tag: 'Runs on the machine',
              desc: 'Runs trained YOLOv8 / YOLOv11 models with PyTorch and OpenCV to tell bottles from cans and spot crushed ones.',
              icon: Cpu,
              accent: theme.primary
            },
            {
              title: 'Cloud Backend',
              tag: 'Saves every point',
              desc: 'A Node.js and Express API on Render connects the kiosk and the app to the recycle_wifi database in MongoDB Atlas.',
              icon: Database,
              accent: theme.secondary
            },
            {
              title: 'MikroTik Wi-Fi Hotspot',
              tag: 'Turns points into internet',
              desc: 'The hAP Lite router checks voucher codes and gives internet access for 10 minutes up to 8 hours.',
              icon: Wifi,
              accent: theme.primary
            },
            {
              title: 'Android App',
              tag: 'Your pocket dashboard',
              desc: 'Shows your points and history, lets you redeem Wi-Fi vouchers, and includes an admin panel. Works on Android 6.0 and newer.',
              icon: Smartphone,
              accent: theme.secondary
            },
            {
              title: 'Dual-Servo Sorting Box',
              tag: 'Metal frame, white plywood',
              desc: 'Servo 1 turns the item for two camera views. Servo 2 tilts the tray into one of four bins.',
              icon: Box,
              accent: theme.primary
            },
            {
              title: 'Live Balance Check',
              tag: 'Pull to refresh',
              desc: 'The app re-reads your balance from the database. If the numbers differ, the phone fixes itself to match the database.',
              icon: RefreshCw,
              accent: theme.secondary
            }
          ].map((card) => {
            const CardIcon = card.icon;
            return (
              <div key={card.title} style={cardStyle} className="p-6 rounded-3xl border shadow-sm space-y-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <div style={{ backgroundColor: theme.surface, color: card.accent }} className="w-11 h-11 rounded-2xl flex items-center justify-center">
                    <CardIcon className="w-5 h-5" />
                  </div>
                  <span style={{ backgroundColor: theme.surface, color: theme.textSecondary }} className="px-3 py-1 rounded-full text-[11px] font-bold">
                    {card.tag}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold leading-snug">{card.title}</h3>
                <p style={{ color: theme.textSecondary }} className="text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. UNDER THE HOOD (VERIFIED AGAINST THE APP CODE)                     */}
      {/* ==================================================================== */}
      <section
        style={{ backgroundColor: theme.surface, borderColor: theme.border }}
        className="py-20 border-y transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span style={{ color: theme.primary }} className="text-xs font-extrabold uppercase tracking-widest">
              Under the hood
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">What the app really does</h2>
            <p style={{ color: theme.textSecondary }} className="text-sm sm:text-base leading-relaxed">
              Every item on this list is in the app's source code, so you can check it live.
            </p>
            <div style={cardStyle} className="rounded-2xl border p-4 flex items-start gap-3">
              <Lock className="w-5 h-5 shrink-0 mt-0.5" style={{ color: theme.secondary }} />
              <p style={{ color: theme.textSecondary }} className="text-xs leading-relaxed">
                Passwords are never stored as plain text. They are scrambled with scrypt and a random salt.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Sign up with your name, email, and a password of at least 6 characters.',
              'Log in with your email or Student ID. Login never creates a new account.',
              'Forgot your password? Recover it with your Machine User ID.',
              'Pull to refresh: the app re-reads your balance and fixes any mismatch.',
              'Background sync keeps the phone updated while the app is open.',
              'Wi-Fi tiers run from 10 minutes for 1 point up to 8 hours for 30 points.',
              'Admin side: search users, revoke vouchers, and read event logs.',
              'Works on Android 6.0 and newer (minimum API 23).'
            ].map((line) => (
              <div key={line} style={cardStyle} className="rounded-2xl border p-4 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.secondary }} />
                <p className="text-xs sm:text-sm font-bold leading-relaxed">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. TEAM & FOOTER                                                      */}
      {/* ==================================================================== */}
      <footer id="team" className="py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div style={{ backgroundColor: theme.primary }} className="w-8 h-8 rounded-xl flex items-center justify-center text-white">
                  <Wifi className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-lg tracking-wider">ARVY</span>
              </div>
              <p style={{ color: theme.textSecondary }} className="text-sm leading-relaxed">
                <strong style={{ color: theme.textPrimary }}>Thesis title:</strong> ARVY: Android-Monitored Reverse Vending
                Machine Using YOLO-Based Classification and Physical Integrity Verification of PET Bottles and Aluminum
                Cans.
              </p>
              <p style={{ color: theme.textSecondary }} className="text-xs font-bold">
                Polytechnic University of the Philippines (PUP)
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4" style={{ color: theme.primary }} />
                <h3 className="text-sm font-extrabold uppercase tracking-wider">Research &amp; Development Team</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {TEAM_MEMBERS.map((member) => (
                  <div key={member} style={cardStyle} className="px-4 py-3 rounded-2xl border text-xs font-extrabold">
                    {member}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{ borderColor: theme.border, color: theme.textSecondary }}
            className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          >
            <span>© 2026 ARVY Research &amp; Development Team, Polytechnic University of the Philippines.</span>
            <span>Android Studio • Raspberry Pi 4 • YOLOv8 / YOLOv11 • MongoDB Atlas • MikroTik</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
