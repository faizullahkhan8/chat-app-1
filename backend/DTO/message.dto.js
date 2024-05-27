class messageDto {
    constructor(messages) {
        this._id = messages._id;
        this.sender = messages?.sender;
        this.reciver = messages?.reciver;
        this.message = messages?.message;
        this.createdAt = messages?.createdAt;
    }
}

export default messageDto;
