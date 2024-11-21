import React, { useState } from "react";
import { Card, CardActionArea, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button, Grid } from "@mui/material";

const ProductCards = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Check if the data is an array
  if (!Array.isArray(data)) {
    console.error("data......:", data);
    return <div>No products available.</div>;
  }

  // Function to handle opening the product detail dialog
  const handleCardClick = (item) => {
    setSelectedProduct(item);
    setOpen(true);
  };

  // Function to close the product detail dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  // Function to render product details based on type
  const renderProductDetails = (item) => {
  console.log('Product Item:', item); // Debugging line

  if (item.ram) {
    // Mobile or Laptop (check for RAM, screen size, etc.)
    return (
      <>
        <Typography variant="body2">RAM: {item.ram} GB</Typography>
        <Typography variant="body2">Storage: {item.storage} GB</Typography>
        {item.screen_size && <Typography variant="body2">Screen Size: {item.screen_size} inches</Typography>}
        {item.operating_system && <Typography variant="body2">OS: {item.operating_system}</Typography>}
        {item.processor && <Typography variant="body2">Processor: {item.processor}</Typography>}
        {item.battery && <Typography variant="body2">Battery: {item.battery} mAh</Typography>}
        {item.camera && <Typography variant="body2">Camera: {item.camera} MP</Typography>}
      </>
    );
  } else if (item.product_img) {
    // Headphones or Smartwatch (these don't have screen_size, operating_system, or processor)
    return (
      <>
        <Typography variant="body2">Battery: {item.battery} mAh</Typography>
        <Typography variant="body2">Connectivity: {item.connectivity}</Typography>
      </>
    );
  }
  return null;
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
              alt={item.product_name || "Product Image"}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <div className="text-md font-bold">
                {item.product_name || "Product Name"}
              </div>

              {renderProductDetails(item)}

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Price: {item.price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

      {/* Dialog for Product Details */}
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
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      {selectedProduct.product_name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      Brand: {selectedProduct.brand}
                    </Typography>

                    {renderProductDetails(selectedProduct)}

                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mt: 2 }}>
                      Price: {selectedProduct.price}
                    </Typography>

                    {/* Description only in the dialog */}
                    <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                      <strong>Description:</strong>
                      {selectedProduct.description && selectedProduct.description.trim() !== ""
                        ? selectedProduct.description
                        : "No description available."}
                    </Typography>
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
