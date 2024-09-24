package usecase

import (
	"coeffee/domain"
	"time"
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

func (uc *OrderUseCase) CreateOrder(order domain.Order) (domain.Order, error) {

	_, err := uc.OrderRepository.CreateOrder(order)
	if err != nil {
		return domain.Order{}, err
	}

	return order, nil
}
