# operator<=>
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto operator<=>(const basic_const_iterator& y) const
  requires random_access_iterator<Iterator> && three_way_comparable<Iterator>;          // (1)

template<different-from<basic_const_iterator> I>
constexpr auto operator<=>(const I& y) const
  requires random_access_iterator<Iterator> && totally_ordered_with<Iterator, I> &&
           three_way_comparable_with<Iterator, I>;                                      // (2)
```
* different-from[link /reference/ranges/different-from.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* three_way_comparable[link /reference/compare/three_way_comparable.md]
* totally_ordered_with[link /reference/concepts/totally_ordered.md]

## 概要


`basic_const_iterator<Iterator>`オブジェクトと別のイテレータ（`basic_const_iterator<Iterator>`か`Iterator`、`Iterator`と比較可能なオブジェクト）の三方比較を行う。

- (1) : `basic_const_iterator`同士の比較を行う
- (2) : ラップしているイテレータ（`Iterator`）と直接比較可能な型との間で比較を行う

## 効果

ラップするイテレータを`current_`というメンバに保持するとして

- (1) : 以下と等価  
    ```cpp
    return current_ <=> y.current_;
    ```

- (2) : 以下と等価  
    ```cpp
    return current_ <=> y;
    ```

## 備考

(2)の演算子により以下の演算子が使用可能になる（制約は同じものが適用される）。

```cpp
// 逆順
template<different-from<basic_const_iterator> I>
friend constexpr auto operator<=>(const I&, const basic_const_iterator&);
```

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>
#include <compare>

int main() {
  std::vector vec = {1, 2, 3, 4, 5};

  std::basic_const_iterator cit = vec.begin();
  auto se = vec.end();
  std::basic_const_iterator cse = se;


  std::cout << std::boolalpha;

  // (1) basic_const_iterator同士の比較
  std::cout << std::is_lt(cit <=> cse) << '\n';
  std::cout << std::is_lt(cse <=> cit) << '\n';

  // (2) 元のイテレータとの比較
  std::cout << std::is_lt(cit <=> se) << '\n';
  std::cout << std::is_lt(se <=> cit) << '\n';
}
```
* <=>[color ff0000]
* is_lt[link /reference/compare/named_comparison_functions.md]

### 出力

```
true
false
true
false
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
