import { Injectable } from '@nestjs/common';

export class User { // se podria exportar como una entity
    id: String; name: String;
}

@Injectable()
export class EstudianteService {

    private users: User[] = [
        {
            id: '1',
            name: 'John',
        }
    ]

    save(name: string) {
        const user = {
            id: new Date().toISOString(), name,
        }; 
        this.users.push(user);
        return { msg: `User saved successfully`, user};
    }

    findAll(){
        return this.users;
    }

    findOne(id: string): User{
        return this.users.find(user => user.id === id);
    }

    removeOne(id: string){
        this.users = this.users.filter(user => user.id !== id)
        return { msg: `User deleted successfully` };
    }
}
