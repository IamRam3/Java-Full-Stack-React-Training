package com.example.delivery.service;

import com.example.delivery.entity.Delivery;
import java.util.List;

public interface DeliveryService {
    Delivery scheduleDelivery(Delivery delivery);
    List<Delivery> getAllDeliveries();
}
