const initialState={
    usuarios:[]
}
function productsReducer(state=initialState,{type,payload}){
    switch (type){
        case "GET_USUARIOS":
            return{
                ...state,
                usuarios:payload,
            }
    }
}