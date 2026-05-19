import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Tab,
  Tabs,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff, SportsSoccer } from "@mui/icons-material";
import { signup, login } from "../services/auth";

// ─── Helpers ───
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function AuthPage() {
  // Which tab is active: 0 = login, 1 = signup
  const [tab, setTab] = useState(0);

  // ─── Login state ───
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);

  // ─── Signup state ───
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [showSignupPw, setShowSignupPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  // ─── Shared state ───
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // ─── Clear everything when switching tabs ───
  function handleTabChange(_: React.SyntheticEvent, newTab: number) {
    setTab(newTab);
    setErrors({});
  }

  // ─── Login handler ───
  async function handleLogin() {
    const errs: Record<string, string> = {};

    if (!loginEmail) errs.loginEmail = "Email is required";
    else if (!validateEmail(loginEmail))
      errs.loginEmail = "Enter a valid email";

    if (!loginPassword) errs.loginPassword = "Password is required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await login({
        email: loginEmail,
        password: loginPassword,
      });

      // Save the token — you'll use this for all future API calls
      localStorage.setItem("token", response.token);

      setToast({
        open: true,
        message: "Welcome back! Redirecting…",
        severity: "success",
      });

      // TODO: redirect to dashboard
      // navigate("/dashboard");
    } catch (err: any) {
      // The backend might send { message: "Invalid credentials" }
      const msg = err.response?.data?.message || "Login failed. Try again.";
      setToast({ open: true, message: msg, severity: "error" });
    } finally {
      setLoading(false);
    }
  }

  // ─── Signup handler ───
  async function handleSignup() {
    const errs: Record<string, string> = {};

    if (!signupName) errs.signupName = "Name is required";
    else if (signupName.length < 2) errs.signupName = "Min 2 characters";

    if (!signupEmail) errs.signupEmail = "Email is required";
    else if (!validateEmail(signupEmail))
      errs.signupEmail = "Enter a valid email";

    if (!signupPassword) errs.signupPassword = "Password is required";
    else if (signupPassword.length < 8)
      errs.signupPassword = "Min 8 characters";

    if (!signupConfirm) errs.signupConfirm = "Confirm your password";
    else if (signupPassword !== signupConfirm)
      errs.signupConfirm = "Passwords don't match";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await signup({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });

      localStorage.setItem("token", response.token);

      setToast({
        open: true,
        message: "Account created! Welcome to Kickoff.",
        severity: "success",
      });

      // TODO: redirect to dashboard
      // navigate("/dashboard");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Signup failed. Try again.";
      setToast({ open: true, message: msg, severity: "error" });
    } finally {
      setLoading(false);
    }
  }

  // ─── Password visibility toggle (reusable) ───
  function PasswordToggle({
    visible,
    onToggle,
  }: {
    visible: boolean;
    onToggle: () => void;
  }) {
    return (
      <InputAdornment position="end">
        <IconButton
          onClick={onToggle}
          edge="end"
          sx={{ color: "text.secondary" }}
        >
          {visible ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
        // Subtle grid background
        backgroundImage:
          "linear-gradient(rgba(91,156,245,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(91,156,245,.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      {/* ─── Main card ─── */}
      <Box
        sx={{
          display: "flex",
          width: { xs: "100%", md: 920 },
          minHeight: 580,
          bgcolor: "background.paper",
          borderRadius: "18px",
          border: "1px solid",
          borderColor: "#1E2A3A",
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0,0,0,.5)",
        }}
      >
        {/* ─── Left hero panel (hidden on mobile) ─── */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "space-between",
            p: 5,
            background:
              "linear-gradient(160deg, #0D1420 0%, #0B1522 50%, #101228 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Logo */}
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                bgcolor: "primary.main",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 0 24px rgba(91,156,245,0.25)",
              }}
            >
              <SportsSoccer sx={{ color: "#0B0F15", fontSize: 26 }} />
            </Box>
            <Typography variant="h5" sx={{ color: "text.primary" }}>
              KICKOFF
            </Typography>
          </Stack>

          {/* Headline */}
          <Box>
            <Typography variant="h3" sx={{ fontSize: 52, lineHeight: 0.95 }}>
              BUILD YOUR
              <br />
              <Box component="span" sx={{ color: "primary.main" }}>
                DREAM SQUAD
              </Box>
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                mt: 2,
                maxWidth: 300,
                lineHeight: 1.6,
              }}
            >
              Live salary-cap auctions with friends. Draft players, manage your
              budget, climb the leaderboard.
            </Typography>
          </Box>

          {/* Stats row */}
          <Stack direction="row" spacing={4}>
            {[
              { value: "10M$", label: "BUDGET" },
              { value: "15", label: "PLAYERS" },
              { value: "LIVE", label: "AUCTION" },
            ].map((s) => (
              <Box key={s.label}>
                <Typography
                  variant="h5"
                  sx={{ color: "primary.main", fontSize: 28 }}
                >
                  {s.value}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 11,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* ─── Right form panel ─── */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, md: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Mobile logo (shown only on small screens) */}
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              mb: 3,
              display: { xs: "flex", md: "none" },
            }}
          >
            <SportsSoccer sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h5">KICKOFF</Typography>
          </Stack>

          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={handleTabChange}
            sx={{
              mb: 4,
              "& .MuiTab-root": {
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 20,
                letterSpacing: 2,
                color: "text.secondary",
                "&.Mui-selected": { color: "primary.main" },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "primary.main",
                height: 2,
              },
            }}
          >
            <Tab label="LOG IN" />
            <Tab label="SIGN UP" />
          </Tabs>

          {/* ─── LOGIN FORM ─── */}
          {tab === 0 && (
            <Stack spacing={2.5}>
              <TextField
                label="Email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                error={!!errors.loginEmail}
                helperText={errors.loginEmail}
                placeholder="you@example.com"
              />

              <TextField
                label="Password"
                type={showLoginPw ? "text" : "password"}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                error={!!errors.loginPassword}
                helperText={errors.loginPassword}
                placeholder="••••••••"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                slotProps={{
                  input: {
                    endAdornment: (
                      <PasswordToggle
                        visible={showLoginPw}
                        onToggle={() => setShowLoginPw(!showLoginPw)}
                      />
                    ),
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleLogin}
                disabled={loading}
                sx={{
                  py: 1.6,
                  bgcolor: "primary.main",
                  color: "#0B0F15",
                  fontWeight: 700,
                  "&:hover": {
                    bgcolor: "primary.dark",
                    boxShadow: "0 6px 28px rgba(91,156,245,0.25)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#070B10" }} />
                ) : (
                  "ENTER THE PITCH"
                )}
              </Button>

              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 14,
                  color: "text.secondary",
                }}
              >
                No account?{" "}
                <Box
                  component="span"
                  onClick={() => setTab(1)}
                  sx={{
                    color: "primary.main",
                    cursor: "pointer",
                    fontWeight: 600,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Create one
                </Box>
              </Typography>
            </Stack>
          )}

          {/* ─── SIGNUP FORM ─── */}
          {tab === 1 && (
            <Stack spacing={2.5}>
              <TextField
                label="Display Name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                error={!!errors.signupName}
                helperText={errors.signupName}
                placeholder="Your manager name"
              />

              <TextField
                label="Email"
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                error={!!errors.signupEmail}
                helperText={errors.signupEmail}
                placeholder="you@example.com"
              />

              <Stack
                sx={{ flexDirection: { xs: "column", sm: "row" }, gap: 2 }}
              >
                <TextField
                  label="Password"
                  type={showSignupPw ? "text" : "password"}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  error={!!errors.signupPassword}
                  helperText={errors.signupPassword}
                  placeholder="Min 8 chars"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <PasswordToggle
                          visible={showSignupPw}
                          onToggle={() => setShowSignupPw(!setShowSignupPw)}
                        />
                      ),
                    },
                  }}
                />

                <TextField
                  label="Confirm"
                  type={showConfirmPw ? "text" : "password"}
                  value={signupConfirm}
                  onChange={(e) => setSignupConfirm(e.target.value)}
                  error={!!errors.signupConfirm}
                  helperText={errors.signupConfirm}
                  placeholder="Repeat"
                  onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <PasswordToggle
                          visible={showConfirmPw}
                          onToggle={() => setShowConfirmPw(!showConfirmPw)}
                        />
                      ),
                    },
                  }}
                />
              </Stack>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSignup}
                disabled={loading}
                sx={{
                  py: 1.6,
                  bgcolor: "primary.main",
                  color: "#0B0F15",
                  fontWeight: 700,
                  "&:hover": {
                    bgcolor: "primary.dark",
                    boxShadow: "0 6px 28px rgba(91,156,245,0.25)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#070B10" }} />
                ) : (
                  "JOIN THE LEAGUE"
                )}
              </Button>

              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 14,
                  color: "text.secondary",
                }}
              >
                Already in?{" "}
                <Box
                  component="span"
                  onClick={() => setTab(0)}
                  sx={{
                    color: "primary.main",
                    cursor: "pointer",
                    fontWeight: 600,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Log in
                </Box>
              </Typography>
            </Stack>
          )}
        </Box>
      </Box>

      {/* ─── Toast notification ─── */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          sx={{
            bgcolor: "background.paper",
            border: 1,
            borderColor:
              toast.severity === "success" ? "primary.main" : "error.main",
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
