'use client';

import { Header } from '@/components/layout/Header';
import { TradingChart } from '@/components/trading/TradingChart';
import { OrderForm } from '@/components/trading/OrderForm';
import { AccountPanel } from '@/components/trading/AccountPanel';
import { useTradingStore } from '@/store/tradingStore';
import { cn } from '@/lib/utils';

export default function TradePage() {
    const { chartTimeframe, setChartTimeframe } = useTradingStore();
    const timeframes = ['1m', '5m', '15m', '30m', '1h', '2h', '4h', '8h', '1d', '1M', '2M', '4M', '1Y'];

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-dark-bg text-text-primary">
            <Header />

            {/* Main Content Area - Grid Layout */}
            <div className="flex-1 min-h-0">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 h-full min-h-0 p-4">

                    {/* Chart Section */}
                    <div className="xl:col-span-6 min-w-0 min-h-0 flex flex-col bg-dark-bg rounded-xl overflow-hidden border border-dark-border relative">
                        {/* Top Bar inside Chart Card */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 border-b border-dark-border bg-dark-card/50 backdrop-blur-md z-10 gap-4 shrink-0">
                            {/* Asset Info Header */}
                            <div className="flex items-center justify-between w-full sm:w-auto gap-4 md:gap-8">
                                <div className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-1 rounded transition-colors group">
                                    <div className="w-8 h-8 bg-gradient-to-br from-[#f7931a] to-[#c2700f] rounded-full flex items-center justify-center font-bold text-white text-sm shadow-[0_0_10px_rgba(247,147,26,0.3)]">₿</div>
                                    <div>
                                        <h2 className="font-bold text-lg leading-tight group-hover:text-brand-green transition-colors">BTC/USD</h2>
                                        <span className="text-[10px] text-text-secondary bg-dark-border px-1 rounded">Perpetual</span>
                                    </div>
                                </div>

                                <div className="h-8 w-px bg-dark-border hidden sm:block" />

                                <div className="flex gap-4 md:gap-8 text-xs font-mono overflow-x-auto no-scrollbar items-center">
                                    <div className="flex flex-col">
                                        <span className="text-text-secondary text-[10px] mb-0.5">Mark Price</span>
                                        <span className="text-brand-green font-bold text-base">$64,230.5</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-text-secondary text-[10px] mb-0.5">Index Price</span>
                                        <span className="text-white text-sm">$64,228.1</span>
                                    </div>
                                    <div className="hidden md:flex flex-col">
                                        <span className="text-text-secondary text-[10px] mb-0.5">24h Change</span>
                                        <span className="text-brand-green">+2.4%</span>
                                    </div>
                                    <div className="hidden md:flex flex-col">
                                        <span className="text-text-secondary text-[10px] mb-0.5">Funding / 8h</span>
                                        <span className="text-brand-yellow">0.0100%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Timeframe Selector */}
                            <div className="flex bg-dark-bg rounded-lg p-1 border border-dark-border overflow-x-auto max-w-full no-scrollbar shrink-0">
                                {timeframes.map(tf => (
                                    <button
                                        key={tf}
                                        onClick={() => setChartTimeframe(tf)}
                                        className={cn(
                                            "px-2.5 py-1 text-xs font-medium rounded transition-all whitespace-nowrap",
                                            chartTimeframe === tf
                                                ? "bg-dark-card text-brand-green shadow-sm ring-1 ring-dark-border"
                                                : "text-text-secondary hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        {tf}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chart Component */}
                        <div className="flex-1 relative min-h-0 w-full bg-dark-bg">
                            <TradingChart />
                            {/* Floating Indicators Overlay */}
                            <div className="absolute top-4 left-4 flex gap-2 pointer-events-none z-20">
                                <div className="bg-dark-card/80 backdrop-blur border border-dark-border px-2 py-1 round text-[10px] text-text-secondary">
                                    O: <span className="text-green-400">64,210</span> H: <span className="text-green-400">64,250</span> L: <span className="text-red-400">64,190</span> C: <span className="text-green-400">64,230</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Panel */}
                    <div className="xl:col-span-3 min-w-0 min-h-0 flex flex-col bg-dark-card rounded-xl overflow-hidden border border-dark-border shadow-lg">
                        <OrderForm />
                    </div>

                    {/* Account Panel */}
                    <div className="xl:col-span-3 min-w-0 min-h-0 flex flex-col bg-dark-card rounded-xl overflow-hidden border border-dark-border shadow-lg">
                        <AccountPanel />
                    </div>
                </div>
            </div>

            {/* Mobile View: Tabs for Order/Account (Visible only on small screens if we wanted, but Grid handles responsive stacking via grid-cols-1) */}
            {/* Note: The Grid above is grid-cols-1 by default, so on mobile they will stack naturally. 
                However, if a specific mobile tab view is preferred, we would hide the grid-cols-1 panels and show this. 
                For now, we let the Grid handle responsiveness as requested 'Layout stable on resize'. 
                The user prompt didn't strictly ask to remove the mobile tabs, but implied a single unified grid structure. 
                I will comment out the old mobile tabs to rely on the clean grid stack. */}
            {/* 
            <div className="lg:hidden flex border-t border-dark-border bg-dark-card">
                <button className="flex-1 py-4 text-center font-bold text-sm bg-dark-bg border-r border-dark-border text-brand-green">Order</button>
                <button className="flex-1 py-4 text-center font-bold text-sm text-text-secondary">Positions (1)</button>
                <button className="flex-1 py-4 text-center font-bold text-sm text-text-secondary">Account</button>
            </div> 
            */}
        </div>
    );
}
