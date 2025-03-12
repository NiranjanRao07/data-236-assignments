import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Categories from "./Categories";
import AdminPanel from "./AdminPanel";
import SearchDishes from "./SearchDishes";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <nav style={{ padding: "1rem", background: "#eee" }}>
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <Link to="/" style={{ marginLeft: "1rem" }}>
              Home
            </Link>
            <Link to="/search" style={{ marginLeft: "1rem" }}>
              Search Dishes
            </Link>
            {user.role === "admin" && (
              <Link to="/admin" style={{ marginLeft: "1rem" }}>
                Admin
              </Link>
            )}
            <button
              onClick={() => setUser(null)}
              style={{ marginLeft: "1rem" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Categories user={user} /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={<Login onLoginSuccess={(u) => setUser(u)} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/search"
          element={user ? <SearchDishes /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? (
              <AdminPanel user={user} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
