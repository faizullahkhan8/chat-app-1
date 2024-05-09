class messageDto {
    constructor(messages) {
        this._id = messages._id;
        this.senderId = messages?.sender;
        this.reciverId = messages?.reciver;
        this.message = messages?.message;
        this.createdAt = messages?.createdAt;
    }
}

export default messageDto;
