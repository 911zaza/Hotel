import { Box, Container, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🛏️",
      title: "Chambres Confortables",
      description: "Profitez de nos chambres élégantes et confortables avec tout le confort moderne.",
    },
    {
      icon: "🍽️",
      title: "Restaurant Gastronomique",
      description: "Dégustez une cuisine raffinée dans notre restaurant étoilé.",
    },
    {
      icon: "🏊",
      title: "Piscine & Spa",
      description: "Détendez-vous dans notre piscine et centre de bien-être.",
    },
    {
      icon: "📶",
      title: "Wi-Fi Gratuit",
      description: "Connexion Internet haut débit gratuite dans tout l'hôtel.",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            Bienvenue dans notre Hôtel
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
            L'expérience du luxe et du confort à votre portée
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
            onClick={() => navigate("/explore")}
          >
            Découvrir nos chambres
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: "bold" }}>
          Nos Services
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: "100%", textAlign: "center", boxShadow: 3 }}>
                <CardContent sx={{ pt: 4 }}>
                  <Box sx={{ mb: 2, fontSize: "4rem" }}>{feature.icon}</Box>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box sx={{ bgcolor: "#f5f5f5", py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800"
                alt="Hôtel"
                sx={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
                Un Séjour Inoubliable
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", mb: 2 }}>
                Notre hôtel allie tradition et modernité pour vous offrir une expérience unique. 
                Situé dans un cadre exceptionnel, nous proposons des services de qualité supérieure 
                pour rendre votre séjour mémorable.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", mb: 3 }}>
                Que vous soyez en voyage d'affaires ou en vacances, notre équipe dévouée est là 
                pour répondre à tous vos besoins avec le sourire et la professionnalisme.
              </Typography>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/explore")}
                sx={{ px: 4 }}
              >
                En savoir plus
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

