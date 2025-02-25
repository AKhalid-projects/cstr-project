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
import ScenarioSelector from '@/components/simulation/scenarios/ScenarioSelector'
import { SimulationState } from '@/lib/types/simulation'

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

    const handleScenarioSelect = (scenarioState: Partial<SimulationState>) => {
        updateState({
            ...state,
            ...scenarioState,
            isRunning: false, // Reset simulation when changing scenario
            tank1: { ...state.tank1, height: 0 }, // Reset tank levels
            tank2: { ...state.tank2, height: 0 }
        })
        
        // Update local state for sliders
        if (scenarioState.controller) {
            setKp(scenarioState.controller.kp.toString())
            setKi(scenarioState.controller.ki.toString())
            setKd(scenarioState.controller.kd.toString())
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-gray-900 to-black">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent -z-10" />
            <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-8"
                >
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-8">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                Process Control Simulator
                            </h1>
                            <p className="mt-3 text-gray-400 text-lg">
                                Fine-tune your control parameters with real-time feedback
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
                                    
                                    <div className="grid grid-cols-2 gap-6 mt-4">
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
                                                <span className="w-1 h-1 rounded-full bg-purple-400"></span>
                                                Integral Gain (Ki)
                                            </Label>
                                            <Input
                                                id="ki"
                                                type="number"
                                                value={ki}
                                                onChange={(e) => setKi(e.target.value)}
                                                step="0.1"
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
                                        <div className="space-y-2">
                                            <Label htmlFor="setpoint" className="text-gray-300 flex items-center gap-2">
                                                <span className="w-1 h-1 rounded-full bg-pink-400"></span>
                                                Setpoint
                                            </Label>
                                            <Input
                                                id="setpoint"
                                                type="number"
                                                value={setpoint}
                                                onChange={(e) => setSetpoint(e.target.value)}
                                                step="0.1"
                                                className="bg-white/[0.03] border-white/[0.05] text-white hover:bg-white/[0.05] transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-purple-500/20 transition-all"
                                        onClick={handleParamUpdate}
                                    >
                                        Update Parameters
                                    </Button>
                                </div>
                            </Card>

                            {/* Scenario Selector Card */}
                            <Card className="backdrop-blur-xl bg-white/[0.02] border-white/[0.05] shadow-2xl">
                                <div className="p-6">
                                    <ScenarioSelector 
                                        onSelect={handleScenarioSelect}
                                        disabled={isRunning}
                                    />
                                </div>
                            </Card>
                        </div>

                        {/* Right Column - Graphs and Parameters */}
                        <div className="space-y-6">
                            {/* Graphs Card */}
                            <Card className="backdrop-blur-xl bg-white/[0.02] border-white/[0.05] shadow-2xl">
                                <div className="p-6 border-b border-white/[0.05]">
                                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                                        Performance Metrics
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

                            {/* System Parameters Card */}
                            <Card className="backdrop-blur-xl bg-white/[0.02] border-white/[0.05] shadow-2xl">
                                <div className="p-6 border-b border-white/[0.05]">
                                    <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                                        System Parameters
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-6">
                                        <div className="">
                                            {/* Tank Parameters Group */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                                                    <h3 className="text-sm font-medium">Tank Configuration</h3>
                                                </div>
                                                <SimulationControls
                                                    tank1Area={state.tank1.area}
                                                    onTank1AreaChange={(area) => updateState({
                                                        tank1: { ...state.tank1, area }
                                                    })}
                                                    tank2Area={state.tank2.area}
                                                    onTank2AreaChange={(area) => updateState({
                                                        tank2: { ...state.tank2, area }
                                                    })}
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
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
} 