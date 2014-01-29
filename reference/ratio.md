#ratio(C++11)
`<ratio>`ヘッダでは、コンパイル時有理数演算のための、いくつかのクラスを定義する。


##`ratio`クラステンプレート

| 名前                        | 説明                               | 対応バージョン |
|-----------------------------|------------------------------------|-------|
| [`ratio`](./ratio/ratio.md) | コンパイル時有理数(class template) | C++11 |


##四則演算

| 名前                                           | 説明                 | 対応バージョン |
|------------------------------------------------|----------------------|-------|
| [`ratio_add`](./ratio/ratio_add.md)            | 加算(alias template) | C++11 |
| [`ratio_substract`](./ratio/ratio_subtract.md) | 減算(alias template) | C++11 |
| [`ratio_multiply`](./ratio/ratio_multiplt.md)  | 乗算(alias template) | C++11 |
| [`ratio_divide`](./ratio/ratio_divide.md)      | 除算(alias template) | C++11 |


##比較演算

| 名前 | 説明 | 対応バージョン |
|-----------------------|----------------------------------------------|-------|
| `ratio_equal`         | 等値比較(class template)                     | C++11 |
| `ratio_not_equal`     | 非等値比較(class template)                   | C++11 |
| `ratio_less`          | 左辺が右辺より小さいかの比較(class template) | C++11 |
| `ratio_less_equal`    | 左辺が右辺以下かの比較(class template)       | C++11 |
| `ratio_greater`       | 左辺が右辺より大きいかの比較(class template) | C++11 |
| `ratio_greater_equal` | 左辺が右辺以上かの比較(class template)       | C++11 |


##SI単位の`typedef`

| 名前 | 説明 | 対応バージョン |
|---------|-----------------|-------|
| `yocto` | ヨクト(typedef) | C++11 |
| `zepto` | ゼプト(typedef) | C++11 |
| `atto`  | アト(typedef) | C++11 |
| `femto` | フェムト(typedef) | C++11 |
| `pico`  | ピコ(typedef) | C++11 |
| `nano`  | ナノ(typedef) | C++11 |
| `micro` | マイクロ(typedef) | C++11 |
| `milli` | ミリ(typedef) | C++11 |
| `centi` | センチ(typedef) | C++11 |
| `deci`  | デシ(typedef) | C++11 |
| `deca`  | デカ(typedef) | C++11 |
| `hecto` | ヘクト(typedef) | C++11 |
| `kilo`  | キロ(typedef) | C++11 |
| `mega`  | メガ(typedef) | C++11 |
| `giga`  | ギガ(typedef) | C++11 |
| `tera`  | テラ(typedef) | C++11 |
| `peta`  | ペタ(typedef) | C++11 |
| `exa`   | エクサ(typedef) | C++11 |
| `zetta` | ゼタ(typedef) | C++11 |
| `yotta` | ヨタ(typedef) | C++11 |


##バージョン
###言語
- C++11

