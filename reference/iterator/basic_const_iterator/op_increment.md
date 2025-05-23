# operator++
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr basic_const_iterator& operator++();   // (1)

constexpr void operator++(int);                 // (2)
constexpr basic_const_iterator operator++(int) requires forward_iterator<Iterator>; // (3)
```
* forward_iterator[link /reference/iterator/forward_iterator.md]

## 概要

イテレータをインクリメントする。

- (1) : 前置インクリメント
- (2), (3) : 後置インクリメント

## 効果

ラップするイテレータを`current_`というメンバに保持するとして

- (1) : 以下と等価  
    ```cpp
    ++current_;
    return *this;
    ```

- (2) : `++current_;`

- (3) : 以下と等価  
    ```cpp
    auto tmp = *this;
    ++*this;
    return tmp;
    ```

## 例
```cpp example
#include <iostream>
#include <iterator>

int main() {
  std::vector vec = {1, 2, 3, 4, 5};

  std::basic_const_iterator cit = vec.begin();

  ++cit;

  std::cout << *cit << '\n';

  cit++;

  std::cout << *cit << '\n';
}
```
* ++cit[color ff0000]
* cit++[color ff0000]

### 出力
```
2
3
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
