import FirebaseService from "@/services/FirebaseService";

export default {

    async loadPost(id) {

        console.log("test   ", id);
        let ret = await FirebaseService.getPostById(id);

        this.title = ret.title;
        this.content = ret.content;
        this.author = ret.author;
        this.identifier = ret.identifier;
        this.articleId = ret.articleId;
        this.created_at = ret.created_at;

        this.replies = ret.reply;
    },
    addReply() {

        let temp = this.replyContent;
        console.log(this.replyContent);
        console.log(this.user.uid + "!!!" + this.articleId);

        console.log("BEFORE PUSH ", this.replies);
        FirebaseService.addReply(this.articleId, {
            author: this.author,
            content: this.content,
            created_at: this.created_at,
            identifier: this.identifier,
            reply: this.replies,
            title: this.title
        }, temp);
        this.replyContent = "";
    }
};