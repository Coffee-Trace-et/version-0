package repository

import (
	"coeffee/domain"
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

type replyRepository struct {
	database   mongo.Database
	collection string
}


func NewReplyRepository(database mongo.Database, collection string) domain.ReplyRepository {
	return &replyRepository{
		database:   database,
		collection: collection}
}

func (r *replyRepository) CreateReply(ctx context.Context , reply domain.Reply) (domain.Reply, error) {
	
	collection  := r.database.Collection(r.collection)

	_, err := collection.InsertOne(ctx, reply)

	if err != nil {
		return domain.Reply{}, err
	}

	return reply, nil

}

