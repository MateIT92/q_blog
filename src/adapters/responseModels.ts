export class PostsListModel {
    constructor(data: PostModel[], link: LinkModel) {
        this.data = data;
        this.link = link;
    }
    data: PostModel[]
    link: LinkModel;
}

export class UsersIdsListModel {
    constructor(data: UserModel[], link: LinkModel) {
        this.data = data;
        this.link = link;
    }
    data: UserModel[]
    link: LinkModel;
}

export class LinkModel {
    next?: string;
}

export class PostModel {
    constructor(userId: number, user: UserModel, id: number,
        title: string,
        body: string) {
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.body = body;
        this.user= user
    }

    userId: number;
    id: number;
    title: string;
    body: string;
    user: UserModel;  
}

export class UserModel {

    constructor(id: number, username: string) {
        this.id = id;
        this.username = username;
    }

    id: number;
    username: string;
}

export class CommentModel { 
    constructor(postId: number, id: number, name: string, email: string, body: string) {
        this.postId = postId;
        this.id = id;
        this.name = name;
        this.email = email;
        this.body = body;
    }

    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export class CommentsListModel {
    constructor(data: CommentModel[], link: LinkModel) {
        this.data = data;
        this.link = link;
    }
    data: CommentModel[];
    link: LinkModel;
}