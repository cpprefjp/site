# 非推奨だった組み込み配列の比較を削除 [P2865R6]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++20での[三方比較演算子](/lang/cpp20/consistent_comparison.md)の導入にともない、組み込み配列の等値比較および関係比較は非推奨となっていたが、これを削除する。

組み込み配列同士の三方比較はC++20時点で不適格である。

```cpp
int arr1[5];
int arr2[5];
bool same = arr1 == arr2; // C++20: 非推奨、C++26: エラー。
                          // &arr1[0] == &arr2[0]と同じ。
                          // 配列の要素は比較されない
auto cmp = arr1 <=> arr2; // エラー！
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++20 `<=>`/`==`による比較演算子の自動定義](/lang/cpp20/consistent_comparison.md)
- [C++20 組み込み配列の比較を非推奨化](/lang/cpp20/deprecate_array_comparisons.md)


## 参照
- [P2865R6 Remove Deprecated Array Comparisons from C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2865r6.pdf)
