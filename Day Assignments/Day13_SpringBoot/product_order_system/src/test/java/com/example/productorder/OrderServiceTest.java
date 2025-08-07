package com.example.productorder;

import com.example.productorder.entity.Order;
import com.example.productorder.entity.Product;
import com.example.productorder.repository.OrderRepository;
import com.example.productorder.repository.ProductRepository;
import com.example.productorder.service.OrderService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private ProductRepository productRepo;

    @Mock
    private OrderRepository orderRepo;

    @InjectMocks
    private OrderService orderService;

    @Test
    void testPlaceOrder_Success() {
        // Arrange
        Product product = new Product(1L, "Keyboard", 1000, 5);
        when(productRepo.findById(1L)).thenReturn(Optional.of(product));
        when(productRepo.save(any())).thenReturn(product);
        when(orderRepo.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        Order order = orderService.placeOrder(1L, 3);

        // Assert
        assertNotNull(order);
        assertEquals(2, product.getAvailableQuantity());
        assertEquals(3, order.getQuantityOrdered());
    }

    @Test
    void testPlaceOrder_FailureDueToInsufficientStock() {
        // Arrange
        Product product = new Product(1L, "Monitor", 12000, 2);
        when(productRepo.findById(1L)).thenReturn(Optional.of(product));

        // Act + Assert
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> orderService.placeOrder(1L, 5));
        assertEquals("Insufficient stock!", exception.getMessage());
    }
}
