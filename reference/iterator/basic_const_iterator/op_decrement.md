# operator--
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr basic_const_iterator& operator--() requires bidirectional_iterator<Iterator>;     // (1)

constexpr basic_const_iterator operator--(int) requires bidirectional_iterator<Iterator>;   // (2)
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

## 例
```cpp example
#include <iostream>
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
