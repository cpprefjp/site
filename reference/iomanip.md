#iomanip
`<iomanip>`ヘッダでは、入出力に使用するフォーマットとマニピュレータの機能を定義する。

マニピュレータは、ここで定義するもののほかに、[`<ios>`](./ios.md)ヘッダでも定義される。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `resetiosflags` | フォーマットフラグを非設定状態にする (function) | |
| `setiosflags`   | フォーマットフラグを設定する (function)         | |
| `setbase`       | 基数を設定する (function)                       | |
| `setfill`       | 埋める文字を設定する (function template)        | |
| `setprecision`  | 浮動小数点数を出力する精度を設定する (function) | |
| `setw`          | 出力する幅を設定する (function)                 | |
| `get_money`     | 金額書式から入力する (function template)        | C++11 |
| `put_money`     | 金額書式で出力する (function template)          | C++11 |
| `get_time`      | 日時書式から入力する (function template)        | C++11 |
| [`put_time`](./iomanip/put_time.md)      | 日時書式で出力する (function template)          | C++11 |
| `quoted`        | 囲み文字指定で入出力する (function template)    | C++14 |


