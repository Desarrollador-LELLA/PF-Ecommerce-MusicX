const initialState={
    products:[]
}
function productsReducer(state=initialState,{type,payload}){
    switch (type){
        case "GET_PRODUCTS":
            return{
                ...state,
                products:payload,
            }
    }
}