// サイクルタイム分析ページ専用JavaScript

// DOM要素の取得
const periodButtons = document.querySelectorAll('.period-button');
const chartPlaceholder = document.querySelector('.chart-placeholder');

// 期間ボタンのイベントリスナーを初期化
function initializePeriodButtons() {
    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 現在のアクティブクラスを削除
            periodButtons.forEach(btn => btn.classList.remove('active'));
            
            // クリックされたボタンにアクティブクラスを追加
            this.classList.add('active');
            
            // チャートを更新（実際の実装では、選択された期間に基づいてデータを取得・表示）
            updateChart(this.textContent);
        });
    });
}

// チャート更新関数（プレースホルダー）
function updateChart(period) {
    if (chartPlaceholder) {
        chartPlaceholder.innerHTML = `<p>サイクルタイム推移グラフ（${period}）がここに表示されます</p>`;
    }
}

// テーブルのソート機能（基本実装）
function initializeTableSort() {
    const tableHeaders = document.querySelectorAll('.cycle-time-table th');
    
    tableHeaders.forEach((header, index) => {
        // クリック可能なヘッダーにカーソルポインターを追加
        if (index > 0 && index < 8) { // プルリク名とオープン日以外
            header.style.cursor = 'pointer';
            header.addEventListener('click', function() {
                sortTable(index);
            });
        }
    });
}

// テーブルソート関数（基本実装）
function sortTable(columnIndex) {
    const table = document.querySelector('.cycle-time-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // 現在のソート順を確認（data属性で管理）
    const currentOrder = table.dataset.sortOrder || 'asc';
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    
    // 行をソート
    rows.sort((a, b) => {
        const aValue = getCellValue(a, columnIndex);
        const bValue = getCellValue(b, columnIndex);
        
        if (newOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });
    
    // ソートされた行を再配置
    rows.forEach(row => tbody.appendChild(row));
    
    // ソート順を保存
    table.dataset.sortOrder = newOrder;
}

// セル値を取得（ソート用）
function getCellValue(row, columnIndex) {
    const cell = row.cells[columnIndex];
    let value = cell.textContent.trim();
    
    // 数値の場合は数値として比較
    if (value === '-') return -1;
    const numValue = parseFloat(value);
    return isNaN(numValue) ? value : numValue;
}

// チェックボックスの状態変更イベント
function initializeCheckboxes() {
    const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // 実際の実装では、チェックボックスの状態に基づいてグラフを更新
            console.log('チェックボックス状態変更:', this.checked);
            updateChartWithWeekends(this.checked);
        });
    });
}

// 土日祝表示の切り替え（プレースホルダー）
function updateChartWithWeekends(showWeekends) {
    if (chartPlaceholder) {
        const weekendText = showWeekends ? '（土日祝含む）' : '（平日のみ）';
        const currentPeriod = document.querySelector('.period-button.active')?.textContent || 'ウィークリー';
        chartPlaceholder.innerHTML = `<p>サイクルタイム推移グラフ（${currentPeriod}）${weekendText}がここに表示されます</p>`;
    }
}

// ページネーション機能
function initializePagination() {
    const pageButtons = document.querySelectorAll('.page-button:not(.next)');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            // 現在のアクティブページを削除
            pageButtons.forEach(btn => btn.classList.remove('active'));
            
            // クリックされたページにアクティブクラスを追加
            this.classList.add('active');
            
            // 実際の実装では、ページに応じてデータを取得・表示
            const pageNumber = this.textContent;
            console.log('ページ変更:', pageNumber);
        });
    });
    
    // 次のページボタン
    const nextButton = document.querySelector('.page-button.next');
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            const currentActive = document.querySelector('.page-button.active');
            const nextPage = currentActive.nextElementSibling;
            if (nextPage && !nextPage.classList.contains('next')) {
                currentActive.classList.remove('active');
                nextPage.classList.add('active');
            }
        });
    }
}

// ページロード時に実行
document.addEventListener('DOMContentLoaded', function() {
    initializePeriodButtons();
    initializeTableSort();
    initializeCheckboxes();
    initializePagination();
    
    // 初期チャート表示
    updateChart('ウィークリー');
});

// リサイズイベントでのレスポンシブ対応
window.addEventListener('resize', function() {
    // 必要に応じてチャートのリサイズ処理を追加
    console.log('ウィンドウリサイズ検知');
});