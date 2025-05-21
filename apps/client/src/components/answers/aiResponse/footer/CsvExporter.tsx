// components/answers/aiResponse/footer/CsvExporter.ts
interface TableDataHeader {
  change_title: string
  align: string
  type: string
}

// interface TableData {
//   key: {
//     desc?: string
//     title?: string
//     subtitle?: string
//   }
//   data: Record<string, any>[]
//   data_header: Record<string, TableDataHeader>
// }

export class CsvExporter {
  private utterance?: string;
  private table_data?: Record<string, any>[];
  
  constructor(utterance?: string, table_data?: Record<string, any>[]) {
    this.utterance = utterance;
    this.table_data = table_data;
  }
  
  public exportCsv(): void {
    if (this.table_data && Array.isArray(this.table_data) && this.table_data.length > 0) {
      this.exportFromTableData();
    } else {
      this.exportFromHtmlTables();
    }
  }
  
  private exportFromTableData(): void {
    if (!this.table_data || !this.table_data.length) return;
    
    // 모든 데이터 항목 모으기
    const allData: Record<string, any>[] = [];

    // 각 테이블 데이터 처리
    for (const tableItem of this.table_data) {
      // 테이블 식별 정보 (desc, title, subtitle 중 존재하는 것 사용)
      const tableInfo: Record<string, string> = {};

      if (tableItem.key) {
        if (tableItem.key.desc) {
          tableInfo.table_title = tableItem.key.desc;
        } else if (tableItem.key.title) {
          tableInfo.table_title = tableItem.key.title;
        }

        if (tableItem.key.subtitle) {
          tableInfo.table_subtitle = tableItem.key.subtitle;
        }
      }

      // 데이터 행에 테이블 정보 추가하여 allData에 합치기
      if (tableItem.data && Array.isArray(tableItem.data)) {
        tableItem.data.forEach((row) => {
          allData.push({
            ...tableInfo,
            ...row
          });
        });
      }
    }

    if (allData.length > 0) {
      // 모든 가능한 헤더 키 수집
      const allHeaderKeys = new Set<string>();

      // 테이블의 헤더 정보와 제목 관련 키 수집
      allHeaderKeys.add('table_title');
      allHeaderKeys.add('table_subtitle');

      // 각 테이블의 데이터 헤더 키 수집
      for (const tableItem of this.table_data) {
        if (tableItem.data_header) {
          Object.keys(tableItem.data_header).forEach((key) => {
            allHeaderKeys.add(key);
          });
        }
      }

      // 모든 헤더 키 배열로 변환
      const headerKeys = Array.from(allHeaderKeys);

      // 헤더 제목 매핑 준비
      const headerTitles: Record<string, string> = {
        table_title: '테이블',
        table_subtitle: '부제목'
      };

      // 데이터 헤더에서 change_title 값을 가져와 헤더 제목 맵핑
      for (const tableItem of this.table_data) {
        if (tableItem.data_header) {
          Object.entries(tableItem.data_header).forEach(([key, header]) => {
            headerTitles[key] = (header as any).change_title;
          });
        }
      }

      // CSV 헤더 행 생성
      const csvHeader = headerKeys
        .map((key) => headerTitles[key] || key)
        .join(',');

      // 각 데이터 행을 CSV 형식으로 변환
      const csvRows = allData
        .map((row) =>
          headerKeys
            .map((key) => {
              const value = row[key] !== undefined ? row[key].toString() : '';
              // 쉼표나 큰따옴표가 포함된 값은 적절히 처리
              return value.includes(',') || value.includes('"')
                ? `"${value.replace(/"/g, '""')}"`
                : value;
            })
            .join(',')
        )
        .join('\n');

      // 최종 CSV 내용 생성
      const csvContent = `${csvHeader}\n${csvRows}`;
      
      this.downloadCsv(csvContent);
    }
  }

  private exportFromHtmlTables(): void {
    // 기존 HTML 테이블 기반 다운로드 로직
    const tables = document.querySelectorAll('table');
    const allRows: Record<string, string>[] = [];

    tables.forEach((table) => {
      // 테이블의 제목과 부제목 가져오기
      const tableContainer = table.closest('.my-4');
      let title = '', subtitle = '';
      if (tableContainer) {
        const titleElement = tableContainer.querySelector('.text-primary');
        if (titleElement) {
          const titleText = titleElement.textContent || '';
          const matches = titleText.match(/(.*?)\s*(\(.*?\))?$/);
          if (matches) {
            title = matches[1]?.trim() || '';
            subtitle = matches[2]?.replace(/[()]/g, '').trim() || '';
          }
        }
      }

      // 헤더 행 가져오기
      const headers = Array.from(table.querySelectorAll('thead th')).map(
        (th) => th.textContent?.trim() || ''
      );

      // 데이터 행 가져오기
      const rows = Array.from(table.querySelectorAll('tbody tr')).map(
        (row) => Array.from(row.children) as HTMLTableCellElement[]
      );

      rows.forEach((row) => {
        const rowData: Record<string, string> = {};

        // title과 subtitle이 있는 경우에만 추가
        if (title) rowData['title'] = title;
        if (subtitle) rowData['subtitle'] = subtitle;

        // 각 셀의 데이터 추가
        row.forEach((cell, index) => {
          // 헤더가 비어있지 않은 경우에만 데이터 추가
          if (headers[index]?.trim()) {
            rowData[headers[index]] = cell.textContent?.trim() || '';
          }
        });

        // 모든 값이 비어있지 않은 경우에만 추가
        if (Object.values(rowData).some((value) => value !== '')) {
          allRows.push(rowData);
        }
      });
    });

    if (allRows.length > 0) {
      // 모든 가능한 헤더 수집 (중복 제거)
      const allHeaders = [
        ...new Set(allRows.flatMap((row) => Object.keys(row)))
      ];

      // CSV 헤더 행 생성
      const csvHeader = allHeaders.join(',');

      // 각 데이터 행을 CSV 형식으로 변환
      const csvRows = allRows
        .map((row) =>
          allHeaders
            .map((header) => {
              const value = row[header] || '';
              // 쉼표나 큰따옴표가 포함된 값은 적절히 처리
              return value.includes(',') || value.includes('"')
                ? `"${value.replace(/"/g, '""')}"`
                : value;
            })
            .join(',')
        )
        .join('\n');

      // 최종 CSV 내용 생성
      const csvContent = `${csvHeader}\n${csvRows}`;
      
      this.downloadCsv(csvContent);
    }
  }
  
  private downloadCsv(csvContent: string): void {
    // CSV 파일 다운로드
    const blob = new Blob(['\ufeff' + csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.setAttribute(
      'download',
      `${this.utterance || '데이터'} ${new Date().toLocaleDateString()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}