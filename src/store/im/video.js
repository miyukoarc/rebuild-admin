const state ={
    videoRoom: 0,
    isBusy: false
}
const mutations = {
    GENERATE_VIDEO_ROOM(state, videoRoom) {
        if (videoRoom) {
            state.videoRoom = videoRoom
        } else {
            state.videoRoom = Math.ceil(Math.random() * (2 ** 32 - 1))
        }
    },
    UPDATE_ISBUSY(state, isBusy) {
        state.isBusy = isBusy
    }
}
const actions ={}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}