// レビュー分析ページ専用JavaScript

class ReviewAnalysis {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupInteractiveElements();
        this.loadInitialData();
    }

    setupEventListeners() {
        // 時間範囲ボタンのイベントリスナー
        document.querySelectorAll('.time-range-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleTimeRangeChange(e));
        });

        // チェックボックスのイベントリスナー
        const weekendCheckbox = document.querySelector('.checkbox-label input[type="checkbox"]');
        if (weekendCheckbox) {
            weekendCheckbox.addEventListener('change', (e) => this.handleWeekendToggle(e));
        }

        // ページネーションのイベントリスナー
        document.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handlePagination(e));
        });

        // テーブルのソート機能
        document.querySelectorAll('.review-detail-table th').forEach(th => {
            th.addEventListener('click', (e) => this.handleTableSort(e));
        });
    }

    setupInteractiveElements() {
        // ホバー効果の設定
        this.setupHoverEffects();
        
        // ツールチップの設定
        this.setupTooltips();
    }

    loadInitialData() {
        // 初期データの読み込み（実際の実装では API から取得）
        console.log('レビュー分析データを読み込み中...');
        
        // サンプルデータでメトリクスを更新
        this.updateMetrics({
            totalReviews: 821.3,
            avgCommentsPerPR: 2.5,
            avgCommentsPerReview: 0.5
        });
    }

    handleTimeRangeChange(e) {
        const clickedBtn = e.target;
        
        // アクティブ状態の切り替え
        document.querySelectorAll('.time-range-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        clickedBtn.classList.add('active');
        
        const timeRange = clickedBtn.textContent;
        console.log(`時間範囲を変更: ${timeRange}`);
        
        // グラフの更新（実際の実装では API コール）
        this.updateCharts(timeRange);
        
        // メトリクスの更新
        this.updateMetricsForTimeRange(timeRange);
    }

    handleWeekendToggle(e) {
        const showWeekends = e.target.checked;
        console.log(`土日祝の表示: ${showWeekends ? 'ON' : 'OFF'}`);
        
        // グラフの更新
        this.updateChartsWithWeekendData(showWeekends);
    }

    handlePagination(e) {
        const btn = e.target;
        
        if (btn.disabled || btn.classList.contains('active')) {
            return;
        }
        
        // ページネーションの処理
        if (btn.classList.contains('prev')) {
            this.goToPreviousPage();
        } else if (btn.classList.contains('next')) {
            this.goToNextPage();
        } else if (btn.classList.contains('page')) {
            const pageNumber = parseInt(btn.textContent);
            this.goToPage(pageNumber);
        }
    }

    handleTableSort(e) {
        const th = e.target;
        const table = th.closest('table');
        const columnIndex = Array.from(th.parentNode.children).indexOf(th);
        
        console.log(`テーブルソート: 列 ${columnIndex}`);
        
        // ソート状態の切り替え
        const currentSort = th.dataset.sort || 'none';
        const newSort = currentSort === 'asc' ? 'desc' : 'asc';
        
        // 全てのソート状態をリセット
        table.querySelectorAll('th').forEach(header => {
            header.dataset.sort = 'none';
            header.classList.remove('sort-asc', 'sort-desc');
        });
        
        // 新しいソート状態を設定
        th.dataset.sort = newSort;
        th.classList.add(`sort-${newSort}`);
        
        // テーブルデータのソート（実際の実装では API から再取得）
        this.sortTableData(columnIndex, newSort);
    }

    updateMetrics(data) {
        // メトリクス値の更新
        const metrics = document.querySelectorAll('.metric-number');
        if (metrics[0]) metrics[0].textContent = data.totalReviews;
        if (metrics[1]) metrics[1].textContent = data.avgCommentsPerPR;
        if (metrics[2]) metrics[2].textContent = data.avgCommentsPerReview;
        
        // アニメーション効果
        metrics.forEach(metric => {
            metric.classList.add('updated');
            setTimeout(() => metric.classList.remove('updated'), 300);
        });
    }

    updateCharts(timeRange) {
        // グラフの更新（実際の実装では Chart.js や D3.js を使用）
        console.log(`${timeRange}のデータでグラフを更新`);
        
        // プレースホルダーにローディング状態を表示
        const placeholders = document.querySelectorAll('.chart-placeholder');
        placeholders.forEach(placeholder => {
            placeholder.style.opacity = '0.5';
            setTimeout(() => {
                placeholder.style.opacity = '1';
            }, 500);
        });
    }

    updateChartsWithWeekendData(showWeekends) {
        console.log(`土日祝データを${showWeekends ? '含めて' : '除外して'}グラフを更新`);
        
        // グラフの更新処理
        this.updateCharts('current');
    }

    updateMetricsForTimeRange(timeRange) {
        // 時間範囲に応じたメトリクスの更新
        const mockData = {
            'デイリー': { totalReviews: 12.5, avgCommentsPerPR: 1.8, avgCommentsPerReview: 0.3 },
            'ウィークリー': { totalReviews: 87.2, avgCommentsPerPR: 2.1, avgCommentsPerReview: 0.4 },
            'マンスリー': { totalReviews: 821.3, avgCommentsPerPR: 2.5, avgCommentsPerReview: 0.5 }
        };
        
        const data = mockData[timeRange] || mockData['マンスリー'];
        this.updateMetrics(data);
    }

    goToPreviousPage() {
        console.log('前のページへ');
        // ページネーション処理
        this.updateTableData('prev');
    }

    goToNextPage() {
        console.log('次のページへ');
        // ページネーション処理
        this.updateTableData('next');
    }

    goToPage(pageNumber) {
        console.log(`ページ ${pageNumber} へ移動`);
        
        // アクティブページの更新
        document.querySelectorAll('.pagination-btn.page').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const targetBtn = Array.from(document.querySelectorAll('.pagination-btn.page'))
            .find(btn => parseInt(btn.textContent) === pageNumber);
        if (targetBtn) {
            targetBtn.classList.add('active');
        }
        
        // テーブルデータの更新
        this.updateTableData(pageNumber);
    }

    sortTableData(columnIndex, sortOrder) {
        console.log(`列 ${columnIndex} を ${sortOrder} でソート`);
        
        // 実際の実装では、ここでテーブルの行をソートする
        const table = document.querySelector('.review-detail-table tbody');
        if (!table) return;
        
        // ローディング状態の表示
        table.style.opacity = '0.5';
        setTimeout(() => {
            table.style.opacity = '1';
        }, 300);
    }

    updateTableData(action) {
        const table = document.querySelector('.review-detail-table tbody');
        if (!table) return;
        
        // ローディング状態の表示
        table.style.opacity = '0.5';
        
        // 実際の実装では API からデータを取得
        setTimeout(() => {
            console.log(`テーブルデータを更新: ${action}`);
            table.style.opacity = '1';
        }, 300);
    }

    setupHoverEffects() {
        // メトリクスカードのホバー効果
        document.querySelectorAll('.metric-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
                card.style.transition = 'transform 0.2s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    setupTooltips() {
        // ツールチップの設定
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.dataset.tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
            pointer-events: none;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
        
        this.currentTooltip = tooltip;
    }

    hideTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }
    }
}

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', () => {
    new ReviewAnalysis();
});

// CSS アニメーション用のスタイルを動的に追加
const style = document.createElement('style');
style.textContent = `
    .metric-number.updated {
        animation: pulse 0.3s ease;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .review-detail-table th {
        cursor: pointer;
        position: relative;
    }
    
    .review-detail-table th:hover {
        background: #e5e7eb;
    }
    
    .review-detail-table th.sort-asc::after {
        content: '↑';
        position: absolute;
        right: 8px;
    }
    
    .review-detail-table th.sort-desc::after {
        content: '↓';
        position: absolute;
        right: 8px;
    }
    
    .tooltip {
        animation: fadeIn 0.2s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);
