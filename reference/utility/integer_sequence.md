# integer_sequence
* utility[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <class T, T... I>
  struct integer_sequence {
    using value_type = T;
    static constexpr std::size_t size() noexcept { return sizeof...(I); }
  };
}
```

## 概要
`integer_sequence`は、任意の整数型のシーケンスをコンパイル時に表現するクラスである。

このクラスは、[`tuple`](/reference/tuple/tuple.md)オブジェクトを展開して、引数パックとして他の関数に転送することを主目的として作られた。


## 適格要件
- `T` は整数型であること。


## タプルインタフェース

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`tuple_size`](integer_sequence/tuple_size.md)       | 静的な要素数取得(class template)   | C++26 |
| [`tuple_element`](integer_sequence/tuple_element.md) | 静的な要素の型取得(class template) | C++26 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`get`](integer_sequence/get.md) | 指定したインデックスの整数値を取得する | C++26 |


## 備考
- C++17まで : テンプレートパラメータ `T` が整数型でない場合の動作は未定義。
- C++20から : `T` が整数型でない場合、プログラムは不適格となり、コンパイルエラーとなることが要求されるようになった。


## 例
### 基本的な使い方
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
  f(std::integer_sequence<int, 0, 1, 2>());
}
```
* std::integer_sequence[color ff0000]

#### 出力
```
0, 1, 2
```


### 構造化束縛と`template for`文で使用する (C++26)
```cpp example
#include <iostream>
#include <utility>

int main()
{
  // 構造化束縛で整数シーケンスをパックとして取り出す
  constexpr auto [...Index] = std::make_index_sequence<3>();
  ((std::cout << Index << ' '), ...);
  std::cout << std::endl;

  // template for文で整数シーケンスを直接イテレートする
  template for (constexpr std::size_t I : std::make_index_sequence<3>()) {
    std::cout << I << ' ';
  }
  std::cout << std::endl;
}
```
* std::make_index_sequence[link make_index_sequence.md]

#### 出力
```
0 1 2 
0 1 2 
```

## バージョン
### 言語
- C++14

### 処理系
- [Clang](/implementation.md#clang): 3.4 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015 [mark verified]

## 参照
- [N3658 Compile-time integer sequences](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3658.html)
- [P1460R1 Mandating the Standard Library: Clause 20 - Utilities library](https://wg21.link/p1460r1)
- [P1789R3 Library Support for Expansion Statements](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p1789r3.pdf)
    - C++26で[構造化束縛](/lang/cpp17/structured_bindings.md)と[`template for`文](/lang/cpp26/expansion_statements.md)で使用できるよう、`tuple_size` / `tuple_element` / `get`の特殊化を追加
