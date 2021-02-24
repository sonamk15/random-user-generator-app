export const usersReducer = (state={data:[]} , action) => {
     switch(action.type){

         case 'ADD_USER':
             return {
                 ...state,
                 data:action.data
             }
             default:
                 return state

     }  

}