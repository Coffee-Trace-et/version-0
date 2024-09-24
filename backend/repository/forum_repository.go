package repository

import (
	"coeffee/domain"
	"context"
	"strconv"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type forumRepository struct {
	database   mongo.Database
	collection string
}


func NewForumRepository(database mongo.Database, collection string) domain.BlogRepository {
	return &forumRepository{
		database:   database,
		collection: collection}
}


//  create blog

func (r *forumRepository) CreateBlog(ctx context.Context , blog domain.Blog) (domain.Blog, error) {

	collection  := r.database.Collection(r.collection)

	_, err := collection.InsertOne(ctx, blog)

	if err != nil {

		return domain.Blog{}, err

}

	return blog, nil

}


// get all blog 
func (ur *forumRepository) GetAllBlog(ctx context.Context , bytag, limit, page string) ([]domain.Blog, error) {
	var blog []domain.Blog

	// Build the query filter for name search if provided
	filter := bson.M{}
	if bytag != "" {
		filter = bson.M{"username": bson.M{"$regex": bytag, "$options": "i"}} // Case-insensitive search
	}

	// Convert limit and page to int
	limitInt, err := strconv.Atoi(limit)
	if err != nil {
		return []domain.Blog{}, err
	}

	pageInt, err := strconv.Atoi(page)
	if err != nil {
		return []domain.Blog{}, err
	}

	// Set pagination options
	options := options.Find()
	options.SetLimit(int64(limitInt)) // Convert limitInt to int64
	options.SetSkip(int64((pageInt - 1) * limitInt)) // Convert pageInt to int64 for skip calculation

	// Query the database with the filter and pagination options
	collection := ur.database.Collection(ur.collection)
	cursor, err := collection.Find(ctx, filter, options)
	if err != nil {
		return []domain.Blog{}, err
	}
	defer cursor.Close(context.Background())

	// Decode the results into the products slice
	for cursor.Next(context.Background()) {
		var blg domain.Blog
		if err := cursor.Decode(&blg); err != nil {
			return []domain.Blog{}, err
		}
		blog = append(blog, blg)
	}

	// Check for any cursor errors after iteration
	if err := cursor.Err(); err != nil {
		return []domain.Blog{}, err
	}

	return blog, nil
}

// get blog by id

func (ur *forumRepository) GetBlogByID(ctx context.Context , id string) (domain.Blog, error) {
	var blog domain.Blog

	objectID, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": objectID}

	err := ur.database.Collection(ur.collection).FindOne(ctx, filter).Decode(&blog)
	if err != nil {
		return domain.Blog{}, err
	}

	return blog, nil
}