import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
} from "@mui/material";

function EditArticle() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [reference, setReference] = useState("");
  const [designation, setDesignation] = useState("");
  const [marque, setMarque] = useState("");
  const [prixAchat, setPrixAchat] = useState("");
  const [prixVente, setPrixVente] = useState("");
  const [qtestock, setQtestock] = useState("");
  const [imageartpetitf, setImageartpetitf] = useState("");
  const [Image2, setImage2] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/produits/${id}`).then((res) => {
      const data = res.data;
      setReference(data.reference);
      setDesignation(data.designation);
      setMarque(data.marque);
      setPrixAchat(data.prixAchat);
      setPrixVente(data.prixVente);
      setQtestock(data.qtestock);
      setImageartpetitf(data.imageartpetitf);
      setImage2(data.Image2);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: id,
      reference,
      designation,
      marque,
      prixAchat,
      prixVente,
      qtestock,
      imageartpetitf,
      Image2,
    };

    axios
      .put(`http://localhost:3001/produits/${id}`, updatedProduct)
      .then((res) => {
        console.log(res);
        navigate("/articles");
      })
      .catch((error) => {
        console.log(error);
        alert("Erreur ! Modification non effectuée");
      });
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ p: 4, width: 400, backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
        <Typography variant="h5" align="center" mb={4}>
          Modification d'un produit
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Référence"
            variant="outlined"
            fullWidth
            mb={2}
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
          <TextField
            label="Désignation"
            variant="outlined"
            fullWidth
            mb={2}
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
          <TextField
            label="Marque"
            variant="outlined"
            fullWidth
            mb={2}
            value={marque}
            onChange={(e) => setMarque(e.target.value)}
          />
          <TextField
            label="Prix Achat"
            variant="outlined"
            fullWidth
            mb={2}
            type="number"
            value={prixAchat}
            onChange={(e) => setPrixAchat(e.target.value)}
          />
          <TextField
            label="Prix Vente"
            variant="outlined"
            fullWidth
            mb={2}
            type="number"
            value={prixVente}
            onChange={(e) => setPrixVente(e.target.value)}
          />
          <TextField
            label="Quantité"
            variant="outlined"
            fullWidth
            mb={2}
            type="number"
            value={qtestock}
            onChange={(e) => setQtestock(e.target.value)}
          />
          <TextField
            label="Image path"
            variant="outlined"
            fullWidth
            mb={2}
            value={imageartpetitf}
            onChange={(e) => setImageartpetitf(e.target.value)}
          />
          <TextField
            label="SecondImage path"
            variant="outlined"
            fullWidth
            mb={3}
            value={Image2}
            onChange={(e) => setImage2(e.target.value)}
          />

          <div>
            {imageartpetitf ? (
              <img src={`http://localhost:3001/${imageartpetitf}`} alt="" width="70" />
            ) : null}
          </div>
          <div>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Valider
            </Button>
          </div>
        </form> 
      </Card>
    </Container>
  );
}

export default EditArticle;
