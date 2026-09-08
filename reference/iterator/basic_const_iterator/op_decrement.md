# operator--
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr basic_const_iterator& operator--()
  requires bidirectional_iterator<Iterator>;    // (1) C++23

constexpr basic_const_iterator operator--(int)
  requires bidirectional_iterator<Iterator>;    // (2) C++23
basic_const_iterator operator--(int) = default; // (2) C++29
```

## 概要

イテレータをデクリメントする。

- (1) : 前置デクリメント
- (2) : 後置デクリメント

## 効果

ラップするイテレータを`current_`というメンバに保持するとして

- (1) : 以下と等価  
    ```cpp
    --current_;
    return *this;
    ```

- (2) : 以下と等価  
    ```cpp
    auto tmp = *this;
    --*this;
    return tmp;
    ```

## 備考
- (2) : C++29で、[後置インクリメント・デクリメント演算のdefault定義](/lang/cpp29/defaulting_postfix_increment_and_decrement_operations.md)を使用した`= default`定義へ規定が変更された。動作は変わらない（`= default`定義の後置`--`は、前置`--`が使用できる場合にのみ使用できるため、制約の明示も不要になった）

## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector vec = {1, 2, 3, 4, 5};

  std::basic_const_iterator cit = vec.end();

  --cit;

  std::cout << *cit << '\n';

  cit--;

  std::cout << *cit << '\n';
  
}
```
* --cit[color ff0000]
* cit--[color ff0000]

### 出力
```
5
4
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
- [P3785R1 Library Wording Changes for Defaulted Postfix Increment and Decrement Operations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3785r1.html)
    - C++29で、後置演算子の規定が`= default`定義へ書き換えられた
