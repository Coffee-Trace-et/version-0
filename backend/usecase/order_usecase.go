package usecase

import (
	"coeffee/domain"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type OrderUseCase struct {
	OrderRepository  domain.OrderRepository
	ProductRepository domain.ProductRepository
	NofiticationRepository domain.NotificationRepository
	UserRepository domain.UserRepository
	contextTimeout    time.Duration
}

func NewOrderUseCase(order domain.OrderRepository, notify domain.NotificationRepository ,  userrepo domain.UserRepository , productrepo domain.ProductRepository , timeout time.Duration) domain.OrderUseCase {
	return &OrderUseCase{
		OrderRepository: order,
		ProductRepository: productrepo,
		UserRepository: userrepo,
		NofiticationRepository: notify,
		contextTimeout: timeout,
	}

}

func (uc *OrderUseCase) CreateOrder(userId string , productId string, order domain.Order) interface{} {
	ctx, cancel := context.WithTimeout(context.Background(), uc.contextTimeout)
	defer cancel()

	order.ID = primitive.NewObjectID().Hex()
	order.OrderDate = time.Now()
	order.OrderStatus = "pending"
	order.MerchantID = userId
	order.ProductID = productId

	
	merchat , err := uc.UserRepository.GetUserByID(ctx, userId)
	if err != nil {
		return domain.ErrorResponse{Message: "Merchant not found" , Status: 404}
	}
	productdata , err := uc.ProductRepository.GetProductByID(ctx, productId)

	if err != nil {
		return domain.ErrorResponse{Message: "Product not found" , Status: 404}
	}

	farmerData , err := uc.UserRepository.GetUserByID(ctx, productdata.FarmerID)

	if err != nil {
		return domain.ErrorResponse{Message: "Farmer not found" , Status: 404}
	}

	// if merchat.Role != "merchant" {
	// 	return domain.ErrorResponse{Message: "You are not authorized to create an order", Status: 401}
	// }

	err = uc.OrderRepository.CreateOrder(ctx, order)
	if err != nil {
		return domain.ErrorResponse{Message: "Failed to create order", Status: 400}
	}

	// call the notification right here



	Farmernotification := domain.Notification{}
	Farmernotification.Shipping = "pending"
	

	Merchantnotification := domain.Notification{}
	Merchantnotification.Shipping = "pending"

	Farmernotification.ID = primitive.NewObjectID()
	Farmernotification.NotificationDate = time.Now()
	Farmernotification.Name = merchat.Name
	Farmernotification.Type = productdata.Name


	Merchantnotification.ID = primitive.NewObjectID()
	Merchantnotification.NotificationDate = time.Now()
	Merchantnotification.Name = farmerData.Name
	Merchantnotification.Type = productdata.Name
	Merchantnotification.Quantity = productdata.Quantity

	// send notification to farmer

	err = uc.NofiticationRepository.CreateNotification(ctx, Farmernotification)

	if err != nil { 
		return domain.ErrorResponse{Message: "Failed to send notification to farmer", Status: 400}
	}

	// send notification to merchant

	err = uc.NofiticationRepository.CreateNotification(ctx, Merchantnotification)


	if err != nil {
		return domain.ErrorResponse{Message: "Failed to send notification to merchant", Status: 400}
	}


	return domain.SuccessResponse{Message: "Order created successfully", Status: 200}
	
}


func (uc *OrderUseCase) UpdateOrder(orderId string, userid string ,  status string) interface{} {

	ctx, cancel := context.WithTimeout(context.Background(), uc.contextTimeout)
	defer cancel()

	existingOrder , err := uc.OrderRepository.GetOrderByID(ctx, orderId)

	if err != nil {
		return domain.ErrorResponse{Message: "Order not found" , Status: 404}
	}

	if existingOrder.OrderStatus != "pending" {
		return domain.ErrorResponse{Message: "You are not authorized to update this order", Status: 401}
	}

	existingOrder.OrderStatus = status

	// id := existingOrder.ProductID

	err = uc.OrderRepository.UpdateOrder(ctx, existingOrder)

	// update both notification status by comparing the id of the product

	// notification , err := uc.NofiticationRepository.UpdateNotificationbyID(ctx, id)
	// notification , err := 



	if err != nil {
		return domain.ErrorResponse{Message: "Failed to update order", Status: 400}
	}

	return domain.SuccessResponse{Message: "Order updated successfully", Status: 200}

}

func (uc *OrderUseCase) GetMyOrders(userId string) interface{} { 


	// get the order which is orderd by mechant_id equal to user id as string

	ctx, cancel := context.WithTimeout(context.Background(), uc.contextTimeout)

	defer cancel()

	orders , err := uc.OrderRepository.GetOrdersByMerchantID(ctx, userId)

	if err != nil {
		return domain.ErrorResponse{Message: "Failed to get orders", Status: 400}
	}

	return domain.OrderResponse{Message: "Orders fetched successfully", Status: 200, Orders: orders}

}


// ChooseDriver

func (uc *OrderUseCase) ChooseDriver(userid string , orderId string, driverId string) interface{} { 

	ctx, cancel := context.WithTimeout(context.Background(), uc.contextTimeout)

	defer cancel()

	// send notification to the driver that he has been chosen







	return nil
}