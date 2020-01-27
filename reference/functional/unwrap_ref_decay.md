# unwrap_ref_decay
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  struct unwrap_ref_decay : unwrap_reference<decay_t<T>> {};

  template <class T>
  using unwrap_ref_decay_t = typename unwrap_ref_decay<T>::type;
}
```
* unwrap_reference[link unwrap_reference.md]
* decay_t[link /reference/type_traits/decay.md]

## 概要
[`reference_wrapper`](reference_wrapper.md)`<T>`型を`T&`型に展開し、型推論規則による型変換を行う。

この変換型特性は、関数で受け取ったパラメータをメンバ変数にもつオブジェクトを構築して返すような状況で頻出する型変換を行う。

例として、標準ライブラリ内では[`std::make_pair()`](/reference/utility/make_pair.md)や[`std::make_tuple()`](/reference/tuple/make_tuple.md)の戻り値型を求める際に使用する。


## 効果
- テンプレートパラメータ`T`を、[`unwrap_reference`](unwrap_reference.md)によって[`reference_wrapper`](reference_wrapper.md)`<T>`型を展開`T&`に展開し、[`decay`](/reference/type_traits/decay.md)によって型推論規則による型変換を行う。


## 例
```cpp example
#include <cassert>
#include <functional>
#include <type_traits>

template <class T>
struct X {
  T t;
};

template <class T>
X<std::unwrap_ref_decay_t<T>> f(T t)
{
  return X<std::unwrap_ref_decay_t<T>>{t};
}

int main()
{
  static_assert(std::is_same_v<
    std::unwrap_ref_decay_t<std::reference_wrapper<int>>,
    int&
  >);

  static_assert(std::is_same_v<
    std::unwrap_ref_decay_t<int[3]>,
    int*
  >);

  static_assert(std::is_same_v<
    std::unwrap_ref_decay_t<const char(&)[3]>,
    const char*
  >);

  static_assert(std::is_same_v<
    std::unwrap_ref_decay_t<int>,
    int
  >);

  static_assert(std::is_same_v<
    std::unwrap_ref_decay_t<const int&>,
    int
  >);

  // Xクラスに参照を保持させたい場合にstd::ref()を通して渡し、
  // そうでなければ単に引数を転送する。
  int a = 3;
  X x = f(std::ref(a));
  x.t = 2;
  assert(a == 2);

  int b = 4;
  X y = f(b);
  y.t = 5;
  assert(y.t == 5);
  assert(b == 4);

  // Xクラスに文�列リテラルを保持させたい場合に、
  // const char(&)[N]がconst char*に変換して保持させられる。
  X z = f("Hello");
  static_assert(std::is_same_v<decltype(z.t), const char*>);
}
```
* std::unwrap_ref_decay_t[color ff0000]
* std::reference_wrapper[link ref.md]
* std::ref[link ref.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0318R1 `unwrap_ref_decay` and `unwrap_reference`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0318r1.pdf)
