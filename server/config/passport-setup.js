const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");

const Member = require("../models/members");

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
      },
      // 기존 사용자가 있는지 조회
      async (accessToken, refreshToken, profile, done) => {
        // passport 콜백 함수
        console.log("google profile", profile);

        try {
          const exMember = await Member.findOne({
            where: { m_id: profile.id }
          });
          if (exMember) {
            done(null, exMember);
            // 회원가입 진행
          } else {
            const newMember = await Member.create({
              //m_email: profile._json && profile._json.google_account_email,
              m_name: profile.displayName,
              m_id: profile.id
            });
            done(null, newMember);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
