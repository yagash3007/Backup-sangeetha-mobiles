import React from "react";
import { Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography"; 

const ProductCards = ({ data }) => {
  // Check if `data` is an array before calling .map()
  if (!Array.isArray(data)) {
    console.error("Expected data to be an array, but got:", data);
    return <div>No products available.</div>;  
  }

  return (
    <div className="flex space-x-6">
      {data.map((item, index) => (
        <Card key={index} sx={{ maxWidth: 345 }} className="flex-none">
          <CardActionArea>
            <CardMedia
              component="img"
              height="100"
              width="150" 
              image={item.product_img}
              alt={item.brand || "Mobile Image"}
              sx={{ objectFit: 'cover' }} 
            />
            <CardContent>
              <div className="text-md font-bold">
                {item.product_name || "Product Name"}
              </div>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                RAM: {item.ram} GB | Storage: {item.storage} GB | Battery:{" "}
                {item.battery} mAh
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Price: {item.price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default ProductCards;
