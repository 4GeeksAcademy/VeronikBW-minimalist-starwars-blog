export const initialStore=()=>{
  return{
    message: null,
    characters: JSON.parse(localStorage.getItem("characters")) || [],
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case "SET_CHARACTERS":
      return {
        ...store,
        characters: action.payload
      };
    default:
      return store;
  }
}
