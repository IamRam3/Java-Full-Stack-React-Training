package com.example.FlightReservationSystem.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.FlightReservationSystem.entity.Flight;
import com.example.FlightReservationSystem.service.FlightService;
@RestController
@RequestMapping("/api/flights")
public class FlightController {
    @Autowired private FlightService flightService;
    @PostMapping public ResponseEntity<Flight> add(@RequestBody Flight flight) {
        return ResponseEntity.ok(flightService.addFlight(flight)); }
    @GetMapping
    public List<Flight> all() {
        return flightService.getAllFlights();
    }
    @GetMapping("/{id}")
    public Flight get(@PathVariable Long id) {
        return flightService.getFlight(id);
    }
    @PutMapping("/{id}")
    public Flight update(@PathVariable Long id, @RequestBody Flight f) {
        return flightService.updateFlight(id, f);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        flightService.deleteFlight(id);
    }
}