import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }
    @Post('/register')
    async register(@Body() credentials: CredentialsDto): Promise<void>{
        return await this.authService.signUp(credentials);
    }


    @Post('/login')
    async login(@Body() credentials: CredentialsDto): Promise<{accessToken: string}>{
        return await this.authService.signIn(credentials);
    }
}
