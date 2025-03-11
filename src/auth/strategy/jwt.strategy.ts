import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Session } from 'inspector/promises';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-secret',
    });
  }
  validate(payload) {
    return payload as Session;
  }
}
