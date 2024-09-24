package repository

import (
	"coeffee/domain"
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

type OrderRepository struct {
	database   mongo.Database
	collection string
}

func NewOrderRepository(database mongo.Database, collection string) domain.OrderRepository {
	return &OrderRepository{
		database:   database,
		collection: collection}

}

func (or *OrderRepository) CreateOrder(order domain.Order) (domain.Order, error) {
	_, err := or.database.Collection(or.collection).InsertOne(context.Background() , order)
	if err != nil {
		return domain.Order{}, err	
	}
	return order, nil
}