import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './auth.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto/login.dto';
import { RegisterDto } from './dto/register.dto/register.dto';

//service
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  // login
  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password, phone } = loginDto;

    const user = await this.userModel.findOne({ $or: [{ email }, { phone }] });

    if (!user) {
      throw new UnauthorizedException('User is not defined');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Password not matched');
    }

    const payload = { sub: user._id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  // regiser
  async register(
    registerDto: RegisterDto,
  ): Promise<{ message: string; resultCode: number }> {
    const { email, name, password, phone, address, gender, role } = registerDto;

    if (!email || !phone || !password || !name) {
      throw new BadRequestException('Request from client form is not enough');
    }

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      throw new BadRequestException('Email or phone already exists');
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new this.userModel({
        email,
        password: hashedPassword,
        name,
        phone,
        address,
        gender: gender || 'unknow',
        role: role || 'user',
      });

      await newUser.save();

      return { message: 'Register successfully', resultCode: 1 };
    } catch (error) {
      throw new BadRequestException('Failed to register user');
      console.log(error);
    }
  }
}
