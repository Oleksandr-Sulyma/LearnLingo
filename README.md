# 🌍 LearnLingo — Language Tutor Platform

LearnLingo is a professional web application designed for finding and booking language tutors. It offers a seamless user experience with dynamic personalization.

## 🚀 [Live Demo](https://learn-lingo-liard.vercel.app/)

## 📝 Technical Requirements (TZ) Compliance
- **Auth**: Fully implemented via Firebase (Registration, Login, Persistent Sessions).
- **Database**: Tutors data stored in Firebase Realtime Database.
- **Filtering**: Advanced filtering by language, student level, and hourly rate.
- **Favorites**: Private page for authorized users with localStorage persistence.
- **Booking**: Multi-step validation form using React Hook Form & Yup.
- **Pagination**: "Load more" functionality for optimized data fetching.

## ✨ Features
- **Dynamic Themes**: 5 unique color schemes (Yellow, Blue, Green, Pink, Orange).
- **Responsive Design**: Mobile-first approach, fully adaptive UI.
- **Custom UI Components**: Reusable buttons, icons (SVG sprites), and modal windows.
- **UX Excellence**: Toast notifications for all key actions and skeleton loaders.

## 🛠️ Tech Stack
- **Core**: React 18, Vite.
- **Styles**: Tailwind CSS v4.
- **State**: Zustand (with Persist).
- **Backend**: Firebase (Auth, Firestore, Realtime DB).
- **Forms**: React Hook Form + Yup.
- **UX**: React Hot Toast.

## 📦 Installation
1. Clone the repo.
2. Run `npm install`.
3. Create `.env` and fill in your Firebase config (see example below).
4. Run `npm run dev`.

---
*Created as a part of the GoIT educational program.*