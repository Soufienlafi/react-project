import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';

function ElementsArticle(props) {
  return (
    <Container>
      <Grid container spacing={4} justifyContent="center">
        {props.articles.map((article) => (
          <Grid item key={article.id} xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={article.designation}
               
                  image={article.imageartpetitf}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {article.designation}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {article.marque}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardContent>
                <Typography variant="h6" color="primary">
                  {article.prixVente} TND
                </Typography>
              </CardContent>
              <CardContent>
                <Button
                  component={Link}
                  to={`/EditArticle/${article.id}`}
                  variant="contained"
                  color="primary"
                >
                  Modifier
                </Button>
                <Button
                  onClick={() => {
                    props.deleteProd(article.id);
                  }}
                  variant="contained"
                  color="error"
                  sx={{ marginLeft: 2 }}
                >
                  Supprimer
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ElementsArticle;
