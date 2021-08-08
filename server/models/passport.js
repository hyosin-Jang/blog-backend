import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
import Member from "./members";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_ID,
      ClientSecret: GOOGLE_SECRET,
      callbackURL: `http://localhost:3001/auth/google/callback`
    },
    function (accessToken, refreshToken, profile, cb) {
      const {
        _json: { id, login: name, email }
      } = profile;
      try {
        const member = await Member.findOne({ email: email });

        if (member) {
          member.m_id = id;
          member.m_name = name;
          member.m_email = email;
          member.save();
          return cb(null, member);
        } else {
          const newMember = await Member.create({
            m_email: email,
            m_name: name,
            m_id: id
          });
          return cb(null, newMember);
        }
      } catch (error) {
        return cb(error);
      }
    }
  )
);
