Vue.component('purchases-table', {
    template: `
    <button v-on:click="alertParent">Count!</button>
    `,
    methods: {
        alertParent: function () {
            this.$emit('increment');
        }
    }
});

var app = new Vue({
  el: '#app',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
        this.total++;
    }
  }
});
