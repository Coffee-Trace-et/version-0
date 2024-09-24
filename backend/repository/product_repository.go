package repository

import (
	"coeffee/domain"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type productRepository struct {
	database   mongo.Database
	collection string
}


func NewProductRepository(database mongo.Database, collection string) domain.ProductRepository {
	return &productRepository{
		database:   database,
		collection: collection}
}

func (r *productRepository) CreateProduct(ctx context.Context , product domain.Product) (domain.Product, error) {
	
	collection := r.database.Collection(r.collection)
	_, err := collection.InsertOne(ctx, product)

	if err != nil {
		return domain.Product{}, err
	}

	return product, nil

}

// get by id

func (r *productRepository) GetProductByID(ctx context.Context, id string) (domain.Product, error) {
	
	collection := r.database.Collection(r.collection)

	var product domain.Product

	// change the string in to primitive object id
	newid , err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return domain.Product{}, err
	}
	filter := bson.M{"_id": newid}

	err = collection.FindOne(ctx, filter).Decode(&product)

	if err != nil {
		return domain.Product{}, err
	}

	return product, nil
	
}





