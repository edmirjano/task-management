import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UsersRepository) private userRepository: UsersRepository,
        private jwtService: JwtService
        ) {
    }



    async signUp(credentials: CredentialsDto): Promise<void> {
        return await this.userRepository.createUser(credentials);
    }

    async signIn(credentials: CredentialsDto): Promise<{accessToken: string}> {
        const res = await this.userRepository.signIn(credentials);
        if(res){
            const username = credentials.username;
            const payload: JwtPayload = { username } ;
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        }
    }

}
