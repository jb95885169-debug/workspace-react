import { ADD_ITEM, DECREASE_ITEM, DELETE_ITEM } from "./type";

function addItem(item){
    return{
        type : ADD_ITEM,
        payload : item
    }
}
function decreaseItem(id){
    return {
        type: DECREASE_ITEM,
        payload: id
    }
}
function deleteItem(id){
    return{
        type : DELETE_ITEM,
        payload : id
    }
}

export {addItem, deleteItem,decreaseItem};


