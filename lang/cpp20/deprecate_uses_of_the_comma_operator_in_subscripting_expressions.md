# 添字演算子内でのカンマ演算子の使用を非推奨化 [P1161R3]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
多次元配列クラスを設計する場合などで、単一の引数しかとれない添字演算子に`ar[x, y]`のようにカンマ演算子をオーバーロードして複数のインデックスを指定できるようにすることがあった。

しかしこのようなハックは、将来的に添字演算子に複数引数をとれるようにする際に障害となってしまうため、添字演算子内でのカンマ演算子の使用を非推奨化する。

```cpp
ar[x]      // C++17:OK, C++20:OK
ar[(x, y)] // C++17:OK, C++20:OK
ar[x, y]   // C++17:OK, C++20:非推奨
```

既存のカンマ演算子をオーバーロードしたコードを使用する場合は、丸カッコで囲むこと。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++23 添字演算子の多次元サポート](/lang/cpp23/multidimensional_subscript_operator.md)

## 参照
- [P1161R3 Deprecate uses of the comma operator in subscripting expressions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1161r3.html)
