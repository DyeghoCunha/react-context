import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { Container, Voltar, TotalContainer, PagamentoContainer } from './styles';
import { useState } from 'react';
import { useCarrinhoContext } from 'common/contexts/Carrinho';
import Produto from 'components/Produto';
import { useHistory } from 'react-router-dom'

import { usePagamentoContext } from 'common/contexts/Pagamento';
import { useContext } from 'react';
import { UsuarioContext } from 'common/contexts/Usuario';
import { useMemo } from 'react';


function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { carrinho, valorTotalCarrinho, efetuarCompra } = useCarrinhoContext();
  const { saldo = 0 } = useContext(UsuarioContext);
  const { tiposPagamento, formaPagamento, mudarFormaPagamento } = usePagamentoContext()
  const history = useHistory();
  const total = useMemo(() => saldo - valorTotalCarrinho, [saldo, valorTotalCarrinho]);//faz o calculo soh quando o Saldo ou o valorTotalCarrinho mudam, desta forma ele nao fica calculando a cada renderizacao
  
  return (
    <Container>
      <Voltar onClick={() => history.goBack()} />

      <h2>
        Carrinho
      </h2>

      {carrinho.map(produto => (
        <Produto {...produto}
          key={produto.id}
        />
      ))}
      <PagamentoContainer>

        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          value={formaPagamento.id}
          onChange={(event) => mudarFormaPagamento(event.target.value)}>

          {tiposPagamento.map(pagamento => (
            <MenuItem value={pagamento.id} key={pagamento.id}>
              {pagamento.nome}
            </MenuItem>

          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
        <div>
          <h2>Total no Carrinho: </h2>
          <span>R$ {valorTotalCarrinho.toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo: </h2>
          <span> R$ {Number(saldo).toFixed(2)} </span>
        </div>
        <div>
          <h2> Saldo Total: </h2>
          <span> R$ {total.toFixed(2)} </span>
        </div>
      </TotalContainer>
      <Button
        onClick={() => {
          efetuarCompra();
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
        disabled={total < 0 || carrinho.length ===0}
      >
        Comprar
      </Button>
      <Snackbar
        anchorOrigin={
          {
            vertical: 'top',
            horizontal: 'right'
          }
        }
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
        >
          Compra feita com sucesso!
        </MuiAlert>
      </Snackbar>
    </Container>
  )
}

export default Carrinho;