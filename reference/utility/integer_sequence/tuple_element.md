# tuple_element
* utility[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <std::size_t I, class T> class tuple_element;

  template <std::size_t I, class T, T... Values>
  struct tuple_element<I, integer_sequence<T, Values...>> {
    using type = T;
  };

  template <std::size_t I, class T, T... Values>
  struct tuple_element<I, const integer_sequence<T, Values...>> {
    using type = T;
  };
}
```
* integer_sequence[link ../integer_sequence.md]


## 概要
`tuple_element`は、タプルとして見なせる型から、`I`番目の要素型を取得するためのクラスである。

`<utility>`ヘッダでは、[`integer_sequence`](../integer_sequence.md)に関する特殊化を提供する。これにより、構造化束縛および[`template for`文](/lang/cpp26/expansion_statements.md)で[`integer_sequence`](../integer_sequence.md)を使用できる。


## 適格要件
- `I < sizeof...(Values)`であること


## 例
### 基本的な使い方
```cpp example
#include <utility>
#include <type_traits>
#include <tuple>

int main()
{
  using Seq = std::integer_sequence<int, 0, 1, 2>;

  static_assert(std::is_same_v<
                  std::tuple_element_t<0, Seq>,
                  int
                >);
}
```
* std::tuple_element_t[color ff0000]

#### 出力
```
```


### 構造化束縛で使用する
構造化束縛は`tuple_element`によって各要素の型を決定する。

```cpp example
#include <iostream>
#include <utility>

template <std::size_t Count>
void run() {
  // tuple_element<I, integer_sequence<size_t, ...>>::type が size_t であるため、
  // 各要素は size_t として束縛される
  constexpr auto [...Index] = std::make_index_sequence<Count>{};

  ((std::cout << Index << ' '), ...);
  std::cout << std::endl;
}

int main()
{
  run<3>();
}
```
* std::make_index_sequence[link ../make_index_sequence.md]

#### 出力
```
0 1 2 
```


### `template for`文で使用する
[`template for`文](/lang/cpp26/expansion_statements.md)はループ変数の型推論に`tuple_element`を利用する。

```cpp example
#include <iostream>
#include <utility>

int main()
{
  // tuple_element<I, integer_sequence<int, ...>>::type は int
  template for (auto I : std::integer_sequence<int, 10, 20, 30>{}) {
    std::cout << I << ' ';
  }
  std::cout << std::endl;
}
```

#### 出力
```
10 20 30 
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
