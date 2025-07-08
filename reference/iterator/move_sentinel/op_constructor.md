# コンストラクタ
* iterator[meta header]
* std[meta namespace]
* move_sentinel[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr move_sentinel();                              // (1)

constexpr explicit move_sentinel(S s);                  // (2)

template<class S2>
  requires convertible_to<const S2&, S>
constexpr move_sentinel(const move_sentinel<S2>& s);    // (3)
```

## 概要

`move_sentinel`オブジェクトを構築する。

## 効果

`S`の番兵オブジェクトを`last`というメンバ変数に保持しているとする。

- (1) : `last`を値初期化する（`last{}`相当の初期化）。
- (2) : `last`を`std::move(s)`によって初期化する。
- (3) : `last`を`s.last`によって初期化する。

## 定数式に評価される条件

- (1) : [`is_trivially_default_constructible_v`](/reference/type_traits/is_trivially_default_constructible.md)`<S> == true`の時。

## 例

```cpp example
#include <iterator>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3};
  auto se = std::end(vec);

  // (1) デフォルト構築
  std::move_sentinel<std::vector<int>::iterator> ms1{};

  // (2) 番兵を渡して構築
  std::move_sentinel ms2{se};

  // (3) コピー構築
  std::move_sentinel<std::vector<int>::iterator> ms3{ms2};
}
```
* std::move_sentinel[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 7 [mark verified]

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
