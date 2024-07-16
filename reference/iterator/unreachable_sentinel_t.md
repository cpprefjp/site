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

`unreachable_sentinel_t`は、`weakly_incrementable`な型（イテレータ型）とともに用いて、任意の（半）開区間の上界を示すことのできる番兵型である。

検索などを目的として範囲を走査する際、検索対象が範囲内に存在している場合その終端まで到達することは無く、範囲の探索は必ずしも範囲の先頭から行われる訳でも無い。任意の（半）開区間とは、ある範囲の内部にあるその様な走査の対象となる部分範囲のことを指す。`unreachable_sentinel`はその様な区間の終端を暗に指定する、その様な開区間の上界を表す番兵である。

検索など、ある範囲の一部を走査する際にそのイテレータに対する番兵として用いる事で、範囲の終端チェックを省略して走査を効率化できる可能性がある。ただし、実際の終端に到達しても走査が終了しないため、利用にあたっては事前条件（終端となる値が存在しているか）が必ず満たされるかに注意を払う必要がある。

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
  // もしその仮定が成立しない場合、イテレータによる走査は外側の範囲を飛び出し未定義動作となるため注意が必要である
  auto pos = std::ranges::find(str.begin(), std::unreachable_sentinel, 'i');
  
  // 'j'は元の文字列に含まれないため未定義動作となる
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
