import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ToDoList from "./pages/ToDoList";
import Archive from "./pages/Archive";
import Calendar from "./pages/Calendar";
import Social from "./pages/Social";
import Join from "./pages/Join";
import Group from "./pages/Group";
import WriteForm from "./pages/WriteForm";

function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<SignIn />} />*/}
        <Route path="/" element={<ToDoList />} />
        <Route path="/todolist" element={<ToDoList />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/social" element={<Social />} />
        <Route path="/join" element={<Join />} />
        <Route path="/group" element={<Group />} />
        <Route path="/writeform" element={<WriteForm />} />
      </Routes>
    </Router>
  );
}

export default App;
