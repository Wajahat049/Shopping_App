


const changeisuser=(userInfo)=>{
    return (dispatch)=>{
        dispatch({type:"CHANGE_USER",payload:userInfo})


    }
}

const changeiscategory=(category)=>{
    return (dispatch)=>{
        dispatch({type:"CHANGE_CATEGORY",payload:category})


    }
}

const changeisproduct=(product)=>{
    return (dispatch)=>{
        dispatch({type:"CHANGE_PRODUCT",payload:product})


    }
}

const changeisorder=(order)=>{
    return (dispatch)=>{
        dispatch({type:"CHANGE_ORDER",payload:order})


    }
}

const changeiscart=(cart)=>{
    return (dispatch)=>{
        dispatch({type:"CHANGE_CART",payload:cart})


    }
}



export {changeisuser,changeiscategory,changeisproduct,changeisorder,changeiscart}


