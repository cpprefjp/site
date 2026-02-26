# コンストラクタ
* iterator[meta header]
* std[meta namespace]
* counted_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr counted_iterator() requires default_initializable<I> = default; // (1)

constexpr counted_iterator(I x, iter_difference_t<I> n);                  // (2)

template<class I2>
  requires convertible_to<const I2&, I>
constexpr counted_iterator(const counted_iterator<I2>& x);                // (3)
```

## 概要

`counted_iterator`オブジェクトを構築する。

## 堅牢化された事前条件

- (2) : `n >= 0`

## 効果

`I`の値を`current`メンバ変数、カウントの値を`length`メンバ変数に保持するとする。

- (1) : `current, n`をデフォルト構築する。
- (2) : `current`を`x`からムーブ構築し、`length`を`n`で初期化する。
- (3) : `current`を`x.current`から、`length`を`x.length`からコピーして初期化する。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  // (1) デフォルトコンストラクタ
  std::counted_iterator<std::vector<int>::iterator> ci1{};
  
  // (2) イテレータとカウントから構築
  std::counted_iterator ci2{std::ranges::begin(vec), 5};

  // (3) コピーコンストラクタ
  std::counted_iterator ci3{ci2};
}
```
* std::counted_iterator[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update ８ [mark verified]

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P2325R3 Views should not be required to be default constructible](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2325r3.html)
- [P3697R1 Minor additions to C++26 standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3697r1.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
