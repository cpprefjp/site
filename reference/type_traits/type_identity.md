# type_identity
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  struct type_identity {
    using type = T;
  };

  template <class T>
  using type_identity_t = typename type_identity<T>::type;
}
```

## 概要
受け取った型をそのまま返す。

このクラステンプレートは、テンプレートパラメータ`T`をそのままメンバ型`type`として定義する。

これは、関数テンプレートおよびクラステンプレートでの意図しない型推論を無効化し、ユーザーに明示的に型指定させるために使用できる。


## 備考
- これと同等のクラステンプレートは、C++11向けにも`std::identity`クラスとして、[`std::forward()`](/reference/utility/forward.md)関数の実装のために予定されていたが、その際はほかの方法でも関数テンプレートの推論を無効化できたため、採用されなかった。しかし、このクラステンプレートは意図しない型推論を無効化するために便利であるとして、C++20であらためて採用することとなった


## 例
### 基本的な使い方
```cpp example
#include <type_traits>

int main()
{
  static_assert(std::is_same_v<
    std::type_identity<int>::type,
    int
  >);

  // CV修飾および参照も、そのまま返る
  static_assert(std::is_same_v<
    std::type_identity_t<const int&>,
    const int&
  >);
}
```
* std::type_identity[color ff0000]
* std::type_identity_t[color ff0000]

#### 出力
```
```

### 型推論の無効化(1)
```cpp example
#include <type_traits>

template <class T>
void f([[maybe_unused]] std::type_identity_t<T> x) {}

template <class T>
struct X {
  explicit X(std::type_identity_t<T>) {}
};

int main()
{
  // f(3);   // コンパイルエラー : テンプレートパラメータTを推論できない
  f<int>(3); // OK : 型推論を無効化し、明示的にテンプレートパラメータを指定させる

  //X{3};    // コンパイルエラー : テンプレートパラメータTを推論できない
  X<int>{3}; // OK
}
```
* std::type_identity_t[color ff0000]

### 型推論の無効化(2)
```cpp example
#include <iostream>
#include <type_traits>

template <typename T>
void h1(T a, T b)
{
  std::cout << a << ' ' << b << std::endl;
}

template <typename T>
void h2(T a, std::type_identity_t<T> b)
{
  std::cout << a << ' ' << b << std::endl;
}

int main()
{
#if 0
  // Tの型推論がintとdoubleで曖昧となるためコンパイルエラー
  h1(100, 3.14);
#endif

  // 第1引数(int)からのみTの型推論を行う
  // 第2引数はdouble→intに変換される(3.14→3)
  h2(100, 3.14);
}
```
* std::type_identity_t[color ff0000]

#### 出力
```
100 3
```


### 型変換トレイトの簡易定義
```cpp
#include <type_traits>

// using type = T*; の定義を省略し、継承だけで済ませる
template <class T>
struct my_add_pointer : std::type_identity<T*> {};

int main() {
  static_assert(std::is_same_v<
    my_add_pointer<int>::type,
    int*
  >);
}
```

#### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0887R1 The identity metafunction](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0887r1.pdf)
