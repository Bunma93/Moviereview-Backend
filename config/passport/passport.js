const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../../models');


const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || process.env.SECRET_OR_KEY
};

const JWTStrategy = new Strategy(option, async (payload, done) => {
    try {
        // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
        const targetUser = await db.User.findOne({ where: { id: payload.id } });

        if (!targetUser) {
            return done(null, false);
        }

        // ตรวจสอบว่า Token หมดอายุหรือไม่
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (payload.exp < currentTimestamp) {
            return done(null, false, { message: "token expired" });
        }

        return done(null, targetUser);
    } catch (error) {
        console.error("JWT Strategy Error:", error);
        return done(error, false);
    }
});

passport.use("jwt", JWTStrategy);