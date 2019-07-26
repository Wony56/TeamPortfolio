import firebaseService from '@/services/FirebaseService'
import modal from './modal';
import notification from './notification';

const state = {
    user: {},
    loggedIn: false
}

const mutations = {
    loginWithGoogle: async function(state) {
      notification.state.snackbar = false;

        let result = await firebaseService.loginWithGoogle();
  
        if (result) {
            if(!await firebaseService.getUser(result.user)){
                await firebaseService.postUser(result.user);
            }

            state.user = await firebaseService.getUser(result.user);
  
            modal.state.loginDialog = false;

            state.loggedIn = true;
  
            notification.state.snackbarText = state.user.name +"님, 환영합니다."
  
            notification.state.snackbar = true;
  
            await firebaseService.postLogData(state.user, 'Log in');
        }
      },
      loginWithFacebook: async function(state) {
        notification.state.snackbar = false;

        let result = await firebaseService.loginWithFacebook();
  
        if (result) {
            if(!await firebaseService.getUser(result.user)){
                await firebaseService.postUser(result.user);
            }

            state.user = await firebaseService.getUser(result.user);
  
            modal.state.loginDialog = false;
  
            state.loggedIn = true;
  
            notification.state.snackbarText = state.user.name +"님, 환영합니다."
  
            notification.state.snackbar = true;
  
            await firebaseService.postLogData(state.user, 'Log in');
        }
      },
      loginWithEmail: async function(state, payload) {
        notification.state.snackbar = false;

        let result = await firebaseService.loginWithEmail(
          payload.email,
          payload.password
        );
  
        if (result) {

            state.user = await firebaseService.getUser(result.user);
  
            modal.state.loginDialog = false;
  
            state.loggedIn = true;
  
            notification.state.snackbarText = state.user.displayName +"님, 환영합니다."
  
            notification.state.snackbar = true;
  
            await firebaseService.postLogData(state.user, 'Log in');
        }
      },
      signupWithEmail: async function(state, payload){
        notification.state.snackbar = false;

        let result = await firebaseService.signUpEmail(
          payload.email,
          payload.name,
          payload.password
        );
  
        if(result){
            if(!await firebaseService.getUser(result.user)){
                await firebaseService.postUser(result.user);
            }
          
            state.user = await firebaseService.getUser(result.user);
  
            modal.state.signupDialog = false;
  
            state.loggedIn = true;
  
            notification.state.snackbarText = payload.name +"님, 환영합니다."
  
            notification.state.snackbar = true;
  
            await firebaseService.postLogData(state.user, 'Log in');
        }
      },
      logout: async function(state) {
        notification.state.snackbar = false;

        if(state.user){
          await firebaseService.postLogData(state.user, 'Log out');
  
          state.loggedIn = false;
          notification.state.snackbarText = "로그아웃되었습니다.";
          notification.state.snackbar = true;
          
          await firebaseService.logout();
        }
      },
}

export default{
    state,
    mutations
}