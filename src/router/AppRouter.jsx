import React from 'react'
import { Routes, Route, Link, Navigate} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
  return (
    <Routes>
        <Route exact path="/" element={<CalendarScreen/>} />
        <Route exact path="/login" element={<LoginScreen />} />
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
  )
}
