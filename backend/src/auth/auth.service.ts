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
import * as jwt from 'jsonwebtoken';
import { AuthRequest, CheckAuthResult, DecodedPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  // login
  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; message: string; resultCode: number }> {
    const { signInput, password } = loginDto;

    //find user
    const user = await this.userModel.findOne({
      $or: [{ email: signInput }, { phone: signInput }],
    });

    if (!user) {
      throw new UnauthorizedException('User is not defined');
    }
    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Password not matched');
    }
    //create token
    const payload = {
      sub: user._id,
      gender: user.gender,
      address: user.address,
      email: user.email,
      role: user.role,
      phone: user.phone,
    };
    const token = this.jwtService.sign(payload);

    return { access_token: token, message: 'Login success!', resultCode: 1 };
  }

  // register
  async register(
    registerDto: RegisterDto,
  ): Promise<{ message: string; resultCode: number }> {
    const { email, name, password, phone, address, gender, role } = registerDto;
    //check define request from client
    if (!email || !phone || !password || !name) {
      throw new BadRequestException('Request from client form is not enough');
    }
    //check existing email and phone
    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      throw new BadRequestException('Email or phone already exists');
    }

    //hash pass and create user
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
      console.log(error);
      throw new BadRequestException('Failed to register user');
    }
  }

  // check auth
  checkAuth(req: AuthRequest): Promise<CheckAuthResult> {
    //find token
    const token = req.cookies?.token;

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      //verify token
      const tokenVerify = jwt.verify(
        token,
        process.env.SECRET_KEY as string,
      ) as DecodedPayload;

      return Promise.resolve({
        decoded: tokenVerify,
        resultCode: 1,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid token');
    }
  }

  // logout
  logout(req: AuthRequest): { message: string; resultCode: number } {
    const token = req.cookies?.token;
    if (!token) {
      throw new UnauthorizedException('Token not found or is not logged in');
    }
    return { message: 'Logout success', resultCode: 1 };
  }
}
