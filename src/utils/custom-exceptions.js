export class EntityNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class EntityAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class IncompleteValues extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class EntityContactAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class CantDeleteEntity extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class CantUpdateEntity extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

//Session exceptions
export class IncorrectLoginCredentials extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class IncorrectToken extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
