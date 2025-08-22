// チームサマリページ専用JavaScript

class TeamSummary {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialData();
    }

    setupEventListeners() {
        // 時間範囲ボタンのイベントリスナー
        document.querySelectorAll('.time-range-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleTimeRangeChange(e));
        });

        // チェックボックスのイベントリスナー
        document.querySelectorAll('.checkbox-label input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.handleWeekendToggle(e));
        });

        // アクティビティフィルターのイベントリスナー
        document.querySelectorAll('.activity-filter').forEach(filter => {
            filter.addEventListener('change', (e) => this.handleActivityFilterChange(e));
        });
    }

    loadInitialData() {
        // 初期データの読み込み
        this.updateMetrics();
        this.updateCharts();
    }

    handleTimeRangeChange(event) {
        const clickedBtn = event.target;
        const container = clickedBtn.closest('.time-range-buttons');
        
        // アクティブ状態の更新
        container.querySelectorAll('.time-range-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        clickedBtn.classList.add('active');
        
        // データの更新
        const timeRange = clickedBtn.textContent.trim();
        this.updateChartData(timeRange);
        
        // フィードバック表示
        this.showFeedback(`時間範囲を「${timeRange}」に変更しました`);
    }

    handleWeekendToggle(event) {
        const isChecked = event.target.checked;
        
        // チャートの更新
        this.updateWeekendDisplay(isChecked);
        
        // フィードバック表示
        const message = isChecked ? '土日祝をグラフに表示します' : '土日祝をグラフから非表示にします';
        this.showFeedback(message);
    }

    handleActivityFilterChange(event) {
        const selectedValue = event.target.value;
        const selectedText = event.target.options[event.target.selectedIndex].text;
        
        // フィルターの適用
        this.applyActivityFilter(selectedValue);
        
        // フィードバック表示
        this.showFeedback(`アクティビティフィルターを「${selectedText}」に変更しました`);
    }

    updateMetrics() {
        // メトリクスデータの更新
        this.animateMetricValues();
    }

    updateCharts() {
        // チャートプレースホルダーの更新
        document.querySelectorAll('.chart-placeholder').forEach(placeholder => {
            placeholder.style.opacity = '0.8';
            
            setTimeout(() => {
                placeholder.style.opacity = '1';
            }, 300);
        });
    }

    updateChartData(timeRange) {
        console.log(`Updating chart data for time range: ${timeRange}`);
        
        document.querySelectorAll('.chart-placeholder').forEach(placeholder => {
            placeholder.style.opacity = '0.6';
            setTimeout(() => {
                placeholder.style.opacity = '1';
            }, 500);
        });
    }

    updateWeekendDisplay(showWeekends) {
        console.log(`Weekend display: ${showWeekends ? 'enabled' : 'disabled'}`);
        
        document.querySelectorAll('.chart-placeholder').forEach(placeholder => {
            placeholder.style.filter = showWeekends ? 'none' : 'brightness(0.95)';
        });
    }

    applyActivityFilter(filterValue) {
        console.log(`Applying activity filter: ${filterValue}`);
        
        document.querySelectorAll('.activity-card').forEach((card, index) => {
            if (filterValue === 'all') {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                const shouldShow = this.shouldShowCard(card, filterValue);
                card.style.opacity = shouldShow ? '1' : '0.3';
                card.style.transform = shouldShow ? 'scale(1)' : 'scale(0.95)';
            }
        });
    }

    shouldShowCard(card, filterValue) {
        const label = card.querySelector('.activity-label').textContent.toLowerCase();
        
        const filterMap = {
            'issues': ['イシュー'],
            'prs': ['プルリク'],
            'commits': ['コミット'],
            'reviews': ['レビュー']
        };
        
        if (filterMap[filterValue]) {
            return filterMap[filterValue].some(keyword => label.includes(keyword));
        }
        
        return true;
    }

    animateMetricValues() {
        // メトリクス値のアニメーション
        document.querySelectorAll('.metric-number').forEach((element, index) => {
            const targetValue = parseFloat(element.textContent);
            let currentValue = 0;
            const increment = targetValue / 30;
            
            const animation = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(animation);
                }
                element.textContent = currentValue.toFixed(1);
            }, 50);
        });
        
        // アクティビティ値のアニメーション
        document.querySelectorAll('.activity-value').forEach((element, index) => {
            const targetValue = parseInt(element.textContent.replace(/,/g, ''));
            let currentValue = 0;
            const increment = Math.ceil(targetValue / 40);
            
            const animation = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(animation);
                }
                element.textContent = currentValue.toLocaleString();
            }, 30);
        });
    }

    showFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'feedback-message';
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 3000);
    }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
    window.teamSummary = new TeamSummary();
});