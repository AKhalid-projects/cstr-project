'use client'
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Simulation from '@/components/simulation/Simulation';
import SimulationGraphs from '@/components/simulation/visualization/SimulationGraphs';
import { useSimulationState } from '@/hooks/simulation/useSimulationState';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import SimulationControls from '@/components/simulation/controls/SimulationControls';
import { initialState, calculateTankLevels } from '@/lib/utils/simulation-calculations'

export default function TuningPage() {
    const { state, updateControlParams, updateState, isRunning, startSimulation, stopSimulation } = useSimulationState();
    const [kp, setKp] = useState(state.controller.kp.toString());
    const [ki, setKi] = useState(state.controller.ki.toString());
    const [kd, setKd] = useState(state.controller.kd.toString());
    const [setpoint, setSetpoint] = useState(state.controller.setpoint.toString());

    // Start simulation effect
    useEffect(() => {
        const interval = isRunning ? setInterval(() => {
            const newState = calculateTankLevels(state)
            updateState({
                ...newState,
                isRunning
            })
        }, 100) : null;

        return () => {
            if (interval) clearInterval(interval);
        }
    }, [isRunning, state, updateState]);

    // Handle PID parameter updates
    const handleParamUpdate = useCallback(() => {
        const params = {
            kp: parseFloat(kp),
            ki: parseFloat(ki),
            kd: parseFloat(kd),
            setpoint: parseFloat(setpoint)
        };

        if (!isNaN(params.kp) && !isNaN(params.ki) && !isNaN(params.kd) && !isNaN(params.setpoint)) {
            updateControlParams({
                controller: params
            });
        }
    }, [kp, ki, kd, setpoint, updateControlParams]);

    // Handle simulation controls
    const handleStartStop = () => {
        if (isRunning) {
            stopSimulation();
        } else {
            startSimulation();
            handleParamUpdate(); // Update parameters when starting
        }
    };

    // Handle reset
    const handleReset = () => {
        updateState(initialState);
        setKp(initialState.controller.kp.toString());
        setKi(initialState.controller.ki.toString());
        setKd(initialState.controller.kd.toString());
        setSetpoint(initialState.controller.setpoint.toString());
        if (isRunning) {
            stopSimulation();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <main className="max-w-7xl mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold text-white">PID Tuning Interface</h1>
                        <div className="space-x-4">
                            <Button
                                variant={isRunning ? 'destructive' : 'default'}
                                onClick={handleStartStop}
                            >
                                {isRunning ? 'Stop' : 'Start'} Simulation
                            </Button>
                            <Button 
                                variant="secondary"
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <Card className="bg-gray-800 border-gray-700">
                                <h2 className="text-2xl font-semibold text-white mb-4">Simulation</h2>
                                <Simulation 
                                    controlParameters={state.controller}
                                    systemParameters={state}
                                />
                            </Card>

                            <Card className="bg-gray-800 border-gray-700 p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Control Parameters</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="kp" className="text-gray-300">Proportional Gain (Kp)</Label>
                                        <Input
                                            id="kp"
                                            type="number"
                                            value={kp}
                                            onChange={(e) => setKp(e.target.value)}
                                            step="0.1"
                                            className="bg-gray-700 border-gray-600 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ki" className="text-gray-300">Integral Gain (Ki)</Label>
                                        <Input
                                            id="ki"
                                            type="number"
                                            value={ki}
                                            onChange={(e) => setKi(e.target.value)}
                                            step="0.1"
                                            className="bg-gray-700 border-gray-600 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="kd" className="text-gray-300">Derivative Gain (Kd)</Label>
                                        <Input
                                            id="kd"
                                            type="number"
                                            value={kd}
                                            onChange={(e) => setKd(e.target.value)}
                                            step="0.1"
                                            className="bg-gray-700 border-gray-600 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="setpoint" className="text-gray-300">Setpoint</Label>
                                        <Input
                                            id="setpoint"
                                            type="number"
                                            value={setpoint}
                                            onChange={(e) => setSetpoint(e.target.value)}
                                            step="0.1"
                                            className="bg-gray-700 border-gray-600 text-white"
                                        />
                                    </div>
                                </div>
                                <Button
                                    className="w-full mt-4"
                                    variant="secondary"
                                    onClick={handleParamUpdate}
                                >
                                    Update Parameters
                                </Button>
                            </Card>
                        </div>

                        <div className="space-y-8">
                            <Card className="bg-gray-800 border-gray-700 p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Graphs</h2>
                                <SimulationGraphs 
                                    tank1Level={(state.tank1.height / state.tank1.maxHeight) * 100}
                                    tank2Level={(state.tank2.height / state.tank2.maxHeight) * 100}
                                    controllerOutput={state.controllerOutput}
                                    pumpFlow={state.pumpFlow}
                                    setpoint={state.controller.setpoint}
                                />
                            </Card>

                            <Card className="bg-gray-800 border-gray-700 p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">System Parameters</h2>
                                <SimulationControls
                                    tank1Area={state.tank1.area}
                                    onTank1AreaChange={(area) => updateState({
                                        tank1: { ...state.tank1, area }
                                    })}
                                    controllerOutput={state.controllerOutput}
                                    onControllerOutputChange={(value) => updateState({ 
                                        controllerOutput: value 
                                    })}
                                    tank2Area={state.tank2.area}
                                    onTank2AreaChange={(area) => updateState({
                                        tank2: { ...state.tank2, area }
                                    })}
                                    pumpFlow={state.pumpFlow}
                                    onPumpFlowChange={(value) => updateState({ 
                                        pumpFlow: value 
                                    })}
                                    disabled={!isRunning}
                                />
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
} 