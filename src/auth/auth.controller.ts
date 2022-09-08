import { Body, Controller, Post, Get, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { response, Response } from 'express';
import { AuthService } from './auth.service';
import { MyInfoDto, SignInInfoDto, SignUpInfoDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}
    

    @Post('/signup')
    signUp(@Body(ValidationPipe) signUpInfoDto: SignUpInfoDto) {
        return this.authService.signUp(signUpInfoDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) signInInfoDto: SignInInfoDto,
            //@Res({passthrough: true}) response: Response // access token 를 쿠키에 넣는다면 사용
            ){
        
        // const user = this.authService.signIn(signInInfoDto)
        //     .then(res => {
        //                     //const {accessToken, refreshToken} = res.cookie
                                                        
        //                     // response.cookie('accessToken', accessToken);
        //                     // response.cookie('refreshToken', refreshToken);
        //                     return res.user
        //                 })
            
        // return user
        return this.authService.signIn(signInInfoDto)
    }

    //@UseGuards('jwt')
    @Get('/myinfo')
    myinfo(@Body(ValidationPipe) myInfoDto: MyInfoDto) {
        return this.authService.getUserInfo(myInfoDto)
    }
    

}