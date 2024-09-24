package domain

import (
	"time"
)

type Order struct {
	ID          string `json:"id" bson:"_id"`
	ProductID   string `json:"product_id" bson:"product_id"`
	MerchantID  string `json:"merchant_id" bson:"merchant_id"`
	FarmerID   string `json:"farmer_id" bson:"farmer_id"`
	FarmerName string `json:"farmer_name" bson:"farmer_name"`



	Quantity    int    `json:"quantity" bson:"quantity"`
	TotalPrice  int    `json:"total_price" bson:"total_price"`
	OrderStatus string `json:"order_status" bson:"order_status"`
	OrderDate   time.Time `json:"order_date" bson:"order_date"`

	OrderType string `json:"order_type" bson:"order_type"`
	DriverID string `json:"driver_id" bson:"driver_id"`
	DriverStatus string `json:"driver_status" bson:"driver_status"`
	StartLocation string `json:"start_location" bson:"start_location"`
	DestinationLocation string `json:"end_location" bson:"end_location"`



	ShippingCoverage string `json:"shipping_coverage" bson:"shipping_coverage"`
	ShippingCost int `json:"shipping_cost" bson:"shipping_cost"`
	ShippingDate time.Time `json:"shipping_date" bson:"shipping_date"`
	ShippingStatus string `json:"shipping_status" bson:"shipping_status"`


}

type OrderRepository interface {
	CreateOrder (order Order) (Order, error)
}

type OrderUseCase interface {
	CreateOrder(order Order) (Order, error)
}
