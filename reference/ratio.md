# ratio
* ratio[meta header]
* cpp11[meta cpp]

`<ratio>`ヘッダでは、コンパイル時有理数演算のための、いくつかのクラスを定義する。


## `ratio`クラステンプレート

| 名前                        | 説明                               | 対応バージョン |
|-----------------------------|------------------------------------|-------|
| [`ratio`](ratio/ratio.md) | コンパイル時有理数(class template) | C++11 |


## 四則演算

| 名前                                           | 説明                 | 対応バージョン |
|------------------------------------------------|----------------------|-------|
| [`ratio_add`](ratio/ratio_add.md)            | 加算(alias template) | C++11 |
| [`ratio_subtract`](ratio/ratio_subtract.md) | 減算(alias template) | C++11 |
| [`ratio_multiply`](ratio/ratio_multiply.md)  | 乗算(alias template) | C++11 |
| [`ratio_divide`](ratio/ratio_divide.md)      | 除算(alias template) | C++11 |


## 比較演算

| 名前                                                    | 説明                                         | 対応バージョン |
|---------------------------------------------------------|----------------------------------------------|-------|
| [`ratio_equal`](ratio/ratio_equal.md)                 | �値比較(class template)                     | C++11 |
| [`ratio_not_equal`](ratio/ratio_not_equal.md)         | 非�値比較(class template)                   | C++11 |
| [`ratio_less`](ratio/ratio_less.md)                   | 左辺が右辺より小さいかの比較(class template) | C++11 |
| [`ratio_less_equal`](ratio/ratio_less_equal.md)       | 左辺が右辺以下かの比較(class template)       | C++11 |
| [`ratio_greater`](ratio/ratio_greater.md)             | 左辺が右辺より大きいかの比較(class template) | C++11 |
| [`ratio_greater_equal`](ratio/ratio_greater_equal.md) | 左辺が右辺以上かの比較(class template)       | C++11 |


## SI接�辞の別名型

| 名前                            | 説明              | 対応バージョン |
|---------------------------------|-------------------|----------------|
| [`yocto`](ratio/si_prefix.md) | ヨクト(type-alias)   | C++11          |
| [`zepto`](ratio/si_prefix.md) | ゼプト(type-alias)   | C++11          |
| [`atto`](ratio/si_prefix.md)  | アト(type-alias)     | C++11          |
| [`femto`](ratio/si_prefix.md) | フェムト(type-alias) | C++11          |
| [`pico`](ratio/si_prefix.md)  | ピコ(type-alias)     | C++11          |
| [`nano`](ratio/si_prefix.md)  | ナノ(type-alias)     | C++11          |
| [`micro`](ratio/si_prefix.md) | マイク�(type-alias) | C++11          |
| [`milli`](ratio/si_prefix.md) | ミリ(type-alias)     | C++11          |
| [`centi`](ratio/si_prefix.md) | センチ(type-alias)   | C++11          |
| [`deci`](ratio/si_prefix.md)  | デシ(type-alias)     | C++11          |
| [`deca`](ratio/si_prefix.md)  | デカ(type-alias)     | C++11          |
| [`hecto`](ratio/si_prefix.md) | ヘクト(type-alias)   | C++11          |
| [`kilo`](ratio/si_prefix.md)  | ��(type-alias)     | C++11          |
| [`mega`](ratio/si_prefix.md)  | メガ(type-alias)     | C++11          |
| [`giga`](ratio/si_prefix.md)  | ギガ(type-alias)     | C++11          |
| [`tera`](ratio/si_prefix.md)  | テラ(type-alias)     | C++11          |
| [`peta`](ratio/si_prefix.md)  | ペタ(type-alias)     | C++11          |
| [`exa`](ratio/si_prefix.md)   | エクサ(type-alias)   | C++11          |
| [`zetta`](ratio/si_prefix.md) | ゼタ(type-alias)     | C++11          |
| [`yotta`](ratio/si_prefix.md) | ヨタ(type-alias)     | C++11          |


## バージョン
### 言語
- C++11


## 参照
- [N2661 A Foundation to Sleep On](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2661.htm)

