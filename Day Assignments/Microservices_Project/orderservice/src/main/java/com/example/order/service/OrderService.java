package com.example.order.service;

import com.example.order.entity.Order;
import java.util.List;

public interface OrderService {
    Order placeOrder(Order order);
    List<Order> getAllOrders();
}
