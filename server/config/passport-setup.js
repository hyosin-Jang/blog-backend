const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const Member = require("../models/members");

passport.serializeUser((user, done) => {
  console.log("passport session save: ", user.m_id);
  // 첫번째 인자: 에러 발생 시 사용, 두번째 인자: 저장할 데이터
  done(null, user.m_id);
});

passport.deserializeUser((m_id, done) => {
  console.log("passport session get id: ", m_id);
  // passport session 에 저장한 id로 db 조회
  Member.findOne({ where: { m_id } })
    .then(user => done(null, user.m_id))
    .catch(err => done(err));
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect/callback",
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
          console.log("user is: ", exMember);
          done(null, exMember);
          // 회원가입 진행
        } else {
          const newMember = await Member.create({
            //m_email: profile._json && profile._json.google_account_email,
            m_name: profile.displayName,
            m_id: profile.id
            //m_picture: profile._json.image.url
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
