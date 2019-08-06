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
	.then(function () {
		console.log("Have permission");
		return messaging.getToken();
	})
	.then(function (token) {
		console.log(token);
	})
	.catch(function (arr) {
		console.log("Error Occured");
	});

messaging.onMessage(function (payload) {
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
	addComment(replyInfo) {

		replyInfo.created_at = new Date();

		const postCollection = firestore.collection(COMMENTS);
		return postCollection.add(replyInfo);
	},
	deleteComment(commentId) {

		return firestore.collection(COMMENTS).doc(commentId).delete();
	},
	modifyComment(commentId, editedContent) {

		const collection = firestore.collection(COMMENTS).doc(commentId);
		return collection.update({

			replyContent: editedContent,
			created_at: new Date()
		});
	},
	getComments(articleId) {

		const collection = firestore.collection(COMMENTS);
		return collection.where("articleId", "==", articleId)
			.orderBy("created_at")
			.get()
			.then(function (querySnapshot) {

				let ret = [];

				querySnapshot.forEach(function (doc) {

					let temp = doc.data();
					temp.commentId = doc.id;
					temp.created_at = new Date(temp.created_at.toDate());

					ret.push(temp);
				});
				return ret;
			});
	},
	deleteAllComment(articleId) {

		var collection = firestore.collection(COMMENTS).where('articleId', '==', articleId);
		collection.get().then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				doc.ref.delete();
			});
		});
	},
	//=============================================================================================================
	//=============================================================================================================
	//=============================================================================================================
	modifyPost(articleId, postInfo) {

		console.log(articleId);
		console.log(postInfo);

		return firestore.collection(POSTS).doc(articleId).set({

			author: postInfo.author,
			title: postInfo.title,
			content: postInfo.content,
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
	modifyTier(uid, tier) {
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
				data.created_at = data.created_at.toDate();

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

					return data
				})
			})
	},
	postPost(title, content, author) {

		return firestore.collection(POSTS).add({
			title,
			content,
			author,
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
		})
	},

	modifyPortfoilo(articleId, portfoiloInfo) {

		return firestore.collection(PORTFOLIOS).doc(articleId).update({

			content: portfoiloInfo.content,
			img: portfoiloInfo.img,
			created_at: new Date(),
			title: portfoiloInfo.title,

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
			if (!await this.getUser(result.user)) {
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
			if (!await this.getUser(result.user)) {
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
			if (!await this.getUser(result.user)) {
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

			if (!await this.getUser(result.user)) {
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
