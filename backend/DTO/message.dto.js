class messageDto {
    constructor(message) {
        this._id = message._id;
        this.sender = message?.sender;
        this.receiver = message?.receiver;
        this.message = message?.message;
        this.createdAt = message?.createdAt;
    }
}

export default messageDto;
