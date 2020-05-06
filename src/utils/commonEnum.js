var AddButtonFormType;
(function(AddButtonFormType){
    AddButtonFormType["ADDBUTTONEVENT"] = 'event',
    AddButtonFormType["ADDBUTTONSTATE"] = 'state',
    AddButtonFormType["ADDBUTTONTIMER"] = 'timer'
}(AddButtonFormType||(AddButtonFormType={})));


var StateActionType;
(function(StateActionType){
    StateActionType["Event"] = 'CreateState',
    StateActionType["State"] = 'CreateEvent',
    StateActionType["Timer"] = 'timer'
}(StateActionType||(StateActionType={})));


module.exports = {
    AddButtonFormType,
    StateActionType,
}