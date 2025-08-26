import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Profile } from './profile/profile';

export const routes: Routes = [
    
    {
        path: '', 
        component: Home,
        title: 'Home'
    },

    {
        path: 'login', 
        component: Login,
        title: 'Login'
    },

    {
        path: 'profile', 
        component: Profile,
        title: 'Profile'
    },
];
