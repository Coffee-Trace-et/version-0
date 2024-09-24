package domain

import (
	"context"
	"time"
)

type Order struct {
	ID          string `json:"id" bson:"_id"`
	ProductID   string `json:"product_id" bson:"product_id"`
	MerchantID  string `json:"merchant_id" bson:"merchant_id"`
	FarmerID   string `json:"farmer_id" bson:"farmer_id"`
	Quantity    int    `json:"quantity" bson:"quantity"`
	TotalPrice  int    `json:"total_price" bson:"total_price"`
	OrderStatus string `json:"order_status" bson:"order_status"`
	OrderDate   time.Time `json:"order_date" bson:"order_date"`
}

type OrderRepository interface {
	CreateOrder(ctx context.Context, order Order) error
	GetOrderByID(ctx context.Context, id string) (Order, error)
	UpdateOrder(ctx context.Context, order Order) error
	GetOrdersByMerchantID(ctx context.Context, merchantID string) ([]Order, error)
}


type OrderUseCase interface { 
	CreateOrder(userId string, productId string , order Order) interface{}
	UpdateOrder(orderId string, userId string , status string) interface{}
	GetMyOrders(userId string) interface{}	
	ChooseDriver(userid string , orderId string, driverId string) interface{}
}
