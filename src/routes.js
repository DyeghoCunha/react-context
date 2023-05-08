import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UsuarioProvider } from "common/contexts/Usuario";


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
          <Route path='/feira'>
            <Feira /*nome={nome} setNome={setNome} saldo={saldo} setSaldo={setSaldo}*/ />
          </Route>
          
        </UsuarioProvider>

        <Route path='/carrinho'>
      
          <Carrinho />

        </Route>

      </Switch>
    </BrowserRouter>
  )

}

export default Router