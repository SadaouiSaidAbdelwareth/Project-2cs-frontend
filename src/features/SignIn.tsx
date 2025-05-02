import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = fakeUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "manager") navigate("/sondageList");
      else if (user.role === "engineer") navigate("/excel-import");
    } else {
      alert("Email ou mot de passe incorrect !");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  );
}







export const fakeUsers = [
  { email: "manager@example.com", password: "123", role: "manager" },
  { email: "engineer@example.com", password: "123", role: "engineer" }
];
