/**
 * DevOps分析ページ専用JavaScript
 */

// ページ固有の初期化関数
window.initializePage = function() {
    console.log('DevOps分析ページを初期化中...');
    
    // メトリクスカードのイベントリスナーを設定
    initializeMetricCards();
    
    // チャートコントロールのイベントリスナーを設定
    initializeChartControls();
    
    // PRテーブルの機能を初期化
    initializePRTable();
    
    console.log('DevOps分析ページの初期化完了');
};

// メトリクスカードの初期化
function initializeMetricCards() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach(card => {
        card.addEventListener('click', function() {
            // アクティブクラスを切り替え
            metricCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // 対応するグラフデータを更新
            updateChartForMetric(this.id);
            
            console.log(`メトリクス切り替え: ${this.id}`);
        });
    });
}

// グラフ更新機能
function updateChartForMetric(metricId) {
    const chartTitle = document.querySelector('.chart-header h3');
    const chartImage = document.querySelector('.chart-image');
    
    // メトリクスに応じてグラフタイトルと画像を更新
    const metricConfig = {
        'deploy-freq-tab': {
            title: '移動平均推移 - デプロイ頻度',
            imagePath: 'TestImages/DevOps/移動平均推移グラフ.png',
            altText: 'デプロイ頻度の移動平均推移'
        },
        'lead-time-tab': {
            title: '移動平均推移 - 変更のリードタイム',
            imagePath: 'TestImages/DevOps/移動平均推移グラフ.png',
            altText: '変更のリードタイムの移動平均推移'
        },
        'change-failure-tab': {
            title: '移動平均推移 - 変更障害率',
            imagePath: 'TestImages/DevOps/移動平均推移グラフ.png',
            altText: '変更障害率の移動平均推移'
        },
        'mttr-tab': {
            title: '移動平均推移 - 平均修復時間',
            imagePath: 'TestImages/DevOps/移動平均推移グラフ.png',
            altText: '平均修復時間の移動平均推移'
        }
    };
    
    const config = metricConfig[metricId];
    if (config && chartTitle && chartImage) {
        chartTitle.textContent = config.title;
        chartImage.src = config.imagePath;
        chartImage.alt = config.altText;
    }
}

// チャートコントロールの初期化
function initializeChartControls() {
    const checkbox = document.querySelector('.checkbox-container input[type="checkbox"]');
    
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            console.log(`土日祝表示: ${this.checked ? 'ON' : 'OFF'}`);
            // 実際の実装では、ここでグラフの表示を切り替える
        });
    }
}

// PRテーブルの初期化
function initializePRTable() {
    // ページネーションボタンの設定
    const pageButtons = document.querySelectorAll('.page-button');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.classList.contains('next')) {
                // アクティブページを切り替え
                pageButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                console.log(`ページ切り替え: ${this.textContent}`);
                // 実際の実装では、ここでテーブルデータを更新
            }
        });
    });
    
    // アクションボタンの設定
    const actionButtons = document.querySelectorAll('.action-button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // PRの詳細メニューを表示（実装例）
            showPRActionMenu(this);
        });
    });
    
    // テーブル行のホバー効果（既にCSSで実装済みだが、追加のインタラクションがあれば）
    const tableRows = document.querySelectorAll('.pr-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            console.log('PR行がクリックされました:', this);
            // 実際の実装では、PR詳細ページに遷移するなど
        });
    });
}

// PRアクションメニューの表示
function showPRActionMenu(button) {
    // 簡単なアクションメニューの例
    const actions = ['詳細を表示', 'コメントを追加', 'ラベルを編集'];
    
    // 実際の実装では、ドロップダウンメニューやモーダルを表示
    console.log('PRアクション:', actions);
    
    // デモ用のアラート
    const action = prompt('アクションを選択してください:\n1. 詳細を表示\n2. コメントを追加\n3. ラベルを編集');
    
    switch(action) {
        case '1':
            alert('PR詳細を表示します');
            break;
        case '2':
            alert('コメント追加画面を表示します');
            break;
        case '3':
            alert('ラベル編集画面を表示します');
            break;
        default:
            console.log('アクションがキャンセルされました');
    }
}

// ヘルプボタンの機能
function initializeHelpButtons() {
    const helpButtons = document.querySelectorAll('.help-button');
    
    helpButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // ツールチップの表示/非表示
            const tooltip = this.getAttribute('title');
            console.log('ヘルプ:', tooltip);
        });
    });
}

// メトリクス値のアニメーション（オプション）
function animateMetricValues() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    metricValues.forEach(element => {
        const finalValue = parseFloat(element.textContent);
        const unit = element.querySelector('.unit')?.textContent || '';
        
        // カウントアップアニメーション
        let currentValue = 0;
        const increment = finalValue / 30; // 30フレームで完了
        
        const animate = () => {
            if (currentValue < finalValue) {
                currentValue += increment;
                element.innerHTML = `${currentValue.toFixed(1)}<span class="unit">${unit}</span>`;
                requestAnimationFrame(animate);
            } else {
                element.innerHTML = `${finalValue}<span class="unit">${unit}</span>`;
            }
        };
        
        // ページ読み込み時にアニメーション開始
        setTimeout(() => animate(), Math.random() * 500);
    });
}

// データの更新（定期的な更新など）
function updateMetricsData() {
    // 実際の実装では、APIからデータを取得して更新
    console.log('メトリクスデータを更新中...');
    
    // デモ用のランダムデータ更新
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach(card => {
        const valueElement = card.querySelector('.metric-value');
        const trendElement = card.querySelector('.metric-trend');
        
        if (valueElement && trendElement) {
            // 実際の実装では、APIから取得したデータを使用
            console.log(`${card.id}のデータを更新しました`);
        }
    });
}

// エクスポート機能（オプション）
function exportDevOpsData() {
    const data = {
        metrics: {
            deployFrequency: 17.3,
            leadTime: 42.2,
            changeFailureRate: 0.6,
            mttr: 3.1
        },
        exportTime: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'devops-metrics.json';
    a.click();
    URL.revokeObjectURL(url);
    
    console.log('DevOpsメトリクスをエクスポートしました');
}

// ページ固有のユーティリティ関数
const DevOpsUtils = {
    formatMetricValue: function(value, type) {
        switch(type) {
            case 'frequency':
                return `${value}件`;
            case 'time':
                return `${value}h`;
            case 'percentage':
                return `${value}%`;
            default:
                return value.toString();
        }
    },
    
    getMetricTrendClass: function(change) {
        return change > 0 ? 'negative' : 'positive';
    }
};

// ページがアンロードされる時のクリーンアップ
window.addEventListener('beforeunload', function() {
    console.log('DevOps分析ページをクリーンアップ中...');
    
    // 必要に応じてイベントリスナーを削除
    // タイマーがあれば停止
    // 未保存のデータがあれば警告
});
