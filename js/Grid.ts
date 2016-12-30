$(function () {

  // hidden項目
  // Handsontable.hooks.add('modifyColWidth', (width, col) => {
  //   if (column.hide) {
  //     if (Array.isArray(this.getSettings().colWidths)) {
  //       this.getSettings().colWidths[ col ] = 0.1;
  //     } else if (this.getSettings().colWidths == void 0){
  //       instance.getCellMeta(0, col)
  //     }
  //   }
  // });
  Handsontable.hooks.add('beforeInit', function () {
    if (this.getSettings().columns) {
      let hiddenColumns = [];

      this.getSettings().columns.forEach((column, col) => {
        if (column.hide) {
          hiddenColumns.push(col);
        }
      });

      if (Array.isArray(this.getSettings().colWidths)) {
        for (let col of hiddenColumns) {
          this.getSettings().colWidths[ col ] = 0.1;
        }
      } else {
        this.addHook('modifyColWidth', (width, col) => {
          for (let hiddenCol of hiddenColumns) {
            if (hiddenCol === col) {
              return 0.1;
            }
            return width;
          }
        });
      }
    }
  });

  let data = [
    [ "J001", "SH009", "10", "2", "10", "P/S" ],
    [ "J002", "SH008", "20", "3", "15", "P/S" ],
    [ "J003", "SH007", "30", "4", "5", "P/S" ],
    [ "J004", "SH006", "40", "5", "12", "P/S" ]
  ];

  new Handsontable(document.getElementById('example1'), {
    data: data,
    colHeaders: [ 'JAN', '商品コード', '荷姿', '', '数量', '単位' ],
    rowHeaders: true,
    columnSorting: true,
    sortIndicator: true,
    colWidths: [ 80, 100, 60, 60, 60, 60 ],
    columns: [
      {},
      {},
      {},
      { hide: true },
      {},
      {}
    ]
  });

  new Handsontable(document.getElementById('example2'), {
    data: data,
    colHeaders: [ 'JAN', '商品コード', '荷姿', '', '数量', '単位' ],
    rowHeaders: true,
    columnSorting: true,
    sortIndicator: true,
    columns: [
      {},
      {},
      {},
      { hide: true },
      {},
      {}
    ]
  });

  new Handsontable(document.getElementById('example3'), {
    data: data,
    colHeaders: [ 'JAN', '商品コード', '荷姿', '', '数量', '単位' ],
    rowHeaders: true,
    columnSorting: true,
    sortIndicator: true,
    colWidths: function (col) {
      console.log(arguments);
      return void 0;
    },
    columns: [
      {},
      {},
      {},
      { hide: true },
      {},
      {}
    ]
  });
});