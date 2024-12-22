// redux/orebiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null, // Thay đổi từ mảng thành đối tượng để lưu thông tin người dùng
  products: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },

    // Action để lưu thông tin người dùng
    setUser: (state, action) => {
      state.userInfo = action.payload; // Lưu thông tin người dùng vào state
    },

    // Action để đăng xuất
    logOut: (state) => {
      state.userInfo = null; // Xóa thông tin người dùng khi đăng xuất
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
  setUser,
  logOut,
} = orebiSlice.actions;

export default orebiSlice.reducer;
