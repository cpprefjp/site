# type_order
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval strong_ordering type_order(info type_a, info type_b);
}
```
* info[link info.md]

## 概要
2つの型のリフレクション間の順序を取得する。[`std::meta::info`](info.md)は`<=>`をサポートしないが、この関数により型のリフレクション間で一貫した全順序を得ることができる。

[`std::type_order`](/reference/compare/type_order.md)のリフレクション版である。


## 戻り値
`type_a`と`type_b`が型を表す場合、それらの間の実装定義の全順序を[`strong_ordering`](/reference/compare/strong_ordering.md)として返す。


## 例外
`type_a`または`type_b`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 備考
型のリフレクションを並べ替えるユースケースで使用される。具体的には以下のような場面で必要になる：

- **型リストの正規化**: 型集合（`typeset<A, B>`と`typeset<B, A>`を同じ型にする）の実装
- **`std::variant`の候補型の正規化**: 候補型の順序を一意化することで、`variant<A, B>`と`variant<B, A>`を同じ型として扱える
- **`std::expected`のエラー型の集約**: 複数の翻訳単位にわたって安定したエラー型のマージ
- **`std::execution`等の非同期処理**: 中継型を一意化することで安定したシグニチャを得る

実装定義の全順序の具体的な順番には依存すべきではないが、ある実装の中では翻訳単位の境界をまたいでも安定する。


## 例
### 基本的な使い方
```cpp example
#include <meta>
#include <compare>

int main() {
  // 同じ型の比較は equal
  static_assert(std::meta::type_order(^^int, ^^int) == std::strong_ordering::equal);
  // 異なる型は less または greater（実装定義）
  static_assert(std::meta::type_order(^^int, ^^double) != std::strong_ordering::equal);
}
```

### 出力
```
```

### 型リフレクションを順序付けする
[`type_order()`](type_order.md)を比較関数として使用することで、型リフレクションのコレクションを安定した順序にソートできる。

```cpp example
#include <meta>
#include <algorithm>
#include <vector>

consteval std::vector<std::meta::info> sort_types(std::vector<std::meta::info> types) {
  std::ranges::sort(types,
    [](std::meta::info a, std::meta::info b) {
      return std::meta::type_order(a, b) == std::strong_ordering::less;
    });
  return types;
}

int main() {
  // 入力順序に関わらず、同じ型集合は同じ並びにソートされる
  static constexpr auto sorted1 = std::define_static_array(
    sort_types({^^int, ^^double, ^^char}));
  static constexpr auto sorted2 = std::define_static_array(
    sort_types({^^char, ^^int, ^^double}));

  // 並びが一致することを確認
  static_assert(sorted1.size() == sorted2.size());
  static_assert(sorted1[0] == sorted2[0]);
  static_assert(sorted1[1] == sorted2[1]);
  static_assert(sorted1[2] == sorted2[2]);
}
```
* std::ranges::sort[link /reference/algorithm/ranges_sort.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 (`-freflection` オプション指定) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
