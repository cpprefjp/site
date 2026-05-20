# tuple_size
* utility[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T> class tuple_size; // 先行宣言

  template <class T, T... Values>
  struct tuple_size<integer_sequence<T, Values...>>
    : integral_constant<size_t, sizeof...(Values)> {};
}
```
* integral_constant[link /reference/type_traits/integral_constant.md]
* integer_sequence[link ../integer_sequence.md]

## 概要
`tuple_size`は、タプルとして見なせる型の要素数を取得するためのクラスである。

`<utility>`ヘッダでは、[`integer_sequence`](../integer_sequence.md)に関する特殊化を提供する。これにより、構造化束縛および[`template for`文](/lang/cpp26/expansion_statements.md)で[`integer_sequence`](../integer_sequence.md)を使用できる。


## 例
### 基本的な使い方
```cpp example
#include <utility>

int main()
{
  static_assert(std::tuple_size<std::integer_sequence<int, 0, 1, 2>>::value == 3);
}
```
* std::tuple_size[color ff0000]

#### 出力
```
```


### 構造化束縛で使用する
構造化束縛は`tuple_size`の値を要素数として認識する。

```cpp example
#include <iostream>
#include <utility>

template <std::size_t Count>
void print_indices() {
  // tuple_sizeが要素数Countを伝え、tuple_element/getで各値が取り出される
  constexpr auto [...Index] = std::make_index_sequence<Count>{};
  ((std::cout << Index << ' '), ...);
  std::cout << std::endl;
}

int main()
{
  print_indices<3>();
}
```
* std::make_index_sequence[link ../make_index_sequence.md]

#### 出力
```
0 1 2 
```


### `template for`文で使用する
[`template for`文](/lang/cpp26/expansion_statements.md)は`tuple_size`の値分だけ本体を展開する。

```cpp example
#include <iostream>
#include <utility>

int main()
{
  // tuple_sizeが要素数3を伝え、本体が3回展開される
  template for (auto I : std::make_index_sequence<3>{}) {
    std::cout << I << ' ';
  }
  std::cout << std::endl;
}
```
* std::make_index_sequence[link ../make_index_sequence.md]

#### 出力
```
0 1 2 
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P1789R3 Library Support for Expansion Statements](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p1789r3.pdf)
