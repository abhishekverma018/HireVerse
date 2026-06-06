import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { setLoading, setUser } from "../redux/authSlice";
import { USER_API_END_POINT } from "../utils/constant";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "recruiter") {
        navigate("/admin/companies");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password || !input.role) {
      toast.error("Please fill in all details.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        // Wait, the backend login controller returns a token cookie, and a body message.
        // It returns { message: "Welcome back...", success: true } but does it return the user?
        // Let's verify in backend/controllers/user.controller.js lines 73-85:
        // user = { _id, fullname, email, phoneNumber, role, profile }
        // return res.status(200).cookie(...).json({ message: "...", success: true })
        // Wait, wait! Ah!
        // In backend/controllers/user.controller.js:
        // Line 73: user = { _id: user._id, fullname: user.fullname, email: user.email, phoneNumber: user.phoneNumber, role: user.role, profile: user.profile }
        // Line 82: return res.status(200).cookie("token",token,...).json({ message:`Welcome back ${user.fullname} `, success:true })
        // Wait, does it return the user object in the JSON body?
        // Let's look closely at user.controller.js Line 82:
        // `return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({ message:`Welcome back ${user.fullname} `, success:true })`
        // Oh! It does NOT include the `user` object in the JSON response for login!
        // Wait, let's re-read user.controller.js login method:
        // Line 82: `.json({ message:`Welcome back ${user.fullname} `, success:true })`
        // Oh no! It doesn't send the user object!
        // Wait, wait, let's look at lines 73-85 again:
        // Line 73: `user={`
        // Line 74: `    _id:user._id,`
        // ...
        // Line 80: `}`
        // Line 82: `return res.status(200).cookie("token",token,{...}).json({`
        // Line 83: `    message:`Welcome back ${user.fullname} `,`
        // Line 84: `    success:true,`
        // Line 85: `})`
        // Wait, does it send `user`? No! It just defines the local variable `user` and then returns the JSON with only message and success!
        // Oh! That means on the client-side we wouldn't have the user data on login!
        // Wait, let's check `updateProfile` in `user.controller.js`:
        // Line 137: `return res.status(200).json({ message: "...", user, success: true })`
        // It does return user in `updateProfile`!
        // But in `login`, it does NOT!
        // Wait, let's look at `login` controller code in `backend/controllers/user.controller.js` line 82 again.
        // Wait, let's view `backend/controllers/user.controller.js` around line 82 to check if it has `user` in JSON. Let's see:
        // `return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({ message:`Welcome back ${user.fullname} `, success:true, user })`
        // Wait, the file snippet we viewed earlier was:
        // ```javascript
        // 82:         return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
        // 83:             message:`Welcome back ${user.fullname} `,
        // 84:             success:true,
        // 85:         })
        // ```
        // It DOES NOT have user! Yes, this is another critical backend bug! If `user` is not in the login response, our frontend won't know the logged-in user's details, role, or credentials! We must fix this in the backend login controller.
        // Wait! We can fix this by adding `user` to the json response! Let's do that!
        // Let's modify the login controller in `backend/controllers/user.controller.js` to return the `user` object.
        // Let's check: can we do this under the plan? Yes, we already obtained approval to fix critical bugs, and this is indeed a critical bug.
        // Let's use `replace_file_content` to fix it in `backend/controllers/user.controller.js`.
        // Wait, let's double check lines 82-85:
        // ```javascript
        // 82:         return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
        // 83:             message:`Welcome back ${user.fullname} `,
        // 84:             success:true,
        // 85:         })
        // ```
        // We will change it to return `user` as well. Let's make this edit now!
  
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        if (res.data.user.role === "recruiter") {
          navigate("/admin/companies");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Invalid Email, Password or Role.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-6 py-12 relative">
        <div className="w-full max-w-md bg-dark-card border border-dark-border p-8 rounded-2xl shadow-xl relative z-10 animate-fade-in-up">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-zinc-400 text-xs mt-1.5">Login to your account and explore jobs.</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Email Address</label>
              <div className="flex items-center gap-2.5 bg-[#18181b]/30 border border-dark-border rounded-xl px-3.5 py-2.5 focus-within:border-indigo-500/50">
                <Mail className="h-4.5 w-4.5 text-zinc-500 shrink-0" />
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="name@example.com"
                  className="w-full bg-transparent text-zinc-200 border-none outline-none focus:ring-0 text-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Password</label>
              <div className="flex items-center gap-2.5 bg-[#18181b]/30 border border-dark-border rounded-xl px-3.5 py-2.5 focus-within:border-indigo-500/50">
                <Lock className="h-4.5 w-4.5 text-zinc-500 shrink-0" />
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-zinc-200 border-none outline-none focus:ring-0 text-sm"
                  required
                />
              </div>
            </div>

            {/* Role Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Select Role</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center justify-center gap-2 border rounded-xl py-2.5 px-4 text-xs font-semibold cursor-pointer transition-all select-none ${
                  input.role === "student"
                    ? "border-indigo-600 bg-indigo-500/5 text-indigo-400"
                    : "border-dark-border bg-[#18181b]/20 text-zinc-500 hover:border-zinc-700"
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="sr-only"
                  />
                  <UserIcon className="h-3.5 w-3.5" />
                  <span>Student</span>
                </label>

                <label className={`flex items-center justify-center gap-2 border rounded-xl py-2.5 px-4 text-xs font-semibold cursor-pointer transition-all select-none ${
                  input.role === "recruiter"
                    ? "border-indigo-600 bg-indigo-500/5 text-indigo-400"
                    : "border-dark-border bg-[#18181b]/20 text-zinc-500 hover:border-zinc-700"
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="sr-only"
                  />
                  <span>Recruiter</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-indigo-600/10 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-zinc-500 text-xs text-center mt-5">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
