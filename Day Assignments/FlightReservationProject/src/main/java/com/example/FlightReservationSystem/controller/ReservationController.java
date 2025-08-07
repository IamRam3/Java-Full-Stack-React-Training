package com.example.FlightReservationSystem.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.FlightReservationSystem.entity.Reservation;
import com.example.FlightReservationSystem.service.ReservationService;
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    @Autowired private ReservationService resService;
    @PostMapping
    public Reservation reserve(@RequestParam Long flightId, @RequestBody Reservation res) {
        return resService.makeReservation(flightId, res);
    }
    @GetMapping
    public List<Reservation> all() {
        return resService.getAllReservations();
    }
    @GetMapping("/flight/{flightId}")
    public List<Reservation> byFlight(@PathVariable Long flightId) {
        return resService.getReservationsByFlight(flightId);
    }
    @DeleteMapping("/{id}")
    public void cancel(@PathVariable Long id) {
        resService.cancelReservation(id);
    }
}