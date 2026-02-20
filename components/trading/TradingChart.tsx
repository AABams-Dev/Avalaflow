'use client';

import { createChart, ColorType, IChartApi, ISeriesApi, UTCTimestamp, CandlestickSeries } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { useTradingStore } from '@/store/tradingStore';

export function TradingChart() {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
    const { assetCode, chartTimeframe } = useTradingStore();

    // Map our timeframes to Binance intervals
    // 2M, 4M, 1Y not directly supported by binance stream usually, mapping to nearest or monthly.
    const mapTimeframe = (tf: string) => {
        const map: Record<string, string> = {
            '1m': '1m', '5m': '5m', '15m': '15m', '30m': '30m',
            '1h': '1h', '2h': '2h', '4h': '4h', '8h': '8h',
            '1d': '1d', '3d': '3d', '1w': '1w', '1M': '1M',
            // Mapped fallbacks
            '2M': '1M', '4M': '1M', '1Y': '1M'
        };
        return map[tf] || '15m';
    };

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: '#0d0e12' },
                textColor: '#9ca3af',
            },
            grid: {
                vertLines: { color: '#1f2937' },
                horzLines: { color: '#1f2937' },
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
                borderColor: '#232630',
            },
            rightPriceScale: {
                borderColor: '#232630',
            }
        });

        const series = chart.addSeries(CandlestickSeries, {
            upColor: '#3fb68b',
            downColor: '#ff5353',
            borderVisible: false,
            wickUpColor: '#3fb68b',
            wickDownColor: '#ff5353',
        });

        chartRef.current = chart;
        seriesRef.current = series;

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth, height: chartContainerRef.current.clientHeight });
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(chartContainerRef.current);

        return () => {
            resizeObserver.disconnect();
            chart.remove();
            chartRef.current = null;
            seriesRef.current = null;
        };
    }, []); // Initialize once

    // Fetch initial data and setup WebSocket
    useEffect(() => {
        if (!seriesRef.current || !chartRef.current) return;

        const symbol = `${assetCode}USDT`.toLowerCase();
        const interval = mapTimeframe(chartTimeframe);
        let ws: WebSocket | null = null;

        const fetchHistory = async () => {
            try {
                // Using a public proxy or direct if CORS allows (Binance often blocks direct browser fetch calls due to CORS, but let's try or use a mock fallback)
                // In a real app you proxy this via Next.js API route.
                // For this demo, we will try direct, if fail, we generate mock data to ensure chart shows SOMETHING.

                try {
                    const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=500`);
                    if (!res.ok) throw new Error('Network response was not ok');
                    const data = await res.json();
                    const formattedData = data.map((d: any) => ({
                        time: d[0] / 1000 as UTCTimestamp,
                        open: parseFloat(d[1]),
                        high: parseFloat(d[2]),
                        low: parseFloat(d[3]),
                        close: parseFloat(d[4]),
                    }));
                    seriesRef.current?.setData(formattedData);
                } catch (apiError) {
                    console.warn('Binance API fetch failed (likely CORS), using mock data', apiError);
                    // Mock Generation
                    const now = Math.floor(Date.now() / 1000);
                    const mockData = [];
                    let price = 64000;
                    for (let i = 500; i > 0; i--) {
                        const time = (now - i * 60 * (15)) as UTCTimestamp; // assuming 15m roughly
                        const open = price;
                        const close = price * (1 + (Math.random() - 0.5) * 0.01);
                        const high = Math.max(open, close) * (1 + Math.random() * 0.005);
                        const low = Math.min(open, close) * (1 - Math.random() * 0.005);
                        mockData.push({ time, open, high, low, close });
                        price = close;
                    }
                    seriesRef.current?.setData(mockData);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchHistory();

        // 2. WebSocket for live updates
        try {
            ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`);

            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                const candle = message.k;

                seriesRef.current?.update({
                    time: candle.t / 1000 as UTCTimestamp,
                    open: parseFloat(candle.o),
                    high: parseFloat(candle.h),
                    low: parseFloat(candle.l),
                    close: parseFloat(candle.c),
                });
            };
        } catch (e) {
            console.error('WebSocket init failed', e);
        }

        return () => {
            if (ws) ws.close();
        };
    }, [assetCode, chartTimeframe]);

    return (
        <div className="w-full h-full min-h-0 min-w-0 relative">
            <div ref={chartContainerRef} className="w-full h-full absolute inset-0" />
        </div>
    );
}
