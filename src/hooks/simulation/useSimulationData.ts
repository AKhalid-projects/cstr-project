import { useCallback, useRef } from 'react';
import { SimulationState } from '@/lib/types/simulation';
import { SimulationDataManager } from '@/lib/utils/simulation-data';

export function useSimulationData() {
  const dataManager = useRef(new SimulationDataManager());

  /**
   * Add a data point from the current simulation state
   */
  const addDataPoint = useCallback((state: SimulationState) => {
    dataManager.current.addDataPoint(state);
  }, []);

  /**
   * Clear all collected data
   */
  const clearData = useCallback(() => {
    dataManager.current.clearData();
  }, []);

  /**
   * Export collected data as CSV and trigger download
   */
  const exportData = useCallback(() => {
    const csv = dataManager.current.exportToCSV();
    if (!csv) return;

    // Create a blob and download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Set up the download
    link.setAttribute('href', url);
    link.setAttribute('download', `simulation_data_${new Date().toISOString()}.csv`);
    link.style.visibility = 'hidden';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  /**
   * Get the number of data points collected
   */
  const getDataPointCount = useCallback(() => {
    return dataManager.current.getDataPointCount();
  }, []);

  return {
    addDataPoint,
    clearData,
    exportData,
    getDataPointCount
  };
} 