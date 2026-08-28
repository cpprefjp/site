# operator CI
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
template<not-a-const-iterator CI>
  requires constant-iterator<CI> && convertible_to<Iterator const&, CI>
constexpr operator CI() const&; // (1) C++26

template<not-a-const-iterator CI>
  requires constant-iterator<CI> && convertible_to<Iterator, CI>
constexpr operator CI() &&;     // (2) C++26
```
* constant-iterator[link /reference/iterator/constant-iterator.md]

## 概要

基底イテレータ`Iterator`が変換できる定数イテレータ型への変換演算子。

`std::vector`のようなコンテナのイテレータは、対応する`const_iterator`へ暗黙変換できる。この変換演算子によって、そのようなイテレータをラップした`basic_const_iterator`もまた、同じ`const_iterator`へ暗黙変換できる。

- (1) : 左辺値からの変換
- (2) : 右辺値からの変換

## テンプレートパラメータ制約

- (1) : `CI`が定数イテレータ ([`constant-iterator`](/reference/iterator/constant-iterator.md)のモデル) であり、`const Iterator&`から`CI`へ変換可能であること
- (2) : `CI`が定数イテレータ ([`constant-iterator`](/reference/iterator/constant-iterator.md)のモデル) であり、`Iterator`から`CI`へ変換可能であること

`not-a-const-iterator<CI>`は`CI`が`basic_const_iterator`の特殊化ではない場合に`true`となる説明専用のコンセプトである。

## 戻り値

ラップしているイテレータを`current_`メンバ変数に保持するとして

- (1) : `current_`
- (2) : `std::move(current_)`

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <ranges>
#include <vector>

int main() {
  std::vector<int> v = {1, 2, 3};
  auto t = v | std::views::take_while([](int x) { return x < 3; });

  // std::basic_const_iterator<std::vector<int>::iterator>
  auto cit = std::ranges::cbegin(t);

  // 基底イテレータの変換先である const_iterator へ暗黙変換できる
  std::vector<int>::const_iterator i = cit;

  std::cout << *i << '\n';
}
```
* std::ranges::cbegin[link /reference/ranges/cbegin.md]
* std::views::take_while[link /reference/ranges/take_while_view.md]

### 出力
```
1
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark noimpl]
- [GCC](/implementation.md#gcc): 13.4 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 10 [mark verified]

### 備考

この変換演算子はC++23に対する欠陥報告 (DR) として追加されたものであり、コンパイラは早期に対応している場合がある。そのため、C++23モードでも使用できる可能性がある。

## 参照

- [P2836R1 `std::basic_const_iterator` should follow its underlying type's convertibility](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2836r1.html)
    - C++26で、基底イテレータが変換できる定数イテレータ型への変換演算子が追加された。この修正は欠陥報告 (DR) であり、C++23へ遡及して適用される。C++20では`std::ranges::cbegin()`が基底イテレータをそのまま返していたため変換できていたコードが、C++23で`basic_const_iterator`を返すようになったことで変換できなくなるという移行時の問題への対応であるため
