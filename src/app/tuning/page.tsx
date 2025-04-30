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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ControlStrategy } from '@/lib/types/simulation';
import { SimulationState } from '@/lib/types/simulation'
import { Switch } from "@/components/ui/switch"

export default function TuningPage() {
    const { state, updateControlParams, updateState, isRunning, startSimulation, stopSimulation } = useSimulationState();
    const [kp, setKp] = useState(state.controller.kp.toString());
    const [ki, setKi] = useState(state.controller.ki.toString());
    const [kd, setKd] = useState(state.controller.kd.toString());
    const [noiseIntensity, setNoiseIntensity] = useState(1.0); // Default noise intensity

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

    // Update local state when controller parameters change
    useEffect(() => {
        setKp(state.controller.kp.toString());
        setKi(state.controller.ki.toString());
        setKd(state.controller.kd.toString());
    }, [state.controller]);

    // Handle PID parameter updates
    const handleParamUpdate = useCallback(() => {
        const params = {
            kp: parseFloat(kp),
            ki: parseFloat(ki),
            kd: parseFloat(kd)
        };

        if (!isNaN(params.kp) && !isNaN(params.ki) && !isNaN(params.kd)) {
            updateControlParams({
                controller: params
            });
        }
    }, [kp, ki, kd, updateControlParams]);

    const handleStartStop = () => {
        if (isRunning) {
            stopSimulation();
        } else {
            startSimulation();
            handleParamUpdate(); // Update parameters when starting
        }
    };

    const handleReset = () => {
        updateState({
            ...initialState,
            isRunning: false
        });
    };

    const controlStrategies = [
        { value: 'PID', label: 'PID Control' },
        { value: 'PID_FEEDFORWARD', label: 'PID with Feed Forward' },
        { value: 'PI', label: 'PI Control' }
    ];

    const handleStrategyChange = (value: string) => {
        updateState({
            controlStrategy: value as ControlStrategy,
            controller: {
                ...state.controller,
                errorSum: 0,    // Reset integral term
                lastError: 0    // Reset derivative term
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Control System Tuning</h1>
                            <p className="text-gray-400 mt-2">
                                Adjust controller parameters and observe system response
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Button
                                variant={isRunning ? 'destructive' : 'default'}
                                onClick={handleStartStop}
                                className="min-w-[140px] h-11 text-sm font-medium shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all"
                            >
                                {isRunning ? '■ Stop' : '▶ Start'} Simulation
                            </Button>
                            <Button 
                                variant="secondary"
                                onClick={handleReset}
                                className="h-11 text-sm font-medium shadow-lg hover:shadow-gray-500/20 transition-all"
                            >
                                ↺ Reset
                            </Button>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <Card className="backdrop-blur-xl bg-white/[0.02] border-white/[0.05] shadow-2xl">
                                <div className="p-6 border-b border-white/[0.05]">
                                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                                        Simulation View
                                    </h2>
                                </div>
                                <Simulation 
                                    controlParameters={state.controller}
                                    systemParameters={state}
                                />
                            </Card>

                            {/* Control Strategy Card */}
                            <Card className="backdrop-blur-xl bg-white/[0.02] border-white/[0.05] shadow-2xl">
                                <div className="p-6 border-b border-white/[0.05]">
                                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                                        Control Strategy
                                    </h2>
                                </div>
                                <div className="p-6 space-y-6">
                                    <Select
                                        value={state.controlStrategy}
                                        onValueChange={handleStrategyChange}
                                    >
                                        <SelectTrigger className="w-full bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.05] transition-colors">
                                            <SelectValue placeholder="Select control strategy" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 border-white/[0.05]">
                                            {controlStrategies.map((strategy) => (
                                                <SelectItem 
                                                    key={strategy.value} 
                                                    value={strategy.value}
                                                    className="text-white hover:bg-white/[0.05] transition-colors"
                                                >
                                                    {strategy.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="kp" className="text-gray-300 flex items-center gap-2">
                                                <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                                                Proportional Gain (Kp)
                                            </Label>
                                            <Input
                                                id="kp"
                                                type="number"
                                                value={kp}
                                                onChange={(e) => setKp(e.target.value)}
                                                step="0.1"
                                                className="bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.05] transition-colors"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="ki" className="text-gray-300 flex items-center gap-2">
                                                <span className="w-1 h-1 rounded-full bg-green-400"></span>
                                                Integral Gain (Ki)
                                            </Label>
                                            <Input
                                                id="ki"
                                                type="number"
                                                value={ki}
                                                onChange={(e) => setKi(e.target.value)}
                                                step="0.01"
                                                className="bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.05] transition-colors"
                                            />
                                        </div>

                                        {state.controlStrategy !== 'PI' && (
                                            <div className="space-y-2">
                                                <Label htmlFor="kd" className="text-gray-300 flex items-center gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-pink-400"></span>
                                                    Derivative Gain (Kd)
                                                </Label>
                                                <Input
                                                    id="kd"
                                                    type="number"
                                                    value={kd}
                                                    onChange={(e) => setKd(e.target.value)}
                                                    step="0.1"
                                                    className="bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.05] transition-colors"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* System Parameters Card */}
                            <Card className="backdrop-blur-xl bg-white/[0.02] border-white/[0.05] shadow-2xl">
                                <div className="p-6 border-b border-white/[0.05]">
                                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                        System Parameters
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                                                <h3 className="text-sm font-medium">Tank Configuration</h3>
                                            </div>
                                            <SimulationControls
                                                controllerOutput={state.controllerOutput}
                                                onControllerOutputChange={(value) => updateState({ 
                                                    controllerOutput: value 
                                                })}
                                                pumpFlow={state.pumpFlow}
                                                onPumpFlowChange={(value) => updateState({ 
                                                    pumpFlow: value 
                                                })}
                                                disabled={!isRunning}
                                            />
                                        </div>

                                        {/* Noise Controls */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <span className="w-1 h-1 rounded-full bg-purple-400"></span>
                                                <h3 className="text-sm font-medium">Noise Configuration</h3>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="noise-toggle" className="text-gray-300">
                                                    Enable Noise
                                                </Label>
                                                <Switch
                                                    id="noise-toggle"
                                                    checked={state.enableNoise}
                                                    onCheckedChange={(checked) => updateState({ enableNoise: checked })}
                                                    disabled={!isRunning}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="noise-intensity" className="text-gray-300">
                                                    Noise Intensity
                                                </Label>
                                                <Input
                                                    id="noise-intensity"
                                                    type="range"
                                                    min="0"
                                                    max="2"
                                                    step="0.1"
                                                    value={noiseIntensity}
                                                    onChange={(e) => setNoiseIntensity(parseFloat(e.target.value))}
                                                    disabled={!state.enableNoise || !isRunning}
                                                    className="bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.05] transition-colors"
                                                />
                                                <div className="text-sm text-gray-400">
                                                    {noiseIntensity.toFixed(1)}x
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Response Graphs Card */}
                            <Card className="backdrop-blur-xl bg-white/[0.02] border-white/[0.05] shadow-2xl">
                                <div className="p-6 border-b border-white/[0.05]">
                                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                                        System Response
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <SimulationGraphs 
                                        tank1Level={(state.tank1.height / state.tank1.maxHeight) * 100}
                                        tank2Level={(state.tank2.height / state.tank2.maxHeight) * 100}
                                        controllerOutput={state.controllerOutput}
                                        pumpFlow={state.pumpFlow}
                                        setpoint={state.controller.setpoint}
                                    />
                                </div>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
} 