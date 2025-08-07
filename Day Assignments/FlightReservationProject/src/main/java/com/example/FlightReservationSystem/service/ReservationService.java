package com.example.FlightReservationSystem.service;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.FlightReservationSystem.entity.Flight;
import com.example.FlightReservationSystem.entity.Reservation;
import com.example.FlightReservationSystem.repository.FlightRepository;
import com.example.FlightReservationSystem.repository.ReservationRepository;
@Service
public class ReservationService {
    @Autowired
    private ReservationRepository resRepo;
    @Autowired
    private FlightRepository flightRepo;
    public Reservation makeReservation(Long flightId, Reservation res) {
        Flight flight = flightRepo.findById(flightId).orElseThrow(() -> new RuntimeException("Flight not found"));
        if (res.getSeatsBooked() > flight.getSeatsAvailable())
            throw new RuntimeException("Not enough seats");
        flight.setSeatsAvailable(flight.getSeatsAvailable() - res.getSeatsBooked());
        res.setFlight(flight);
        res.setReservedAt(LocalDateTime.now());
        flightRepo.save(flight);
        return resRepo.save(res);
    }
    public List<Reservation> getAllReservations() {
        return resRepo.findAll();
    }
    public List<Reservation> getReservationsByFlight(Long flightId) {
        return resRepo.findByFlightId(flightId);
    }
    public void cancelReservation(Long id) {
        Reservation res = resRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        Flight flight = res.getFlight();
        flight.setSeatsAvailable(flight.getSeatsAvailable() + res.getSeatsBooked());
        resRepo.delete(res);
        flightRepo.save(flight);
    }
}