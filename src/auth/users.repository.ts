import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CredentialsDto } from "./dto/credentials.dto";
import { User } from "./users.entity";
import  * as bcrypt  from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    constructor(){
        super();
    }
    async createUser(credentials: CredentialsDto): Promise<void>{
        const { username, password } = credentials;
        const salt = await bcrypt.genSalt();
        const hashedPassowrd = await bcrypt.hash(password, salt);
        const user = this.create({ username, password: hashedPassowrd});
        try {
            await this.save(user);
        } catch (error) {
            if(error.code == '23505'){
                throw new ConflictException('User exists')
            }
            throw new InternalServerErrorException();
        }
    }
    async signIn(credentials: CredentialsDto): Promise<boolean>{
        const { username, password } = credentials;
        const user = await this.findOne({ username});
        if (user && ( await bcrypt.compare(password, user.password))) {
            return true;
        }
        throw new UnauthorizedException("Username or Passowrd are wrong");
    }
}