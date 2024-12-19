import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { auth } from 'firebase-admin'
import { ExtractJwt, Strategy } from 'passport-firebase-jwt'

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    validate(token) {
        return auth()
            .verifyIdToken(token, true)
            .catch(err => {
                console.warn(err)
                throw new UnauthorizedException()
            })
    }
}
