# make_integer_sequence
* utility[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <class T, T N>
  using make_integer_sequence = integer_sequence<T, 0, 1, …, N - 1>;
}
```
* integer_sequence[link integer_sequence.md]


## 概要
`make_integer_sequence`は、要素数を指定して、0から始まる整数シーケンスを生成する、[`integer_sequence`](integer_sequence.md)クラステンプレートの別名である。

テンプレートパラメータは、以下を意味する：

- `T` : シーケンスの要素となる整数型
- `N` : 要素数

要素数`N`に0が�定された場合は、[`integer_sequence<T>`](integer_sequence.md)の別名として定義され、シーケンスが空となる。


## 例
```cpp example
#include <iostream>
#include <utility>

void g(int a, int b, int c)
{
  std::cout << a << ", " << b << ", " << c << std::endl;
}

template <class T, T... Seq>
void f(std::integer_sequence<T, Seq...>)
{
  // 定数のシーケンス{0, 1, 2}を取り出して、関数g()の引数として転送
  g(Seq...);
}

int main()
{
  // integer_sequence<int, 0, 1, 2>を作って渡す
  f(std::make_integer_sequence<int, 3>());
}
```
* std::make_integer_sequence[color ff0000]
* std::integer_sequence[link integer_sequence.md]

## 出力
```
0, 1, 2
```


## バージョン
### 言語
- C++14

### 処理系
- [Clang](/implementation.md#clang): 3.4
- [GCC](/implementation.md#gcc): 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015


## 参照
- [N3658 Compile-time integer sequences](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3658.html)


