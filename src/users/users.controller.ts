import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiBadRequestResponse,
	ApiQuery,
	ApiNotFoundResponse
} from '@nestjs/swagger';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@ApiOkResponse({ type: User, isArray: true })
	@ApiQuery({ name: 'name', required: false })
	@Get()
	getUsers(@Query('name') name: string): User[] {
		return this.userService.findAll(name);
	}

	@ApiOkResponse({ type: User, description: 'The user found record' })
	@ApiNotFoundResponse()
	@Get(':id')
	getUserById(
		@Param('id', ParseIntPipe)
		id: number
	): User {
		const user = this.userService.findById(id);
		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	@ApiCreatedResponse({ type: User })
	@ApiBadRequestResponse()
	@Post()
	createUser(@Body() body: CreateUserDto): User {
		return this.userService.createUser(body);
	}
}
