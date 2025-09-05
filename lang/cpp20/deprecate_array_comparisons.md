# 組み込み配列の比較を非推奨化 [P1120R0]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
[三方比較演算子](consistent_comparison.md)の導入にともない、組み込み配列の等値比較および関係比較は非推奨となる。

組み込み配列同士の三方比較は不適格である。

```cpp
int arr1[5];
int arr2[5];
bool same = arr1 == arr2; // C++20で非推奨。&arr1[0] == &arr2[0]と同じ。
                          // 配列の要素は比較されない
auto cmp = arr1 <=> arr2; // エラー！
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++20 `<=>`/`==`による比較演算子の自動定義](consistent_comparison.md)
- [C++26 非推奨だった組み込み配列の比較を削除](/lang/cpp26/remove_deprecated_array_comparisons.md)


## 参照
- [P1120R0 Consistency improvements for `<=>` and other comparison operators](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1120r0.html)
