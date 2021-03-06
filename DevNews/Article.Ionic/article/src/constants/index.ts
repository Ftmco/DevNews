export const baseUrl = "http://192.168.43.198:2050/"

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
        Status: false,
        Code: 500,
        Title: 'Connection to server faild',
        Message: message
    }),
    invalidForm: 'Please fill in all fields'
}

export const rules = {
    require: (value: string) => !!value || 'Required.',
    password: (value: string) => !!value && (value.length > 5 || 'Password required more than 6 characters')
}

export const channelItemTypes = {
    File: 0,
    Image: 1,
    Video: 2,
    Voice: 3,
    Article: 4
}

export const channelItems = [
    {
        id: 0,
        title: 'File',
        icon: 'mdi-file',
        type: channelItemTypes.File
    },
    {
        id: 1,
        title: 'Image',
        icon: 'mdi-image',
        type: channelItemTypes.Image
    },
    {
        id: 2,
        title: 'Video',
        icon: 'mdi-video',
        type: channelItemTypes.Video
    },
    {
        id: 3,
        title: 'Voice',
        icon: 'mdi-microphone',
        type: channelItemTypes.Voice
    },
    {
        id: 4,
        title: 'Article',
        icon: 'mdi-newspaper',
        type: channelItemTypes.Article
    }
]


