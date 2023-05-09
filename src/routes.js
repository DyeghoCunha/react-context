import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UsuarioProvider } from "common/contexts/Usuario";
import { CarrinhoProvider } from "common/contexts/Carrinho";
import { PagamentoProvider } from "common/contexts/Pagamento";


function Router() {

  // const [nome, setNome] = useState('');
  //const [saldo, setSaldo] = useState(0);

  return (
    <BrowserRouter>
      <Switch>
        <UsuarioProvider>

          <Route exact path='/'>
            <Login /*    nome={nome}setNome={setNome}saldo={saldo}setSaldo={setSaldo}*/ />
          </Route>

          <CarrinhoProvider>
            <PagamentoProvider>
              <Route path='/feira'>
                <Feira /*nome={nome} setNome={setNome} saldo={saldo} setSaldo={setSaldo}*/ />
              </Route>

              <Route path='/carrinho'>
                <Carrinho />
              </Route>
            </PagamentoProvider>
          </CarrinhoProvider>
        </UsuarioProvider>
      </Switch>
    </BrowserRouter>
  )

}

export default Router