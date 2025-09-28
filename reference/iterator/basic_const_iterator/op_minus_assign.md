# operator-=
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr basic_const_iterator& operator-=(difference_type n)
  requires random_access_iterator<Iterator>;
```

## 概要

イテレータを`n`回逆に進める。

## 効果

ラップするイテレータを`current_`というメンバに保持するとして、  以下と等価

```cpp
current -= n;
return *this;
```

## 戻り値

`*this`

## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector vec = {1, 2, 3, 4, 5};

  std::basic_const_iterator cit = vec.end();

  cit -= 2;

  std::cout << *cit << '\n';
}
```

### 出力
```
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
