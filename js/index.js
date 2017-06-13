var clientes = [
  {id: 1, name: 'Vue.js', telefone: 'Superheroic JavaScript MVW Framework.', cpf:'843329048920', email:'demelodenoed', latitude:'4830248392048920', longitude:'4372473892472'},
];

function findcliente (clienteId) {
  return clientes[findclienteKey(clienteId)];
};

function findclienteKey (clienteId) {
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
    return {cliente: findcliente(this.$route.params.cliente_id)};
  }
});

var clienteEdit = Vue.extend({
  template: '#cliente-edit',
  data: function () {
    return {cliente: findcliente(this.$route.params.cliente_id)};
  },
  methods: {
    updatecliente: function () {
      var cliente = this.$get('cliente');
      clientes[findclienteKey(cliente.id)] = {
        id: cliente.id,
        name: cliente.name,
        telefone: cliente.telefone,
        cpf: cliente.cpf,
        email: cliente.email,
        latitude: cliente.latitude,
        longitude: cliente.longitude,

      };
      router.go('/');
    }
  }
});

var clienteDelete = Vue.extend({
  template: '#cliente-delete',
  data: function () {
    return {cliente: findcliente(this.$route.params.cliente_id)};
  },
  methods: {
    deletecliente: function () {
      clientes.splice(findclienteKey(this.$route.params.cliente_id), 1);
      router.go('/');
    }
  }
});

var Addcliente = Vue.extend({
  template: '#add-cliente',
  data: function () {
    return {cliente: {name: '', telefone: '', cpf: '', email: '', latitude: '', longitude: '', }
    }
  },
  methods: {
    createcliente: function() {
      var cliente = this.$get('cliente');
      clientes.push({
        id: Math.random().toString().split('.')[1],
        name: cliente.name,
        telefone: cliente.telefone,
        cpf: cliente.cpf,
        email: cliente.email,
        latitude: cliente.latitude,
        longitude: cliente.longitude,

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
