import React from 'react';
import Form from './Form/Form'; // Importe o componente Form correto
import Grid from './Grid/Grid';
import Header from './Header/index';
import Resume from './Resume/index';
import GlobalStyle from './styles/global';

const FinanceDashboard = () => {
  const handleAdd = (transaction) => {
    // Lógica para adicionar uma nova transação às finanças
    console.log('Nova transação:', transaction);
  };

  return (
    <div>
      <Header handleAdd={handleAdd}/>
      <Resume/>
      <Form handleAdd={handleAdd} />
      <Grid handleAdd={handleAdd} />
      <GlobalStyle />
    </div>
  );
};

export default FinanceDashboard;
