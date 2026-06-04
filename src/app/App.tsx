import { Routes, Route } from "react-router-dom";
import FinalMoodboard from "../imports/FinalMoodboard/FinalMoodboard";
import MoodboardPage2 from "../imports/FinalMoodboard/MoodboardPage2";
import MoodboardPage3 from "../imports/FinalMoodboard/MoodboardPage3";
import MoodboardPage4 from "../imports/FinalMoodboard/MoodboardPage4";
import MoodboardPage5 from "../imports/FinalMoodboard/MoodboardPage5";
import MoodboardPage6 from "../imports/FinalMoodboard/MoodboardPage6";
import MoodboardPage7 from "../imports/FinalMoodboard/MoodboardPage7";
import ContactPage from "../imports/Frame2106258854/Frame2106258854";
import JournalPage from "../imports/Journal/JournalPage";
import AboutPage from "./pages/About/AboutPage";
import ArticlePage from "../imports/ArticlePage/ArticlePage";
import HomePage from "../imports/Home1/Home1";
import { SelectionProvider } from "./context/SelectionContext";
import PageTransitionOverlay from "./components/PageTransitionOverlay";

export default function App() {
  return (
    <SelectionProvider>
      <div className="size-full">
        <Routes>
          <Route path="/"                          element={<FinalMoodboard />} />
          <Route path="/home"                      element={<HomePage />} />
          <Route path="/about"                     element={<AboutPage />} />
          <Route path="/contact"                   element={<ContactPage />} />
          <Route path="/journal"                   element={<JournalPage />} />
          <Route path="/journal/article"           element={<ArticlePage />} />
          <Route path="/detail/red/scandinavian"   element={<MoodboardPage2 />} />
          <Route path="/detail/red/transitional"   element={<MoodboardPage3 />} />
          <Route path="/detail/red/midcentury"     element={<MoodboardPage4 />} />
          <Route path="/detail/beige/scandinavian" element={<MoodboardPage5 />} />
          <Route path="/detail/beige/transitional" element={<MoodboardPage6 />} />
          <Route path="/detail/beige/midcentury"   element={<MoodboardPage7 />} />
        </Routes>
        <PageTransitionOverlay />
      </div>
    </SelectionProvider>
  );
}
