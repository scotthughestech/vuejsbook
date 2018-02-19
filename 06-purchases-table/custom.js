Vue.component('purchases-table', {
    props: ['purchases'],
    template: `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Price</th>
          <th scope="col">Description</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(purchase, index) in purchases">
          <td v-text="purchase.date"></td>
          <td v-text="purchase.price"></td>
          <td v-text="purchase.description"></td>
          <td><button class="btn btn-danger btn-sm" @click="deletePurchase(index)">Delete</button></td>
        </tr>
      </tbody>
    </table>
    `,
    methods: {
      deletePurchase: function (index) {
        this.$emit('delete-purchase', index);
      }
    }
});

var app = new Vue({
  el: '#app',
  data: {
    purchases: [
      {
        date: '2013-02-15',
        price: '20',
        description: 'Dog Food'
      },
      {
        date: '2018-02-14',
        price: '50',
        description: 'Gas'
      },
      {
        date: '2018-02-13',
        price: '75',
        description: 'Groceries'
      }
    ]
  },
  computed: {
    sortedPurchases: function () {
      return this.purchases.sort(function (a, b) {
        return a.date < b.date;
      });
    }
  },
  methods: {
    deletePurchase: function (index) {
      this.purchases.splice(index, 1);
    }
  }
});
