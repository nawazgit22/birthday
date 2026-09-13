import React, { useEffect, useState } from 'react'
import './App.css'
import './LoveLetter.css'
import './BookCanvas.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import LoveLetter from './pages/LoveLetter'
import Test from './pages/Test'
import MoonKeepSake from './pages/MoonKeepSake'
import OpeningAnimation from './components/OpeningAnimation'

const App = () => {

  const MyRoute = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path='love-Letter' element={<LoveLetter />}></Route>
        <Route path='test' element={<Test />}></Route>
      </Route>
    </Route>
  ))

  // ------------------ Moon keepsake gate (this shows FIRST, before anything else)
  const [showMoon, setShowMoon] = useState(true);

  // ------------------Cake loader 
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimateOut(true), 9400);
    const timer2 = setTimeout(() => setShowContent(true), 9600);
    const timer3 = setTimeout(() => setLoading(false), 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <>
      {
        showMoon && <MoonKeepSake onContinue={() => setShowMoon(false)} />
      }
      {
        !showMoon && loading && <OpeningAnimation animateOut={animateOut} />
      }
      {
        !showMoon && showContent && <RouterProvider router={MyRoute} />
      }
    </>
  )
}

export default App