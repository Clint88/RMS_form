// Core+
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { VehicleService } from '../services/vehicle.service';

// Models
import { Vehicle } from '../models/vehicle.model';

@Component({
  selector: 'app-vehicle-lookup',
  templateUrl: './vehicle-lookup.page.html',
  styleUrls: ['./vehicle-lookup.page.scss'],
})
export class VehicleLookupPage implements OnInit {
  vehicles: Observable<Vehicle[]> = this.vehicleService.vehicles$;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {}
}
