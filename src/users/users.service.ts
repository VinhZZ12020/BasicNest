import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	private users: User[] = [ { id: 0, name: 'Vinh' }, { id: 1, name: 'Hi' } ];

	findAll(name?: string): User[] {
		if (name) {
			return this.users.filter((users) => users.name === name);
		} else {
			return this.users;
		}
	}

	findById(id: number): User {
		return this.users.find((users) => users.id === id);
	}

	createUser(createUserDto: CreateUserDto): User {
		const newUser = { id: Date.now(), ...createUserDto };

		this.users.push(newUser);

		return newUser;
	}
}
