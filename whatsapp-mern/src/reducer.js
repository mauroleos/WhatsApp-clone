// How the data layer looks before we add to it - user not logged in
export const initialState = {
    user: null,
};

// Where we push information into the data layer - when we sign in 
export const actionTypes = {
    SET_USER: "SET_USER",
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
            
            default:
                return state;
    }
};

export default reducer; 