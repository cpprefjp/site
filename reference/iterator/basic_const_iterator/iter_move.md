# iter_move (非メンバ関数)
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
friend constexpr rvalue-reference iter_move(const basic_const_iterator& i) noexcept(see below);
```

## 概要

`basic_const_iterator`である`i`の指す要素をムーブする。

戻り値の`rvalue-reference`は次のように求められる`const`かつ右辺値となる型である

```cpp
using rvalue-reference = common_reference_t<const iter_value_t<Iterator>&&, iter_rvalue_reference_t<Iterator>>;
```

## 戻り値

ラップしているイテレータを`current_`メンバ変数に保持するとして、次のようになる

```cpp
return static_cast<rvalue-reference>(ranges::iter_move(i.current_));
```

## 例外

`noexcept`指定には次の式が指定される

```cpp
noexcept(static_cast<rvalue-reference>(ranges::iter_move(i.current_)))
```

## 備考

この関数は[*Hidden friends*](/article/lib/hidden_friends.md)として定義される。

## 例
```cpp example
#include <iterator>
#include <vector>
#include <iostream>

int main() {
  std::vector vec = {1, 2, 3, 4, 5};

  std::basic_const_iterator cit = vec.begin();

  // ADLによる呼び出し
  int n1 = iter_move(cit);
  std::cout << n1 << std::endl;
  
  ++cit;

  // ranges::iter_move CPOによる呼び出し
  int n2 = std::ranges::iter_move(cit);
  std::cout << n2 << std::endl;
}
```
* iter_move[color ff0000]

### 出力
```
1
2
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
