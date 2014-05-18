#ratio (C++11)
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

| 名前                                                    | 説明                                         | 対応バージョン |
|---------------------------------------------------------|----------------------------------------------|-------|
| [`ratio_equal`](./ratio/ratio_equal.md)                 | 等値比較(class template)                     | C++11 |
| [`ratio_not_equal`](./ratio/ratio_not_equal.md)         | 非等値比較(class template)                   | C++11 |
| [`ratio_less`](./ratio/ratio_less.md)                   | 左辺が右辺より小さいかの比較(class template) | C++11 |
| [`ratio_less_equal`](./ratio/ratio_less_equal.md)       | 左辺が右辺以下かの比較(class template)       | C++11 |
| [`ratio_greater`](./ratio/ratio_greater.md)             | 左辺が右辺より大きいかの比較(class template) | C++11 |
| [`ratio_greater_equal`](./ratio/ratio_greater_equal.md) | 左辺が右辺以上かの比較(class template)       | C++11 |


##SI単位の`typedef`

| 名前                          | 説明              | 対応バージョン |
|-------------------------------|-------------------|-------|
| [`yocto`](./ratio/si_unit.md) | ヨクト(typedef)   | C++11 |
| [`zepto`](./ratio/si_unit.md) | ゼプト(typedef)   | C++11 |
| [`atto`](./ratio/si_unit.md)  | アト(typedef)     | C++11 |
| [`femto`](./ratio/si_unit.md) | フェムト(typedef) | C++11 |
| [`pico`](./ratio/si_unit.md)  | ピコ(typedef)     | C++11 |
| [`nano`](./ratio/si_unit.md)  | ナノ(typedef)     | C++11 |
| [`micro`](./ratio/si_unit.md) | マイクロ(typedef) | C++11 |
| [`milli`](./ratio/si_unit.md) | ミリ(typedef)     | C++11 |
| [`centi`](./ratio/si_unit.md) | センチ(typedef)   | C++11 |
| [`deci`](./ratio/si_unit.md)  | デシ(typedef)     | C++11 |
| [`deca`](./ratio/si_unit.md)  | デカ(typedef)     | C++11 |
| [`hecto`](./ratio/si_unit.md) | ヘクト(typedef)   | C++11 |
| [`kilo`](./ratio/si_unit.md)  | キロ(typedef)     | C++11 |
| [`mega`](./ratio/si_unit.md)  | メガ(typedef)     | C++11 |
| [`giga`](./ratio/si_unit.md)  | ギガ(typedef)     | C++11 |
| [`tera`](./ratio/si_unit.md)  | テラ(typedef)     | C++11 |
| [`peta`](./ratio/si_unit.md)  | ペタ(typedef)     | C++11 |
| [`exa`](./ratio/si_unit.md)   | エクサ(typedef)   | C++11 |
| [`zetta`](./ratio/si_unit.md) | ゼタ(typedef)     | C++11 |
| [`yotta`](./ratio/si_unit.md) | ヨタ(typedef)     | C++11 |


##バージョン
###言語
- C++11

