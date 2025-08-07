package com.example.FlightReservationSystem.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.FlightReservationSystem.entity.Flight;
import com.example.FlightReservationSystem.repository.FlightRepository;
@Service
public class FlightService {
    @Autowired
    private FlightRepository flightRepo;
    public Flight addFlight(Flight flight) {
        return flightRepo.save(flight);
    }
    public List<Flight> getAllFlights() {
        return flightRepo.findAll();
    }
    public Flight getFlight(Long id) {
        return flightRepo.findById(id).orElseThrow(() -> new RuntimeException("Flight not found"));
    }
    public Flight updateFlight(Long id, Flight updated) {
        Flight flight = getFlight(id);
        flight.setOrigin(updated.getOrigin());
        flight.setDestination(updated.getDestination());
        flight.setDepartureTime(updated.getDepartureTime());
        flight.setSeatsAvailable(updated.getSeatsAvailable());
        return flightRepo.save(flight);
    }
    public void deleteFlight(Long id) {
        flightRepo.deleteById(id);
    }
}