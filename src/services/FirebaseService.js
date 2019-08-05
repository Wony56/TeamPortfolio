import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/messaging";

import store from '../store';

const POSTS = 'posts';
const PORTFOLIOS = 'portfolios';
const WEBLOGS = 'weblogs';
const USERS = 'users';
const IMAGES = 'images';
const TOKENS = 'tokens';
const COMMENTS = 'comments';

// Setup Firebase
const config = {
	apiKey: "AIzaSyD4WyDVLvJV1ZXAH2KOUQDs2JFtQjqv3Do",
	authDomain: "ssafy-web-pjt.firebaseapp.com",
	databaseURL: "https://ssafy-web-pjt.firebaseio.com",
	projectId: "ssafy-web-pjt",
	storageBucket: "ssafy-web-pjt.appspot.com",
	messagingSenderId: "363817638878",
	appId: "1:363817638878:web:aea49aa578e86b59"
}

firebase.initializeApp(config)
const firestore = firebase.firestore()
const messaging = firebase.messaging()

messaging.requestPermission()
	.then(function(){
		console.log("Have permission");
		return messaging.getToken();
	})
	.then(function(token){
		console.log(token);
	})
	.catch(function(arr){
		console.log("Error Occured");
	});

messaging.onMessage(function(payload) {
	store.state.message = payload;

	console.log(payload);
	console.log(store.state.message.notification.body);
	
	console.log('onMessage: ', payload);
})

export default {
	getToken() {
		return messaging.getToken()
			.then(token => {
				return token;
			})
			.catch(err => {
				console.log("Error Occured");
			});
	},
	async postToken(user) {
		let token = await this.getToken();

		return firestore.collection(TOKENS).doc(user.uid).set({
			uid: user.uid,
			token: token
		});
	},
	deleteToken(user) {
		console.log('삭제완료')
		return firestore.collection(TOKENS).doc(user.uid).delete()
	},
//=============================================================================================================
//=============================================================================================================
//=============================================================================================================
	addReply(replyInfo) {

		replyInfo.created_at = new Date();

		// if(flag === "POST") {
		// 	const postCollection = firestore.collection(POSTS).doc(articleId)
		// 	return postCollection
		// 		.update({ 'reply': firebase.firestore.FieldValue.arrayUnion(replyInfo)
		// 	});
		// }
		// else {
		// 	const postCollection = firestore.collection(PORTFOLIOS).doc(articleId)
		// 	return postCollection
		// 		.update({ 'reply': firebase.firestore.FieldValue.arrayUnion(replyInfo)
		// 	});
		// }
		const postCollection = firestore.collection(COMMENTS);
		return postCollection.add(replyInfo);
	},
	removeReply(commentId, replyInfo) {

		// if(flag === "POST") {
		// 	const postCollection = firestore.collection(POSTS).doc(articleId)
		// 	return postCollection
		// 		.update({ 'reply': firebase.firestore.FieldValue.arrayRemove(replyInfo) 
		// 	})
		// }
		// else {
		// 	const postCollection = firestore.collection(PORTFOLIOS).doc(articleId)
		// 	return postCollection
		// 		.update({ 'reply': firebase.firestore.FieldValue.arrayRemove(replyInfo) 
		// 	})
		// }
		const postCollection = firestore.collection(COMMENTS).doc(commentId);
		return postCollection.delete(replyInfo);
	},
	modifyReply(commentId, editedContent) {

		// if(flag === "POST") {
		// 	return firestore.collection(POSTS).doc(articleId).get().then((doc) => {

		// 		let ret = doc.data();
		// 		ret.reply[index].replyContent = replyContent;
		// 		ret.reply[index].created_at = new Date();

		// 		return firestore.collection(POSTS).doc(articleId).update({

		// 			title: ret.title,
		// 			content: ret.content,
		// 			reply: ret.reply,
		// 			author: ret.author,
		// 			authorUid: ret.authorUid,
		// 			created_at: ret.created_at
		// 		})
		// 	});
		// }
		// else {
		// 	return firestore.collection(PORTFOLIOS).doc(articleId).get().then((doc) => {

		// 		let ret = doc.data();
		// 		ret.reply[index].replyContent = replyContent;
		// 		ret.reply[index].created_at = new Date();

		// 		return firestore.collection(PORTFOLIOS).doc(articleId).update({

		// 			author: ret.author,
		// 			body: ret.body,
		// 			created_at: ret.created_at,
		// 			img: ret.img,
		// 			title: ret.title,
		// 			reply: ret.reply
		// 		})
		// 	});
		// }
		const collection = firestore.collection(COMMENTS).doc(commentId);
		return collection.update({

			replyContent: editedContent,
			created_at: new Date()
		});
	},
	getComments(articleId) {

		const collection = firestore.collection(COMMENTS);
		return collection.where("capital", "==", true)
		.get()
		.then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
			});
		})
		.catch(function(error) {
			console.log("Error getting documents: ", error);
		});
	},
	//=============================================================================================================
	//=============================================================================================================
	//=============================================================================================================
	modifyPost(articleId, postInfo, replies) {

		let reply = [];
		let index = 0;

		for(let i = 0; i < replies.length; i++) {

			for(let j = 0; j < replies[i].length; j++)
				reply[index++] = replies[i][j];
		}

		return firestore.collection(POSTS).doc(articleId).set({
			title: postInfo.title,
			content: postInfo.content,
			reply: reply,
			author: postInfo.author,
			authorUid: postInfo.authorUid,
			created_at: new Date()
		})
	},
	deletePost(id) {

		return firestore.collection(POSTS).doc(id).delete();
	},
	postUser(user) {
		return firestore.collection(USERS).doc(user.uid).set({
			uid: user.uid,
			displayName: user.displayName,
			email: user.email,
			tier: 'bronze',
			created_at: new Date()
		})
	},
	getUsers() {
		const postsCollection = firestore.collection(USERS)
		return postsCollection.orderBy('created_at', 'desc').get().then(docSnapshots => {
			return docSnapshots.docs.map(doc => {
				let data = doc.data();
				return data;
			});
		})
	},
	getUser(user) {
		const postsCollection = firestore.collection(USERS)
		return postsCollection.doc(user.uid).get().then(doc => {
			if (doc.exists) {
				let data = doc.data();
				this.postToken(user);
				return data;
			}
			return;
		}).catch(error => {
			console.log(error)
		})
	},
	modifyTier(uid, tier){
		return firestore.collection(USERS).doc(uid).update({
			tier
		}).catch(error => {
			alert(error.message);
		})
	},
	postLogData(user, type) {
		console.log(JSON.stringify(user));
		return firestore.collection(WEBLOGS).add({
			type: type,
			uid: user.uid,
			name: user.displayName,
			date: new Date()
		})
	},
	getPostById(id) {

		const postCollection = firestore.collection(POSTS).doc(id)
		return postCollection
			.get()
			.then((doc) => {

				let data = doc.data();
				data.articleId = doc.id;
				data.created_at = data.created_at.toDate();

				for(let i = 0; i < data.reply.length; i++)
					data.reply[i].created_at = data.reply[i].created_at.toDate();
				
				return data;
			})
			.catch(err => {
				console.log('Error getting document', err);
			});
	},
	getPosts() {
		const postsCollection = firestore.collection(POSTS)
		return postsCollection
			.orderBy('created_at', 'desc')
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data();

					data.id = doc.id;
					data.created_at = data.created_at.toDate();

					for(let i = 0; i < data.reply.length; i++)
						data.reply[i].created_at = data.reply[i].created_at.toDate();
					return data
				})
			})
	},
	postPost(title, content, reply, author, authorUid) {

		return firestore.collection(POSTS).add({
			title,
			content,
			reply,
			author,
			authorUid,
			created_at: new Date()
		}).catch(function (error) {

			return "fail";
		})
	},
	getPortfolioById(id) {

		const portfoliosCollection = firestore.collection(PORTFOLIOS).doc(id)
		return portfoliosCollection
			.get()
			.then((doc) => {

				let data = doc.data();

				data.created_at = data.created_at.toDate();

				for(let i = 0; i < data.reply.length; i++)
					data.reply[i].created_at = data.reply[i].created_at.toDate();
				return data;
			})
			.catch(err => {
				console.log('Error getting document', err);
			});
	},
	getPortfolios() {
		const portfoliosCollection = firestore.collection(PORTFOLIOS)
		return portfoliosCollection
			.orderBy('created_at', 'desc')
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()

					data.id = doc.id;

					data.created_at = data.created_at.toDate();

					for(let i = 0; i < data.reply.length; i++)
						data.reply[i].created_at = data.reply[i].created_at.toDate();
					return data;
				})
			})
	},
	postPortfolio(author, title, content, img) {
		return firestore.collection(PORTFOLIOS).add({
			author,
			content,
			created_at: new Date(),
			img,
			title,
			reply: new Array()
		})
	},

	modifyPortfoilo(articleId, portfoiloInfo) {

		let reply = [];

		for(let i = 0; i < portfoiloInfo.reply.length; i++) {

			for(let j = 0; j < portfoiloInfo.reply[i].length; j++) {

				reply.push(portfoiloInfo.reply[i][j]);
			}
		}
		console.log(reply);

		return firestore.collection(PORTFOLIOS).doc(articleId).update({
			
			author: portfoiloInfo.author,
			content: portfoiloInfo.content,
			img: portfoiloInfo.img,
			created_at: new Date(),
			title: portfoiloInfo.title,
			reply: reply

		}).catch(error => {
			alert(error.message);
		})
	},

	modifyPortfolioImage(id, img) {

		return firestore.collection(PORTFOLIOS).doc(id).update({
			
			img
		}).catch(error => {
			alert(error.message);
		})
	},
	deletePortfolio(id) {

		return firestore.collection(PORTFOLIOS).doc(id).delete();
	},

	getImage() {
		const imagesCollection = firestore.collection(IMAGES)
		return imagesCollection
			.orderBy('created_at', 'desc')
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					return data
				})
			})
	},
	getPortfoiloReply(id) {

		const portfoliosCollection = firestore.collection(PORTFOLIOS).doc(id);
		return portfoliosCollection
			.get()
			.then((doc) => {
				
				let ret = doc.data();
				
				for(let i = 0; i < ret.reply.length; i++)
					ret.reply[i].created_at =  ret.reply[i].created_at.toDate();
				return ret.reply;
			})
	},
	getPostReply(id) {

		const portfoliosCollection = firestore.collection(POSTS).doc(id);
		return portfoliosCollection
			.get()
			.then((doc) => {
				
				let ret = doc.data();
				
				for(let i = 0; i < ret.reply.length; i++)
					ret.reply[i].created_at =  ret.reply[i].created_at.toDate();
				return ret.reply;
			})
	},
	postImage(img) {
		return firestore.collection(IMAGES).add({
			// title,
			img,
			created_at: new Date()
		})
	},
	loginWithGoogle() {
		let provider = new firebase.auth.GoogleAuthProvider()
		return firebase.auth().signInWithPopup(provider).then(async result => {
			if(!await this.getUser(result.user)){
				await this.postUser(result.user);
			}
			store.state.user.user = await this.getUser(result.user);

			this.postLogData(result.user, 'Log in');
			return result;
		}).catch(function (error) {
			console.error('[Google Login Error]', error);
		})
	},
	loginWithFacebook() {
		let provider = new firebase.auth.FacebookAuthProvider();

		return firebase.auth().signInWithPopup(provider).then(async result => {
			if(!await this.getUser(result.user)){
				await this.postUser(result.user);
			}
			store.state.user.user = await this.getUser(result.user);

			this.postLogData(result.user, 'Log in');
			return result;
		}).catch(function (error) {
			console.error('[Facebook Login Error]', error)
		});
	},
	loginWithEmail(email, password) {
		return firebase.auth().signInWithEmailAndPassword(email, password).then(async result => {
			if(!await this.getUser(result.user)){
				await this.postUser(result.user);
			}

			store.state.user.user = await this.getUser(result.user);

			this.postLogData(result.user, 'Log in');
			return result;
		}).catch(err => {
			let errorCode = err.code;

			if (errorCode == 'auth/invalid-email') {
				alert('Invalid email...');
			} else if (errorCode == 'auth/user-not-found' || errorCode == 'auth/wrong-password') {
				alert('아이디 또는 패스워드가 틀렸습니다.')
			}
			console.log('[Email Login Error]', err);
		})
	},
	signUpEmail(email, name, password) {
		return firebase.auth().createUserWithEmailAndPassword(email, password).then(async result => {
			await result.user.updateProfile({
				displayName: name
			});

			if(!await this.getUser(result.user)){
				await this.postUser(result.user);
			}

			store.state.user.user = await this.getUser(result.user);

			this.postLogData(result.user, 'Log in');
			return result;
		}).catch(err => {
			let errorCode = err.code;

			if (errorCode == 'auth/weak-password') {
				alert('The password is too weak.');
			} else if (errorCode == 'auth/invalid-email') {
				alert('Email is invalid.');
			} else if (errorCode == 'auth/email-already-in-use') {
				alert('"This account already exists...');
			}

			console.log(err);
		})
	},
	logout() {
		return firebase.auth().signOut().then(() => {
			this.postLogData(store.state.user.user, 'Log out');
			this.deleteToken(store.state.user.user);
		}).catch(err => {
			console.log(err);
		});
	}
}
