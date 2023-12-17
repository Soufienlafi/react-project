import React from 'react';

function Fact(props) {
  return (
    <div>
      <h1>Impression Facture</h1>
      <p>Facture N : {props.facture.numfact}</p>
      <p>Date Facture : {props.facture.datefact}</p>
      <p>Montant : {props.facture.Montant}</p>
    </div>
  );
}

export default Fact;
