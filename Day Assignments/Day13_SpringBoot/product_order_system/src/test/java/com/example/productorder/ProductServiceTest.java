package com.example.productorder;

import com.example.productorder.entity.Product;
import com.example.productorder.repository.ProductRepository;
import com.example.productorder.service.ProductService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepo;

    @InjectMocks
    private ProductService productService;

    @Test
    void testAddProduct() {
        Product p = new Product(1L, "Mouse", 500, 10);
        when(productRepo.save(p)).thenReturn(p);

        Product saved = productService.addProduct(p);

        assertEquals(p, saved);
    }

    @Test
    void testGetAllProducts() {
        when(productRepo.findAll()).thenReturn(List.of(new Product(), new Product()));
        List<Product> list = productService.getAllProducts();
        assertEquals(2, list.size());
    }

    @Test
    void testUpdateStock() {
        Product p = new Product(1L, "Keyboard", 800, 5);
        when(productRepo.findById(1L)).thenReturn(java.util.Optional.of(p));
        when(productRepo.save(any())).thenReturn(p);

        Product updated = productService.updateStock(1L, 3);
        assertEquals(8, updated.getAvailableQuantity());
    }
}
