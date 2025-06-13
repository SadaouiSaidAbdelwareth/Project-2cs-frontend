import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoSonatrac.png";
import bg_photo from "../assets/bg_photo.png";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";

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
      else if (user.role === "engineer") navigate("/sondage/excel-import");
    } else {
      alert("Email ou mot de passe incorrect !");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-400 justify-center items-center">
      <div className="flex w-[900px] h-[600px] bg-white rounded-lg overflow-hidden shadow-lg">
        {/* Left: Image */}
        <div className="flex-1 relative flex items-end justify-center bg-gradient-to-t from-[#e86f1c] to-[#ffb36b]">
          <img
            src={bg_photo}
            alt="background"
            className="w-full h-full object-cover object-bottom"
          />
        </div>
        {/* Right: Form */}
        <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center relative">
          <div className="mb-6">
            <img src={logo} alt="Logo" className="w-28 h-20 object-contain" />
          </div>
          <h2 className="text-[#E86F1C] font-bold text-2xl mb-8 font-sans">
            Se connecter
          </h2>
          <form onSubmit={handleSubmit} className="w-4/5 max-w-[350px]">
            <div className="mb-4">
              <label className="text-sm text-[#E86F1C] font-medium mb-1 block">
                E-mail
              </label>
              <div className="flex items-center bg-white rounded-lg px-3 shadow-md">
                <span className="mr-2">
                  <IoMailOutline/>
                </span>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-none outline-none bg-transparent py-3 w-full text-base"
                />
              </div>
            </div>
            <div className="mb-7">
              <label className="text-sm text-[#E86F1C] font-medium mb-1 block">
                Password
              </label>
              <div className="flex items-center bg-white rounded-lg px-3 shadow-md">
                <span className="mr-2">
                  <RiLockPasswordFill />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-none outline-none bg-transparent py-3 w-full text-base"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-white text-[#E86F1C] border-none rounded-lg px-9 py-2.5 font-medium text-lg shadow-md cursor-pointer transition hover:bg-[#ffe5d0]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export const fakeUsers = [
  { email: "manager@example.com", password: "123", role: "manager" },
  { email: "engineer@example.com", password: "123", role: "engineer" }
];
