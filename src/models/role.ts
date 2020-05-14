export class Role {
    
    id: number;
    name: string;

    constructor(init: number | string) {

        if (typeof init === 'number') {
            this.id = init;
            switch (init) {
                case 1: this.name = 'Admin'; break;
                case 2: this.name = 'manager'; break;
                case 3: this.name = 'employee'; break;
                default: 
                    this.id = 4;
                    this.name = 'Locked';
            }
        } 
        
        else if (typeof init === 'string') {
            this.name = init;
            switch (init.toLowerCase()) {
                case 'admin': this.id = 1; break;
                case 'manager': this.id = 2; break;
                case 'employee': this.id = 3; break;
                default: 
                    this.id = 4;
                    this.name = 'Locked';
            }
        } 
        
        else {
            this.id = 4;
            this.name = 'Locked';
        }

    }

}