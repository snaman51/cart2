<template>
  <div id="app">
      <table>
    <tr>
      <th>Product</th>
      <th>Quantity</th>
    </tr>
    <tr v-for="product in products"  v-bind:key="product.name">
      <td>{{product.name}}</td>
      <td>
        <input type="number" v-model.number="product.qty" />
      </td>
      <td><span v-if=" product.qty== 0">OUT OF STOCK</span></td>
      <td>
        <button v-on:click="deleteItem(product.name)"><router-link to="/deleted">Delete</router-link></button>
      </td>
    </tr>
  </table>


  <h3> Total Products: {{ totalProducts }}</h3>
  <br/>
  <h1>Add Products</h1>
  <input type="text" placeholder="Product Name" id="name2" v-model="name"> 
  <input type="number" placeholder="qty" id="qty2" v-model="qty">  
  <button v-on:click="addEle"><router-link to="/added">Add</router-link></button>
  <br/>
  <br/>
  <router-view></router-view>
  </div>
</template>

<script>
 import {db} from '@/db.js';

export default {
  name: 'app',
  data () {
     
    return {
      products:[],
      name:'',
      qty:0,
      msg: 'Welcome to Your Vue.js App'
    }
  },
    firestore: {
    products: db.collection('Test')
    
  },
  computed: {
    totalProducts () {
      return this.products.reduce((sum,product) => {
        return sum+Number(product.qty)},0)
      
    },
  },
  methods: {
    addEle:function() {

      db.collection("Test").doc(this.name).set({name:this.name, qty:Number(this.qty)})
      
    },
    deleteItem:function(name) {

      db.collection("Test").doc(name).delete()
      
    },
accept: function() {
  this.showUpdateUI = false;
  this.$workbox.messageSW({ type: "SKIP_WAITING" });
}
    
  },

  created: function() {
  if (this.$workbox) {
    this.$workbox.addEventListener("waiting", () => {
      this.showUpdateUI = true;
    });
  }
}

  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
