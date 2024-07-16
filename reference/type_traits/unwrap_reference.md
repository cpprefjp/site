# unwrap_reference
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  struct unwrap_reference {
    using type = …;
  };
  
  template <class T>
  using unwrap_reference_t = typename unwrap_reference<T>::type;
}
```

## 概要
[`reference_wrapper`](/reference/functional/reference_wrapper.md)`<T>`型を`T&`型に展開する。


## 効果
- テンプレートパラメータ`T`が[`reference_wrapper`](/reference/functional/reference_wrapper.md)`<T>`であれば、`T&`型をメンバ型`type`として定義する
- そうでなければ、テンプレートパラメータ`T`をメンバ型`type`として定義する


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
X<typename std::unwrap_reference<T>::type> f(T t)
{
  return X<typename std::unwrap_reference<T>::type>{t};
}

int main()
{
  static_assert(std::is_same_v<
    std::unwrap_reference<std::reference_wrapper<int>>::type,
    int&
  >);

  static_assert(std::is_same_v<
    std::unwrap_reference<int>::type,
    int
  >);

  static_assert(std::is_same_v<
    std::unwrap_reference<const int&>::type,
    const int&
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
}
```
* std::unwrap_reference[color ff0000]
* std::reference_wrapper[link /reference/functional/reference_wrapper.md]
* std::ref[link /reference/functional/ref.md]

### 出力
```
```

## 実装例
```cpp
namespace std {
  template <class T>
  struct unwrap_reference { using type = T; }

  template <class T>
  struct unwrap_reference<reference_wrapper<T>> { using type = T&; }
}
```
* reference_wrapper[link /reference/functional/reference_wrapper.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0318R1 `unwrap_ref_decay` and `unwrap_reference`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0318r1.pdf)
- [LWG Issue 3348. `__cpp_lib_unwrap_ref` in wrong header](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3348)
