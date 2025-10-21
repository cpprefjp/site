# operator+ (非メンバ関数)
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
friend constexpr basic_const_iterator operator+(const basic_const_iterator& i, difference_type n)
  requires random_access_iterator<Iterator>;                                                        // (1)

friend constexpr basic_const_iterator operator+(difference_type n, const basic_const_iterator& i)   // (2)
```

## 概要

イテレータを`n`回進める。

## 効果

ラップしているイテレータを`current_`メンバ変数に保持するとして、以下と等価

```cpp
return basic_const_iterator(i.current_ + n);
```

## 戻り値

現在位置から`n`戻したイテレータのコピーを返す。

## 備考

これらの関数は全て[*Hidden friends*](/article/lib/hidden_friends.md)として定義される。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>

int main() {
  std::vector vec = {1, 2, 3, 4, 5};

  std::basic_const_iterator cit = vec.begin();

  auto cit2 = cit + 3;
  auto cit3 = 4 + cit;

  std::cout << *cit << '\n';
  std::cout << *cit2 << '\n';
  std::cout << *cit3 << '\n';
}
```

### 出力
```
1
4
5
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
