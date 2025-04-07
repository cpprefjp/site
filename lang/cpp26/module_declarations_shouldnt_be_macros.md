# モジュール宣言でのモジュール名のマクロ展開を禁止する [P3034R1]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、以下のようにモジュール名をマクロ (プリプロセッサ・トークン) にすることが禁止される。

```cpp
// version.h:
#ifndef VERSION_H
#define VERSION_H

#define VERSION libv5

#endif


// lib.cppm:
module;
#include "version.h"
export module VERSION; // コンパイルエラー！
```

この仕様は、C++20の欠陥として扱われる。そのため、C++20やC++23に対応したコンパイラですでに実装されている可能性がある。


## 関連項目
- [C++20 モジュール](/lang/cpp20/modules.md)


## 参照
- [P3034R1 Module Declarations Shouldn’t be Macros](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3034r1.html)

