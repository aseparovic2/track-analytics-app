import gql from "graphql-tag";
export const TELEMETRY_BY_RANGE = gql`
  query  {
   telemetry_data(query: {
       time_gte: "2021-01-14T16:30",
       time_lte: "2021-01-14T18:29",
           car: {
               _id: "6244b3023b002944b2598e18"
           }
       }, limit: 3000) {
       _id
       car {
           _id
           battery
           body
           color
           licence
           model
           power
           range
           torque
           transmission
           user_id {
               _id
           }
       }
       time
       user_id {
           _id
       }
       vehicleStats {
           mean_BCU_F_ST {
               BCU_F_wipers_speed_ST
           }
           mean_BFI_RL_temp_1 {
               BFI_temp_sw_max
           }
           mean_BFI_RL_temp_2 {
               BFI_temp_motor_1
               BFI_temp_motor_2
               BFI_temp_motor_3
           }
           mean_BFI_RR_temp_1 {
               BFI_temp_sw_max
           }
           mean_BFI_RR_temp_2 {
               BFI_temp_motor_1
               BFI_temp_motor_2
               BFI_temp_motor_3
           }
           mean_CCU_F_temp_1 {
               CCU_F_ambient_temp
               CCU_F_evaporator_temp
               CCU_F_heating_inlet_temp
               CCU_F_heating_outlet_temp
               CCU_F_interior_temp
           }
           mean_CCU_R_temp_1 {
               CCU_R_batt_coolant_in_temp
               CCU_R_batt_coolant_out_temp
           }
           mean_HPI_FL_inverter_temp {
               HPI_temp_IGBT1
               HPI_temp_IGBT2
               HPI_temp_IGBT3
           }
           mean_HPI_FL_phase_curr_motor_temp {
               HPI_temp_motor1
               HPI_temp_motor2
           }
           mean_HPI_FR_inverter_temp {
               HPI_temp_IGBT1
               HPI_temp_IGBT2
               HPI_temp_IGBT3
           }
           mean_HPI_FR_phase_curr_motor_temp {
               HPI_temp_motor1
               HPI_temp_motor2
           }
           mean_PCU_IVI_FB_2 {
               PCU_vehicle_range
           }
           mean_PCU_power_LIM {
               PCU_drive_power_LIM
               PCU_drive_power_available
               PCU_regen_power_LIM
           }
           mean_PDU_BMS_cell_min_max_vals {
               PDU_cell_temp_max
               PDU_cell_temp_min
               PDU_cell_voltage_max
               PDU_cell_voltage_min
           }
           mean_PDU_HV_LV_status {
               PDU_HV_battery_SOC
               PDU_HV_battery_SOH
           }
           mean_PDU_HV_battery_performance {
               PDU_HV_battery_current
               PDU_HV_battery_voltage
           }
           mean_PDU_HV_consumptions {
               PDU_HV_batt_consumption_charged
               PDU_HV_batt_consumption_regen
               PDU_HV_batt_consumption_total
           }
           mean_PDU_HV_energy {
               PDU_HV_battery_SOE
               PDU_HV_battery_energy_available
           }
           mean_SAFETY_PCU_ST {
               PCU_vehicle_output_power
           }
           mean_SAFETY_PCU_knobs_ST {
               PCU_PRND_mode_ST
           }
           mean_SAFETY_PCU_vehicle_ST {
               PCU_accelerator_pedal
               PCU_vehicle_mileage
               PCU_vehicle_speed
           }
           mean_SAFETY_VCU_vehicle_ST {
               VCU_vehicle_ST
           }
           mean_gps {
               pos_latitude
               pos_longitude
           }
       }
   }
}


`;
