# get
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <std::size_t I, class T, T... Values>
  constexpr T get(integer_sequence<T, Values...>) noexcept; // (1) C++26
}
```
* integer_sequence[link ../integer_sequence.md]


## 概要
[`integer_sequence`](../integer_sequence.md)から、`I`番目の整数値を取得する。


## 適格要件
- `I < sizeof...(Values)`であること


## 戻り値
`Values...`の`I`番目の値


## 例外
投げない


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <utility>

int main()
{
  using Seq = std::integer_sequence<int, 10, 20, 30>;

  std::cout << std::get<0>(Seq{}) << std::endl;
  std::cout << std::get<1>(Seq{}) << std::endl;
  std::cout << std::get<2>(Seq{}) << std::endl;
}
```
* std::get[color ff0000]

#### 出力
```
10
20
30
```


### 構造化束縛で使用する
構造化束縛は内部的に`get<I>`を呼び出して各要素を取り出す。

```cpp example
#include <iostream>
#include <utility>

template <std::size_t Count>
void run() {
  // 各Indexはget<I>(make_index_sequence<Count>{})から取り出される
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
[`template for`文](/lang/cpp26/expansion_statements.md)はループの各反復で`get<I>`を呼び出す。

```cpp example
#include <iostream>
#include <utility>

int main()
{
  // 各反復で get<0>, get<1>, get<2> が呼び出される
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


## 関連項目
- [`get - std::tuple`](/reference/tuple/tuple/get.md)
- [`get - std::pair`](/reference/utility/pair/get.md)
- [`get - std::array`](/reference/array/array/get.md)


## 参照
- [P1789R3 Library Support for Expansion Statements](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p1789r3.pdf)
