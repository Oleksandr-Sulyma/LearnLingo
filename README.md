# 🌍 LearnLingo — Language Tutor Platform

LearnLingo is a professional web application designed for finding and booking language tutors online. This project was developed as part of the GoIT educational program to demonstrate full-stack development skills using React and Firebase.

## 🚀 [Live Demo](https://learn-lingo-liard.vercel.app/)

## 📄 Project Materials
- **[Technical Task (TZ)](https://docs.google.com/document/d/1ZB_MFgnnJj7t7OXtv5hESSwY6xRgVoACZKzgZczWc3Y/edit?tab=t.0)**
- **[Figma Design Layout](https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/%D0%9F%D0%B5%D1%82-%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D0%9A%D0%A6?type=design&node-id=0-1&mode=design&t=jCmjSs9PeOjObYSc-0)**

## 📝 Technical Requirements Compliance
The project fully meets the following TZ criteria:
- **Authentication**: Implemented via **Firebase Auth** (Registration, Login, Logout, and persistent sessions).
- **Database**: Tutors' data is managed and fetched from **Firebase Realtime Database**.
- **Form Validation**: All forms (Authentication, Booking) are implemented using **React Hook Form** and **Yup**. All fields are mandatory.
- **Favorites**: Private page accessible only to authorized users. The "heart" state is persisted via `localStorage` and synchronized with the user's state.
- **Pagination**: "Load more" functionality fetches data from the database in chunks of 4 cards.
- **Filtering**: Advanced filtering by language, student level, and hourly rate (Bonus "Star" Task*).
- **Modals**: Custom modal windows with closure via "X" button, backdrop click, or `Esc` key.

## ✨ Features
- **Dynamic Personalization**: 5 unique color themes (Yellow, Blue, Green, Pink, Orange) based on the prototype variations to ensure project uniqueness.
- **Responsive Design**: Mobile-first approach, semantic and valid HTML/CSS for desktop and mobile devices.
- **UX Excellence**: Real-time toast notifications for user actions and optimized data loading states.

## 🛠️ Tech Stack
- **Core**: React 18, Vite.
- **Routing**: React Router.
- **Styles**: Tailwind CSS v4.
- **State Management**: Zustand (with Persist middleware).
- **Backend**: Firebase (Auth, Realtime DB).
- **Forms**: React Hook Form + Yup.

## 📦 Installation
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file with your Firebase configuration.
4. Run `npm run dev`.

---
*Created by Sulyma Oleksandr as an individual project within the GoIT Fullstack program.*
