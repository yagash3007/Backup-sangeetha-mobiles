import React, { useState } from "react";
import { CardActionArea, Card, CardMedia, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Typography } from "@mui/material";

const ProductCards = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

 
  if (!Array.isArray(data)) {
    console.error("Expected data to be an array, but got:", data);
    return <div>No products available.</div>;
  }

 
  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

 
  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex space-x-6">
      {data.map((item, index) => (
        <Card key={index} sx={{ maxWidth: 345 }} className="flex-none">
          <CardActionArea onClick={() => handleCardClick(item)}>
            <CardMedia
              component="img"
              height="100"
              width="150" 
              image={item.product_img}
              alt={item.brand || "Product Image"}
              sx={{ objectFit: 'cover' }} 
            />
            <CardContent>
              <div className="text-md font-bold">
                {item.product_name || "Product Name"}
              </div>

              
              {item.ram ? (
                
                <>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    RAM: {item.ram} GB | Storage: {item.storage} GB | Battery: {item.battery} mAh
                  </Typography>
                </>
              ) : (
                
                <>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Price: {item.price} | Brand: {item.brand}
                  </Typography>
                </>
              )}

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Price: {item.price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

      
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Product Details</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Card sx={{ display: 'flex', boxShadow: 3 }}>
              <Grid container spacing={2}>
               
                <Grid item xs={12} md={4}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={selectedProduct.product_img}
                    alt={selectedProduct.product_name}
                    sx={{ objectFit: 'cover', borderRadius: 2 }}
                  />
                </Grid>

                
                <Grid item xs={12} md={8}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{selectedProduct.product_name}</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>Brand: {selectedProduct.brand}</Typography>

                    {selectedProduct.ram ? (
                      <div>
                        <Typography variant="body2">RAM: {selectedProduct.ram} GB</Typography>
                        <Typography variant="body2">Storage: {selectedProduct.storage} GB</Typography>
                        <Typography variant="body2">Battery: {selectedProduct.battery} mAh</Typography>
                      </div>
                    ) : (
                      <Typography variant="body2">Price: {selectedProduct.price}</Typography>
                    )}

                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mt: 2 }}>Price: {selectedProduct.price}</Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
          <Button onClick={handleClose} variant="contained" color="primary" sx={{ padding: '6px 20px' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductCards;
