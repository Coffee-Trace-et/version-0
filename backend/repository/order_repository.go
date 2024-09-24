package repository

import (
	"coeffee/domain"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func (r *OrderRepository) CreateOrder(ctx context.Context, order domain.Order) error { 
	_, err := r.database.Collection(r.collection).InsertOne(ctx, order)

	if err != nil {
		return err
	}
	return nil
}


func (r *OrderRepository) UpdateOrder(ctx context.Context, order domain.Order) error {

	id := order.ID

	objId , err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return err
	}

	filter := bson.M{"_id": objId}

	update := bson.M{
		"$set": bson.M{
			"order_status": order.OrderStatus,
		},
	}

	_, err = r.database.Collection(r.collection).UpdateOne(ctx, filter, update)

	if err != nil {
		return err
	}

	return nil


}


func (r *OrderRepository) GetOrderByID(ctx context.Context, id string) (domain.Order, error) {
	var order domain.Order
	newid , err := primitive.ObjectIDFromHex(id)
	collection := r.database.Collection(r.collection)
	if err != nil {
		return domain.Order{}, err
	}
	filter := bson.M{"_id": newid}

	err = collection.FindOne(ctx, filter).Decode(&order)

	if err != nil {
		return domain.Order{}, err
	}
	return order, nil
}

// GetOrdersByMerchantID

func (r *OrderRepository) GetOrdersByMerchantID(ctx context.Context, merchantID string) ([]domain.Order, error) {

	// filter the data from the whole table 
	filter := bson.M{"merchant_id": merchantID}

	cursor, err := r.database.Collection(r.collection).Find(ctx, filter)

	if err != nil {
		return nil, err
	}

	var orders []domain.Order

	for cursor.Next(ctx) {
		var order domain.Order
		cursor.Decode(&order)
		orders = append(orders, order)
	}

	return orders, nil
}