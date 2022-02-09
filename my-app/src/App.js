import { Route, Switch, BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import List from "./pages/List";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogPage from "./pages/BlogPage";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <main className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={List} />
          <ProtectedRoute exact path="/createPost" component={CreatePost} />
          <Route exact path="/blogPost" component={BlogPage} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
