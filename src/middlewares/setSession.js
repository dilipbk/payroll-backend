const setSessionCookie = (req, res, next) => {
  const sessionId = "some_unique_session_id"; // Get or generate session ID

  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  next();
};

export default setSessionCookie;
