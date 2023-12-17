import React from 'react';

function Articles(props) {
  return (
    <div>
      <h2>Article List</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Reference</th>
            <th>Designation</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>S/Total</th>
          </tr>
        </thead>
        <tbody>
          {props.articles.map((article, index) => (
            <tr key={index}>
              <td>{article.reference}</td>
              <td>{article.designation}</td>
              <td>{article.qte}</td>
              <td>{article.prix}hooho</td>
              <td>{article.qte * article.prix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Articles;
