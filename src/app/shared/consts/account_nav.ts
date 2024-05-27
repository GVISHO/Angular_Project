import { Navigation } from "../interfaces/navigation";
export const ACCOUNT_NAV:Navigation[]=[
    {
        title: 'Log In',
        path: 'auth',
        auth: false,
        hideAfterAuth: true,
    },
    {
        title: 'Cart',
        path:'cart',
        auth: true,
        hideAfterAuth: false,
    },
    {
        title:'Profile',
        path:'profile',
        auth: true,
        hideAfterAuth: false,
    },
    {
        title:'Log out',
        path:'/',
        auth:true,
        hideAfterAuth:false
    }
]