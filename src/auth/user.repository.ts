import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcryptjs"

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager(), dataSource.createQueryRunner())
    }

    async createUser(authCredntialsDto: AuthCredentialsDto): Promise<any>{
        const {username, password} = authCredntialsDto;
        
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.create({username, password : hashedPassword})
        // 같은 username 이 있을 경우 error 발생
        try{
             await this.save(user)
        } catch (error) {
            if(error.code == '23505') {
                throw new ConflictException('Existing username')
            } else{
                throw new InternalServerErrorException()
            }
        }
    }

    async saveRefreshToken(user: User, refreshToken: string){
        this.update(user.id, {
            refreshToken : refreshToken
        })
    }

    async removeRefreshToken(user: User){
        this.update(user.id, {
            refreshToken : null
        })
    }
}