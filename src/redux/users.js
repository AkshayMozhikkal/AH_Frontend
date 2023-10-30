import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE= {
    userInfo : {},
    worksInfo: [],
    AddressInfo : {},
    connectionsInfo : [],

}

export const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers:{
        setUserDetails:(state, action) =>{
            state.userInfo = action.payload.userInfo
        },
        setWorksDetails:(state, action) =>{
            state.worksInfo = action.payload.worksInfo
        }, 
        setAddressDetails:(state, action) =>{
            state.AddressInfo = action.payload.AddressInfo
        }, 
        setConnectionsDetails:(state, action) =>{
            state.connectionsInfo = action.payload.AddressInfo
        }, 
        resetState:(state)=>{
            return INITIAL_STATE ;

        }

    }

})

export const { setUserDetails, setWorksDetails, setAddressDetails, setConnectionsDetails, resetState } = userSlice.actions; // Export the setUserDetails action

export default userSlice.reducer;