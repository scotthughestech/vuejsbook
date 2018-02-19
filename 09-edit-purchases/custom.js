Vue.component('purchases-form', {
  props: ['text', 'title', 'index', 'data'],
  template: `
  <div>
    <!-- Button trigger modal -->
    <div class="form-group">
      <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" :data-target="'#formModal'+index">
        {{ text }}
      </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" :id="'formModal'+index" tabindex="-1" role="dialog" aria-labelledby="formModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="formModalLabel">{{ title }}</h5>
            <button type="button" class="close" aria-label="Close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="date">Date</label>
              <input type="text" v-model="date" class="form-control" :class="{ 'is-invalid': errors.date }" id="date">
              <div class="invalid-feedback">
                Please enter a valid date in YYYY-MM-DD format
              </div>
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input type="text" v-model="price" class="form-control" :class="{ 'is-invalid': errors.price }" id="price">
              <div class="invalid-feedback">
                Please enter a number
              </div>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input type="text" v-model="description" class="form-control" :class="{ 'is-invalid': errors.description }" id="description">
              <div class="invalid-feedback">
                Please enter a description
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="save">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  mounted: function () {
    var self = this;

    $('#formModal'+self.index).on('show.bs.modal', function () {
      if (self.index > -1) {
        self.date = self.data.date;
        self.price = self.data.price;
        self.description = self.data.description;
      }
    });

    $('#formModal'+self.index).on('hidden.bs.modal', function () {
      self.dismiss();
    });
  },
  data: function () {
    return {
      date: moment().format('YYYY-MM-DD'),
      price: '',
      description: '',
      errors: {
        date: false,
        price: false,
        description: false
      }
    }
  },
  methods: {
    dismiss: function () {
      this.date = moment().format('YYYY-MM-DD');
      this.price = '';
      this.description = '';
      this.errors.date = false;
      this.errors.price = false;
      this.errors.description = false;
    },
    save: function () {
      if (this.isValid()) {
        var purchase = {
          date: this.date,
          price: this.price,
          description: this.description
        };
        this.$emit('save-purchase', purchase, this.index);
        this.dismiss();
        $('#formModal'+this.index).modal('hide');
      }
    },
    isValid: function () {
      var valid = true;

      if (!moment(this.date, 'YYYY-MM-DD', true).isValid() || !this.date) {
        valid = false;
        this.errors.date = true;
      } else {
        this.errors.date = false;
      }

      if (isNaN(this.price) || !this.price) {
        valid = false;
        this.errors.price = true;
      } else {
        this.errors.price = false;
      }

      if (!this.description) {
        valid = false;
        this.errors.description = true;
      } else {
        this.errors.description = false;
      }

      return valid;
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
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(purchase, index) in purchases">
        <td v-text="purchase.date"></td>
        <td v-text="purchase.price"></td>
        <td v-text="purchase.description"></td>
        <td>
          <purchases-form text="Edit" title="Edit Purchase" :index="index" :data="purchase" @save-purchase="updatePurchase">
          </purchases-form>
        </td>
        <td><button class="btn btn-danger btn-sm" @click="deletePurchase(index)">Delete</button></td>
      </tr>
    </tbody>
  </table>
  `,
  methods: {
    deletePurchase: function (index) {
      this.$emit('delete-purchase', index);
    },
    updatePurchase: function (purchase, index) {
      this.$emit('update-purchase', purchase, index);
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
    },
    updatePurchase: function (purchase, index) {
      Vue.set(this.purchases, index, purchase);
    }
  }
});
