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
import { ControlStrategy, FeedforwardModel } from '@/lib/types/simulation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useSimulationData } from '@/hooks/simulation/useSimulationData';
import { Download } from 'lucide-react';

export default function TuningPage() {
    const { state, updateControlParams, updateState, isRunning, startSimulation, stopSimulation } = useSimulationState();
    const { addDataPoint, exportData, getDataPointCount } = useSimulationData();
    const [kc, setKc] = useState(state.controller.kc.toString());
    const [ti, setTi] = useState(state.controller.ti.toString());
    const [td, setTd] = useState(state.controller.td.toString());
    const [setpoint, setSetpoint] = useState(state.controller.setpoint.toString());

    // Start simulation effect
    useEffect(() => {
        const interval = isRunning ? setInterval(() => {
            const newState = calculateTankLevels(state);
            updateState({
                ...newState,
                isRunning
            });
            // Add data point for each simulation step
            addDataPoint(newState);
        }, 100) : null;

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, state, updateState, addDataPoint]);

    // Update local state when controller parameters change
    useEffect(() => {
        setKc(state.controller.kc.toString());
        setTi(state.controller.ti.toString());
        setTd(state.controller.td.toString());
        setSetpoint(state.controller.setpoint.toString());
    }, [state.controller]);

    // Handle PID parameter updates
    const handleParamUpdate = useCallback(() => {
        const params = {
            kc: parseFloat(kc),
            ti: parseFloat(ti),
            td: parseFloat(td),
            setpoint: Math.max(0.5, Math.min(10, parseFloat(setpoint)))
        };

        if (!isNaN(params.kc) && !isNaN(params.ti) && !isNaN(params.td) && !isNaN(params.setpoint)) {
            updateControlParams({
                controller: params
            });
        }
    }, [kc, ti, td, setpoint, updateControlParams]);

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

    // Handle setpoint changes
    const handleSetpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSetpoint(value);
        // Only update if the value is within bounds
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue >= 0.5 && numValue <= 10) {
            updateControlParams({
                controller: { setpoint: numValue }
            });
        }
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
                            <Button
                                variant="outline"
                                onClick={exportData}
                                disabled={getDataPointCount() === 0}
                                className="h-11 text-sm font-medium shadow-lg hover:shadow-gray-500/20 transition-all"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export Data
                            </Button>
                        </div>
                    </div>

                    {/* Mode Selection */}
                    <Tabs defaultValue="manual" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="manual">Manual Mode</TabsTrigger>
                            <TabsTrigger value="pid">Control Mode</TabsTrigger>
                        </TabsList>
                        <TabsContent value="manual">
                            <Card className="backdrop-blur-xl bg-white/[0.02] border-white/[0.05] shadow-2xl">
                                <div className="p-6 border-b border-white/[0.05]">
                                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                        System Parameters (Manual Controls)
                                    </h2>
                                </div>
                                <div className="p-6">
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
                            </Card>
                        </TabsContent>
                        <TabsContent value="pid">
                            <Card className="backdrop-blur-xl bg-white/[0.02] border-white/[0.05] shadow-2xl">
                                <div className="p-6 border-b border-white/[0.05]">
                                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                                        PID Control Parameters
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Control Strategy
                                            </label>
                                            <select
                                                value={state.controlStrategy}
                                                onChange={(e) => updateState({
                                                    controlStrategy: e.target.value as ControlStrategy
                                                })}
                                                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="PID">PID</option>
                                                <option value="PID_FEEDFORWARD">PID with Feedforward</option>
                                                <option value="PI">PI</option>
                                            </select>
                                        </div>

                                        {state.controlStrategy === 'PID_FEEDFORWARD' && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                                    Feedforward Model
                                                </label>
                                                <select
                                                    value={state.feedforwardModel}
                                                    onChange={(e) => updateState({
                                                        feedforwardModel: e.target.value as FeedforwardModel
                                                    })}
                                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="PROCESS">Process Model</option>
                                                    <option value="DISTURBANCE">Disturbance Model</option>
                                                </select>
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-gray-300 flex items-center gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                                                    Input Type
                                                </Label>
                                                <Select
                                                    value={state.inputType}
                                                    onValueChange={(value) => updateState({ 
                                                        inputType: value as 'STEP' | 'RAMP',
                                                        controller: {
                                                            ...state.controller,
                                                            errorSum: 0,    // Reset integral term
                                                            lastError: 0    // Reset derivative term
                                                        }
                                                    })}
                                                >
                                                    <SelectTrigger className="w-full bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.05] transition-colors">
                                                        <SelectValue placeholder="Select input type" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-800 border-white/[0.05]">
                                                        <SelectItem 
                                                            value="STEP"
                                                            className="text-white hover:bg-white/[0.05] transition-colors"
                                                        >
                                                            Step Input
                                                        </SelectItem>
                                                        <SelectItem 
                                                            value="RAMP"
                                                            className="text-white hover:bg-white/[0.05] transition-colors"
                                                        >
                                                            Ramp Input
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="setpoint" className="text-gray-300 flex items-center gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                                                    Setpoint (m)
                                                </Label>
                                                <Input
                                                    id="setpoint"
                                                    type="number"
                                                    value={setpoint}
                                                    onChange={handleSetpointChange}
                                                    min="0.5"
                                                    max="10"
                                                    step="0.1"
                                                    className="bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.05] transition-colors"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="kc" className="text-gray-300 flex items-center gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                                                    Proportional Gain (Kc)
                                                </Label>
                                                <Input
                                                    id="kc"
                                                    type="number"
                                                    value={kc}
                                                    onChange={(e) => setKc(e.target.value)}
                                                    step="0.1"
                                                    className="bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.05] transition-colors"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="ti" className="text-gray-300 flex items-center gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-green-400"></span>
                                                    Integral Time (τi)
                                                </Label>
                                                <Input
                                                    id="ti"
                                                    type="number"
                                                    value={ti}
                                                    onChange={(e) => setTi(e.target.value)}
                                                    step="0.01"
                                                    className="bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.05] transition-colors"
                                                />
                                            </div>

                                            {state.controlStrategy !== 'PI' && (
                                                <div className="space-y-2">
                                                    <Label htmlFor="td" className="text-gray-300 flex items-center gap-2">
                                                        <span className="w-1 h-1 rounded-full bg-pink-400"></span>
                                                        Derivative Time (τd)
                                                    </Label>
                                                    <Input
                                                        id="td"
                                                        type="number"
                                                        value={td}
                                                        onChange={(e) => setTd(e.target.value)}
                                                        step="0.1"
                                                        className="bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.05] transition-colors"
                                                    />
                                                </div>
                                            )}

                                            <div className="space-y-2">
                                                <Label htmlFor="disturbance" className="text-gray-300 flex items-center gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-yellow-400"></span>
                                                    Disturbance (L/min)
                                                </Label>
                                                <input
                                                    id="disturbance"
                                                    type="range"
                                                    min={0}
                                                    max={10}
                                                    step={0.1}
                                                    value={state.pumpFlow}
                                                    onChange={e => updateState({ pumpFlow: Number(e.target.value) })}
                                                    className="w-full bg-gray-700"
                                                    disabled={!isRunning}
                                                />
                                                <div className="text-gray-400 text-sm">{state.pumpFlow.toFixed(1)} L/min</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>
                    </Tabs>

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
                                    controlStrategy={state.controlStrategy}
                                />
                            </Card>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
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
                                        tank1Level={state.tank1.height}
                                        tank2Level={state.tank2.height}
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