# エイリアステンプレート経由でのクラステンプレートのテンプレート引数推論 [P1814R0]
* cpp20[meta cpp]

## 概要
C++17で導入されたクラステンプレートのテンプレート引数推論は、コンストラクタ引数からテンプレート引数を推論するものであった。しかし、そのクラステンプレートのエイリアステンプレートを定義した場合に、エイリアステンプレートの変数定義からはクラステンプレートのテンプレート引数を推論できない問題があった。

C++20では、エイリアステンプレートからでもコンストラクタ引数からクラステンプレート引数を推論できるようになる。

```cpp
template <class T>
struct Point {
  T x;
  T y;

  Point(T x_, T y_)
    : x(x_), y(y_) {}
};

template <class T>
using MyPoint = Point<T>;

MyPoint p1{3.0, 4.0}; // C++17:NG C++20:OK
```

エイリアステンプレート側で制約を課した場合：

```cpp
#include <concepts>
#include <type_traits>

template <class T, class U>
struct C {
  C(T, U);                                // #1
};

template <class T, class U>
C(T, U) -> C<T, std::type_identity_t<U>>; // #2

// 2つのテンプレート引数を同じ型、かつポインタ型に限定する
template <class V>
using A = C<V*, V*>;

// 2つのテンプレート引数を同じ型、かつ整数のポインタ型に限定する
template <std::integral W>
using B = A<W>;


int i{};
double d{};

A a1(&i, &i); // A<int>に推論される
A a2(i, i);   // エラー！ iからV*を推論できない (ポインタ型でないといけない)
A a3(&i, &d); // エラー！
              // #1: (int *, double *)から(V*, V*)を推論できない
              // #2: C<int *, double *>からA<V>を推論できない

B b1(&i, &i); // B<int>に推論される
B b2(&d, &d); // エラー！ C<double*, double*>からB<W>を推論できない
              // (整数のポインタ型でないといけない)
```
* std::type_identity_t[link /reference/type_traits/type_identity.md]
* std::integral[link /reference/concepts/integral.md]


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P1814R0 Wording for Class Template Argument Deduction for Alias Templates](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1814r0.html)
