export const bottomItems = [
    {
        id: 0,
        title: 'Home',
        icon: 'mdi-home',
        to: '/'
    }, {
        id: 1,
        title: 'Channels',
        icon: 'mdi-newspaper-variant-multiple',
        to: '/channels'
    },
    {
        id: 2,
        title: 'Search',
        icon: 'mdi-magnify',
        to: '/search'
    }, {
        id: 3,
        title: 'Profile',
        icon: 'mdi-account',
        to: '/account/profile'
    }
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
        title: 'Channels',
        icon: 'mdi-newspaper-variant-multiple',
        to: '/channels'
    },
    {
        id: 2,
        title: 'Articles',
        icon: 'mdi-newspaper',
        to: '/articles'
    },
    {
        id: 3,
        title: 'Search',
        icon: 'mdi-magnify',
        to: '/search'
    },
    {
        id: 4,
        title: 'Profile',
        icon: 'mdi-account',
        to: '/account/profile'
    },
    {
        id: 5,
        title: 'Settings',
        icon: 'mdi-wrench',
        to: '/setting'
    }
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

export const channelOptions = [
    {
        title: 'Leve Channel',
        icon: 'mdi-logout',
        func: () => {

        }
    },

]

export const channelItems = [
    {
        id:0,
        title:'File',
        icon:'mdi-file'
    },
    {
        id:1,
        title:'Image',
        icon:'mdi-image'
    },
    {
        id:2,
        title:'Video',
        icon:'mdi-video'
    },
    {
        id:3,
        title:'Voice',
        icon:'mdi-microphone'
    },
    {
        id:4,
        title:'Article',
        icon:'mdi-newspaper'
    }
]
