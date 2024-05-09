class userDto {
    constructor(user) {
        this._id = user._id;
        this.name = user.name;
        this.username = user.username;
        this.gender = user.gender;
        this.createdAt = user.createdAt;
    }
}

export default userDto;
