const initial_state ={
    userInfo:{},
    product:[],
    Order:[],
    Category:"",
    Cart:[]

}



const reducer =(state=initial_state,action)=>{
    switch(action.type){
        case "CHANGE_USER":
            return({...state,userInfo:action.payload
            } )

        case "CHANGE_PRODUCT":
            return({...state,
                product:action.payload
            })

            case "CHANGE_ORDER":
            return({...state,
                Order:action.payload
            }) 

            case "CHANGE_CATEGORY":
            return({...state,
                Category:action.payload
            } )

            case "CHANGE_CART":
            return({...state,
                Cart:action.payload
            } )
    }
    return state

}

export default reducer;