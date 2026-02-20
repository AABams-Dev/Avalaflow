'use client';

export function AccountPanel() {
    // Mock data
    const positions = [
        {
            id: 1,
            pair: 'BTC/USD',
            type: 'Long',
            leverage: 10,
            pnl: 45.20,
            pnlPercent: 12.5,
            entry: 64100,
            mark: 64230,
            size: 5000,
            liq: 58000
        }
    ];

    return (
        <div className="h-full flex flex-col bg-dark-card">
            {/* Fixed Header Stats (Non-scrollable) */}
            <div className="p-4 border-b border-dark-border">
                <h3 className="text-text-secondary text-xs uppercase font-bold mb-4 tracking-wider">Account</h3>
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-dark-bg border border-dark-border shadow-inner">
                        <div className="text-text-secondary text-xs mb-1">Total Collateral</div>
                        <div className="text-2xl font-bold text-white font-mono">$1,420.50</div>
                    </div>

                    <div className="space-y-2.5">
                        <div className="flex justify-between text-xs">
                            <span className="text-text-secondary">Unrealized PnL</span>
                            <span className="text-brand-green font-mono">+$45.20</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-text-secondary">Margin Ratio</span>
                            <span className="text-brand-green">Safe (12%)</span>
                        </div>
                        <div className="w-full bg-dark-bg h-1.5 rounded-full overflow-hidden mt-1">
                            <div className="bg-brand-green w-[12%] h-full rounded-full shadow-[0_0_10px_#3fb68b]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Positions List */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 custom-scrollbar">
                <h3 className="text-text-secondary text-xs uppercase font-bold mb-4 sticky top-0 bg-dark-card py-2 z-10 flex justify-between items-center">
                    <span>Positions</span>
                    <span className="bg-dark-bg px-2 py-0.5 rounded text-[10px]">{positions.length}</span>
                </h3>

                <div className="space-y-3">
                    {positions.map((pos) => (
                        <div key={pos.id} className="p-3 rounded-xl bg-dark-bg border border-dark-border hover:border-brand-green/30 transition-all cursor-pointer group relative overflow-hidden">
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${pos.type === 'Long' ? 'bg-brand-green' : 'bg-brand-red'}`} />

                            <div className="flex justify-between items-center mb-2 pl-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-white">{pos.pair}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${pos.type === 'Long' ? 'text-brand-green bg-brand-green/10' : 'text-brand-red bg-brand-red/10'}`}>
                                        {pos.leverage}x
                                    </span>
                                </div>
                                <div className={`text-sm font-bold font-mono ${pos.pnl >= 0 ? 'text-brand-green' : 'text-brand-red'}`}>
                                    {pos.pnl >= 0 ? '+' : ''}{pos.pnl}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-[11px] text-text-secondary pl-2 mb-2">
                                <div className="flex justify-between">
                                    <span>Entry</span>
                                    <span className="text-white font-mono">{pos.entry.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Mark</span>
                                    <span className="text-white font-mono">{pos.mark.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Size</span>
                                    <span className="text-white font-mono">${pos.size.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Liq</span>
                                    <span className="text-brand-orange font-mono">{pos.liq.toLocaleString()}</span>
                                </div>
                            </div>

                            <button className="w-[calc(100%-8px)] ml-2 py-1.5 rounded bg-dark-border/50 text-xs font-medium hover:bg-white hover:text-dark-bg transition-all opacity-0 group-hover:opacity-100 absolute bottom-2 left-0 right-2 backdrop-blur-sm">
                                Close Position
                            </button>
                        </div>
                    ))}

                    {positions.length === 0 && (
                        <div className="text-center py-10 text-text-secondary text-xs">
                            No open positions
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
