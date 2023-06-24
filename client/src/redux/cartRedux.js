import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload.product);
      state.quantity += 1;
      state.total += action.payload.price;
      // state.products = [];
      // state.quantity = 0;
      // state.total = 0;
    },
    removeProduct: (state, action) => {
      let newQuantity = 0;
      state.products = state.products.filter(function (obj) {
        if (current(obj) !== action.payload.product) {
          newQuantity++;
        }
        return current(obj) !== action.payload.product;
      });
      state.quantity = newQuantity;
      let newPrice = 0;
      for (let i = 0; i < state.products.length; i++) {
        newPrice += current(state.products[i]).perPrice;
      }
      state.total = newPrice;
    },
    eraseCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    loadCart: (state, action) => {
      console.log("payload", action);
      state.products = action.payload.campaignId;
      state.total = action.payload.amount;
      state.quantity = action.payload.quantity;
    },
  },
});

export const { addProduct, removeProduct, eraseCart, loadCart } =
  cartSlice.actions;
export default cartSlice.reducer;
