package domain

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)


type Product struct { 
	ID primitive.ObjectID `bson:"_id,omitempity" json:"id" `
	FarmerID string `bson:"farmer_id" json:"farmer_id"`
	Name string `bson:"name" json:"name"`
	Description string `bson:"description" json:"description"`
	Price float64 `bson:"price" json:"price"`
	Quantity float64 `bson:"quantity" json:"quantity"`
	Status string `bson:"status" json:"status"`
	ImageURL string `bson:"image_url" json:"image_url"`	
	Shipping bool `bson:"shipping" json:"shipping"`
	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}

type ProductUseCase interface {
	// GetAllProduct() interface{}
	// GetProductByID(id string) interface{}
	CreateProduct(userID string , product Product) interface{}
	// UpdateProduct(id string, product Product) interface{}
	// DeleteProduct(id string) interface{}
}

type ProductRepository interface {
	// GetAllProduct() ([]Product, error)
	GetProductByID(ctx context.Context , id string) (Product, error)
	CreateProduct(ctx context.Context ,product Product) (Product, error)
	// UpdateProduct(id string, product Product) (Product, error)
	// DeleteProduct(id string) (Product, error)
}

