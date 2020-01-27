# iomanip
* iomanip[meta header]

`<iomanip>`ヘッダでは、入出力に使用するフォーマットとマニピュレータの機能を定義する。

マニピュレータは、ここで定義するもののほかに、[`<ios>`](ios.md)ヘッダでも定義される。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`resetiosflags`](iomanip/resetiosflags.md) | フォーマットフラグを非�定状態にする (function) | |
| [`setiosflags`](iomanip/setiosflags.md)     | フォーマットフラグを�定する (function)         | |
| [`setbase`](iomanip/setbase.md)             | 基数を�定する (function)                       | |
| [`setfill`](iomanip/setfill.md)             | 埋める文�を�定する (function template)        | |
| [`setprecision`](iomanip/setprecision.md)   | 浮動小数点数を出力する精度を�定する (function) | |
| [`setw`](iomanip/setw.md)                   | 出力する幅を�定する (function)                 | |
| `get_money`     | 金額書式から入力する (function template)        | C++11 |
| `put_money`     | 金額書式で出力する (function template)          | C++11 |
| `get_time`      | 日時書式から入力する (function template)        | C++11 |
| [`put_time`](iomanip/put_time.md) | 日時書式で出力する (function template)          | C++11 |
| [`quoted`](iomanip/quoted.md)     | 囲み文�指定で入出力する (function template)    | C++14 |


