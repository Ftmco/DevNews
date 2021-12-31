
export const bottomItems = [
    {
        id: 0,
        title: 'Home',
        icon: 'mdi-home',
        to: '/'
    },
    {
        id: 1,
        title: 'Channels',
        icon: 'mdi-newspaper-variant-multiple-outline',
        to: '/channel/channels'
    },
    {
        id: 2,
        title: 'Profile',
        icon: 'mdi-account',
        to: '/account/profile'
    },
]

export const navigationItems = [
    {
        id: 0,
        title: 'Home',
        icon: 'mdi-home',
        to: '/'
    },
    {
        id: 1,
        title: 'Profile',
        icon: 'mdi-account',
        to: '/account/profile'
    },

    {
        id: 2,
        title: 'Channels',
        icon: 'mdi-newspaper-variant-multiple-outline',
        to: '/channel/channels'
    },

]

export const messages = {
    netWorkError: (message: string) => ({
        status: false,
        code: 500,
        title: 'Connection to server faild',
        message: message
    }),
    invalidForm: 'Please fill in all fields'
}


export const rules = {
    require: (value: string) => !!value || 'Required.',
    password: (value: string) => !!value && (value.length > 5 || 'Password required more than 6 characters')
}
