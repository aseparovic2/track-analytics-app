import gql from "graphql-tag";
export const TELEMETRY_BY_RANGE = gql`
  query getTelemetryByRange($start_date: String!, $end_date: String!)  {
    telemetry_data(query: {
        time_gte: $start_date,
        time_lte: $end_date
        }) {
        time,vehicleStats {
          mean_BCU_F_STBCU_F_wipers_speed_ST
          mean_BFI_RL_temp_1BFI_temp_sw_max
          mean_BFI_RL_temp_2BFI_temp_motor_1
          mean_BFI_RL_temp_2BFI_temp_motor_2
          mean_BFI_RL_temp_2BFI_temp_motor_3
          mean_BFI_RR_temp_1BFI_temp_sw_max
          mean_BFI_RR_temp_2BFI_temp_motor_1
          mean_BFI_RR_temp_2BFI_temp_motor_2
          mean_BFI_RR_temp_2BFI_temp_motor_3
          mean_CCU_F_STCCU_F_AC_ON_ST
          mean_CCU_F_STCCU_F_AC_fan_speed_ST
          mean_CCU_F_temp_1CCU_F_ambient_temp
          mean_CCU_F_temp_1CCU_F_evaporator_temp
          mean_CCU_F_temp_1CCU_F_heating_inlet_temp
          mean_CCU_F_temp_1CCU_F_heating_outlet_temp
          mean_CCU_F_temp_1CCU_F_interior_temp
          mean_CCU_R_temp_1CCU_R_batt_coolant_in_temp
          mean_CCU_R_temp_1CCU_R_batt_coolant_out_temp
          mean_HPI_FL_inverter_tempHPI_temp_IGBT1
          mean_HPI_FL_inverter_tempHPI_temp_IGBT2
          mean_HPI_FL_inverter_tempHPI_temp_IGBT3
          mean_HPI_FL_phase_curr_motor_tempHPI_temp_motor1
          mean_HPI_FL_phase_curr_motor_tempHPI_temp_motor2
          mean_HPI_FR_inverter_tempHPI_temp_IGBT1
          mean_HPI_FR_inverter_tempHPI_temp_IGBT2
          mean_HPI_FR_inverter_tempHPI_temp_IGBT3
          mean_HPI_FR_phase_curr_motor_tempHPI_temp_motor1
          mean_HPI_FR_phase_curr_motor_tempHPI_temp_motor2
          mean_PCU_IVI_FB_2PCU_vehicle_range
          mean_PCU_power_LIMPCU_drive_power_LIM
          mean_PCU_power_LIMPCU_drive_power_available
          mean_PCU_power_LIMPCU_regen_power_LIM
          mean_PDU_BMS_cell_min_max_valsPDU_cell_temp_max
          mean_PDU_BMS_cell_min_max_valsPDU_cell_temp_min
          mean_PDU_BMS_cell_min_max_valsPDU_cell_voltage_max
          mean_PDU_BMS_cell_min_max_valsPDU_cell_voltage_min
          mean_PDU_HV_LV_statusPDU_HV_battery_SOC
          mean_PDU_HV_LV_statusPDU_HV_battery_SOH
          mean_PDU_HV_battery_performancePDU_HV_battery_current
          mean_PDU_HV_battery_performancePDU_HV_battery_voltage
          mean_PDU_HV_consumptionsPDU_HV_batt_consumption_charged
          mean_PDU_HV_consumptionsPDU_HV_batt_consumption_regen
          mean_PDU_HV_consumptionsPDU_HV_batt_consumption_total
          mean_PDU_HV_energyPDU_HV_battery_SOE
          mean_PDU_HV_energyPDU_HV_battery_energy_available
          mean_SAFETY_PCU_STPCU_vehicle_output_power
          mean_SAFETY_PCU_knobs_STPCU_PRND_mode_ST
          mean_SAFETY_PCU_vehicle_STPCU_accelerator_pedal
          mean_SAFETY_PCU_vehicle_STPCU_vehicle_mileage
          mean_SAFETY_PCU_vehicle_STPCU_vehicle_speed
          mean_SAFETY_VCU_vehicle_STVCU_vehicle_ST
          mean_SCU_PSG_STSCU_PSG_seat_occupied
          mean_gpsPos_altitude
          mean_gpsPos_heading
          mean_gpsPos_latitude
          mean_gpsPos_longitude
        }
    }
}
`;
