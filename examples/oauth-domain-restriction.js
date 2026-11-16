const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const ALLOWED_DOMAIN = "university.example.jp";

function belongsToAllowedDomain(email = "") {
  const normalized = String(email).trim().toLowerCase();
  return normalized.endsWith(`@${ALLOWED_DOMAIN}`);
}

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    const email = profile.emails?.[0]?.value;

    // 画面側ではなく、OAuth完了後にサーバー側で所属を確認する。
    if (!belongsToAllowedDomain(email)) {
      return done(null, false, { message: "許可された大学アカウントを使用してください。" });
    }

    return done(null, {
      id: profile.id,
      displayName: profile.displayName,
      email
    });
  }
));

function requireLogin(req, res, next) {
  if (req.isAuthenticated?.()) return next();
  return res.status(401).json({ message: "ログインが必要です。" });
}

// HTMLだけでなく、利用者データを返すAPIも保護する。
app.get("/api/mypage", requireLogin, async (req, res) => {
  const data = await loadMypageData(req.user.id);
  res.json(data);
});
