Vue.component('purchases-form', {
  props: ['text', 'title'],
  template: `
  <div>
    <!-- Button trigger modal -->
    <div class="form-group">
      <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#formModal">
        {{ text }}
      </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="formModal" tabindex="-1" role="dialog" aria-labelledby="formModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="formModalLabel">{{ title }}</h5>
            <button type="button" class="close" aria-label="Close" @click="dismiss">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="date">Date</label>
              <input type="text" v-model="date" class="form-control" id="date"" required>
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input type="text" v-model="price" class="form-control" id="price">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input type="text" v-model="description" class="form-control" id="description">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="dismiss">Close</button>
            <button type="button" class="btn btn-primary" @click="save">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data: function () {
    return {
      date: '',
      price: '',
      description: ''
    }
  },
  methods: {
    dismiss: function () {
      $('#formModal').modal('hide');
      this.date = '';
      this.price = '';
      this.description = '';
    },
    save: function () {
      var purchase = {
        date: this.date,
        price: this.price,
        description: this.description
      };
      this.$emit('save-purchase', purchase);
      this.dismiss();
    }
  }
});

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
    },
    savePurchase: function (purchase) {
      this.purchases.push(purchase);
    }
  }
});
