var clientes = [
  {id: 1, name: 'Leonardo', telefone: '473829473892'},
  {id: 2, name: 'Leo', telefone: '47328473892'},
  {id: 3, name: 'Leonard', telefone: '47382947382'}
];

function findCliente (clienteId) {
  return clientes[findClienteKey(clienteId)];
};

function findClienteKey (clienteId) {
  for (var key = 0; key < clientes.length; key++) {
    if (clientes[key].id == clienteId) {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#cliente-list',
  data: function () {
    return {clientes: clientes, searchKey: ''};
  }
});

var cliente = Vue.extend({
  template: '#cliente',
  data: function () {
    return {cliente: findCliente(this.$route.params.cliente_id)};
  }
});

var clienteEdit = Vue.extend({
  template: '#cliente-edit',
  data: function () {
    return {cliente: findCliente(this.$route.params.cliente_id)};
  },
  methods: {
    updatecliente: function () {
      var cliente = this.$get('cliente');
      clientes[findClienteKey(cliente.id)] = {
        id: cliente.id,
        name: cliente.name,
        telefone: cliente.telefone,
      };
      router.go('/');
    }
  }
});

var clienteDelete = Vue.extend({
  template: '#cliente-delete',
  data: function () {
    return {cliente: findCliente(this.$route.params.cliente_id)};
  },
  methods: {
    deletecliente: function () {
      clientes.splice(findClienteKey(this.$route.params.cliente_id), 1);
      router.go('/');
    }
  }
});

var Addcliente = Vue.extend({
  template: '#add-cliente',
  data: function () {
    return {cliente: {name: '', telefone: ''}
    }
  },
  methods: {
    createcliente: function() {
      var cliente = this.$get('cliente');
      clientes.push({
        id: Math.random().toString().split('.')[1],
        name: cliente.name,
        telefone: cliente.telefone,
      });
      router.go('/');
    }
  }
});

var router = new VueRouter();
router.map({
  '/': {component: List},
  '/cliente/:cliente_id': {component: cliente, name: 'cliente'},
  '/add-cliente': {component: Addcliente},
  '/cliente/:cliente_id/edit': {component: clienteEdit, name: 'cliente-edit'},
  '/cliente/:cliente_id/delete': {component: clienteDelete, name: 'cliente-delete'}
})
  .start(Vue.extend({}), '#app');