import type { PlotConfig } from "../../types/chartTypes";

export const getPlotlyLayout = (
    plotDimensions: { width: number; height: number },
    plotConfig: PlotConfig
) => {
    return {
        width: plotDimensions.width,
        height: plotDimensions.height,
        showlegend: false,
        margin: {
            t: 80,
            l: 80,
            r: 60,
            b: 80
        },
        font: {
            family: 'Roboto, Arial, sans-serif',
            size: 14,
            color: '#333333'
        },
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#fafafa',
        xaxis: {
            title: {
                text: 'Time, s',
                font: { size: 16, weight: 700 }
            },
            titlefont: { size: 14 },
            tickfont: { size: 12 },
            gridcolor: '#e0e0e0',
            gridwidth: 1,
            zerolinecolor: '#cccccc',
            zerolinewidth: 2,
            linecolor: '#333333',
            linewidth: 1
        },
        yaxis: {
            title: {
                text: plotConfig.yLabel,
                font: { size: 16, weight: 700 }
            },
            titlefont: { size: 14 },
            tickfont: { size: 12 },
            gridcolor: '#e0e0e0',
            gridwidth: 1,
            zerolinecolor: '#cccccc',
            zerolinewidth: 2,
            linecolor: '#333333',
            linewidth: 1
        },
        title: {
            text: plotConfig.title,
            font: { size: 20, weight: 700 },
            x: 0.5,
            xanchor: 'center' as const
        },
    };
}