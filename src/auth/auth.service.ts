import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto){
        return this.userRepository.createUser(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto){
        const {username, password} = authCredentialsDto;
        const user = await this.userRepository.findOneBy({username});

        if ( user && (await bcrypt.compare(password, user.password ))) {
            const payload = username
            const accessToken = await this.jwtService.sign({payload}, {expiresIn : 60*60}) // 1hour
            const refreshToken = await this.jwtService.sign({payload}, {expiresIn : 60*60*24}) // 24hour
            const cookie = {accessToken, refreshToken}

            await this.userRepository.saveRefreshToken(user, refreshToken)
            return { user, cookie }
        } else {
            throw new UnauthorizedException('Login Failed')
        }
    }

    async signOut(user: User){
        await this.userRepository.removeRefreshToken(user)
    }
}