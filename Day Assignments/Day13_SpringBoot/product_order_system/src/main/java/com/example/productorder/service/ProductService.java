package com.example.productorder.service;

import com.example.productorder.entity.Product;
import com.example.productorder.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepo;

    public Product addProduct(Product p) {
        return productRepo.save(p);
    }

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product updateStock(Long productId, int qty) {
        Product product = productRepo.findById(productId).orElseThrow();
        product.setAvailableQuantity(product.getAvailableQuantity() + qty);
        return productRepo.save(product);
    }
}
