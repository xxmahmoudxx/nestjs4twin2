import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query,Headers as ReqHeaders } from '@nestjs/common';
import { Headers } from '@nestjs/common';

import { User } from './user.model';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {


    private users: User[] = [
        { id: 1, username: 'Mohamed', email: 'mohamed@esprit.tn', status: 'active' },
        { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
        { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
        { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
      ];


      @Get()
  getAllUsers(
    @Query('status') status?: string,
    @Query('username') username?: string,
  ): User[] {
    let filteredUsers = this.users;

    if (status) {
      filteredUsers = filteredUsers.filter(
        (user) => user.status.toLowerCase() === status.toLowerCase(),
      );
    }

    if (username) {
      filteredUsers = filteredUsers.filter((user) =>
        user.username.toLowerCase().includes(username.toLowerCase()),
      );
    }

    return filteredUsers;

}
@Get(':id')
getUserById(@Param('id') id: string): any {
  const user = this.users.find((u) => u.id === Number(id));
  return user ;
}


@Post()
createUser(@Body() userData: CreateUserDto) {
  const newUser: User = {
    id: this.users.length + 1,
    ...userData,
    status: 'active', // ou fournir dans le body si souhaité
  };

  this.users.push(newUser);

  return {
    message: '✅ Utilisateur créé avec succès',
    createdUser: newUser,
  };
}
@Put(':id')
updateUser(@Param('id') id: string, @Body() updatedData: CreateUserDto) {
  const userIndex = this.users.findIndex((u) => u.id === Number(id));

  if (userIndex === -1) {
    throw new NotFoundException(`Utilisateur avec ID ${id} introuvable`);
  }

  this.users[userIndex] = { ...this.users[userIndex], ...updatedData };

  return {
    message: '✅ Utilisateur mis à jour avec succès',
    updatedUser: this.users[userIndex],
  };
}


@Delete(':id')
  deleteUser(@Param('id') id: string) {
    const userIndex = this.users.findIndex((u) => u.id === Number(id));

    if (userIndex === -1) {
      throw new NotFoundException(`Utilisateur avec ID ${id} introuvable`);
    }

    const deletedUser = this.users[userIndex];
    this.users.splice(userIndex, 1);

    return {
      message: '🗑️ Utilisateur supprimé avec succès',
      deletedUser,
    };
  }
  @Get('active/:status')
getActiveUsers(@Param('status') status: string): User[] {
  return this.users.filter(
    (user) => user.status.toLowerCase() === status.toLowerCase()
  );
}

}
