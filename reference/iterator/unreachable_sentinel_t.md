# unreachable_sentinel_t
* iterator[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  struct unreachable_sentinel_t {
    template<weakly_incrementable I>
    friend constexpr bool operator==(unreachable_sentinel_t, const I&) noexcept
    { return false; }
  };

  inline constexpr unreachable_sentinel_t unreachable_sentinel{};
}
```
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]

## 概要

`unreachable_sentinel_t`は、`weakly_incrementable`な型（主にイテレータ型）とともに用いて、非有界な区間の上界を表すことのできる番兵型である。

非有界な区間とは無限長の範囲のように、その終端が指定されない区間（範囲）のこと。そのような範囲の走査に対して`unreachable_sentinel`を使用して、別の方法によって範囲の終端が示されることを表し、それによって区間の上界を指定することができる。

1つの使い方は、無限長の範囲や`view`の番兵型として指定することで、その長さが無制限であることを表すことである。[`views::iota`](/reference/ranges/iota_view.md)や[`views::repeat`](/reference/ranges/repeat_view.md)でそのような使用方法を見ることができる。

もう一つの使い方として、検索などにおいてある範囲の一部を走査する際にそのイテレータに対する番兵として用いる事で、範囲の終端チェックを省略して走査を効率化できる可能性がある。ただし、実際の終端に到達しても走査が終了しないため、利用にあたっては事前条件（終端となる値が存在しているか）が必ず満たされるかに注意を払う必要がある。

## 非メンバ（*Hidden friends*）関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| `operator==`     | 等値比較、常に`false`を返す | C++20 |
| `operator!=`     | 非等値比較、常に`true`を返す (`==`により使用可能) | C++20 |

## 例
```cpp example
#include <string>
#include <iterator>
#include <algorithm>
#include <iostream>

int main() {
  std::string str = "(any unbounded interval)";

  // 探したい値（ここでは'i'）が範囲内に含まれていることが予め分かる場合に利用できる
  // 最適化によって範囲の終端チェックが省略され、効率的に探索できる可能性がある
  // もしその仮定が成立しない場合、イテレータによる走査は外側の範囲を飛び出し未定義動作を引き起こすため注意が必要である
  auto pos = std::ranges::find(str.begin(), std::unreachable_sentinel, 'i');
  
  // 'j'は元の文字列に含まれないため未定義動作を引き起こす
  //auto pos = std::ranges::find(str.begin(), std::unreachable_sentinel, 'j');
  
  std::cout << *pos;
}
```
* unreachable_sentinel[color ff0000]
* find[link /reference/algorithm/find.md]

### 出力
```
i
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 5 [mark verified]

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
