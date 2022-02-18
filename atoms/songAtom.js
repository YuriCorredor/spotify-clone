import { atom } from 'recoil'

export const currentTrackPlayingIdState = atom({
    key: 'currentTrackPlayingIdState',
    default: null
})

export const isPlayingState = atom({
    key: 'isPlayingState',
    default: false
})

export const erroredState = atom({
    key: 'erroredState',
    default: false
})

export const errorMessageState = atom({
    key: 'errorMessageState',
    default: ''
})