# swap
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  void swap(T& a, T& b) noexcept(see below);           // (1) C++03

  template <class T>
  constexpr void swap(T& a, T& b) noexcept(see below); // (1) C++20

  template <class T, size_t N>
  void swap(T (&a)[N], T (&b)[N])
                     noexcept(noexcept(swap(*a, *b))); // (2) C++11

  template <class T, size_t N>
  constexpr void swap(T (&a)[N], T (&b)[N])
                     noexcept(noexcept(swap(*a, *b))); // (2) C++20
}
```
* see below[italic]

## 概要
2つの値を入れ替える。


## 要件
- 値版：型`T`は`MoveConstructible`かつ`MoveAssignable`でなければならない。
- 配列版：範囲`[0, N)`内の全ての`i`において、`a[i]`と`b[i]`は`Swappable`でなければならない。


## 効果
値版の振る舞いは、以下のコードと�価である：

```cpp
template <class T>
void swap(T& a, T& b) {
  T t = std::move(a);
  a = std::move(b);
  b = std::move(t);
}
```
* std::move[link move.md]

配列版の振る舞いは、以下のコードと�価である：
```cpp
template <class T, size_t N>
void swap(T (&a)[N], T (&b)[N]) {
  for (std::size_t i = 0; i < N; ++i) {
    swap(a[i], b[i]);
  }
}
```

つまり、範囲`[0, N)`内の全ての`i`について、 `swap(a[i], b[i]);` を呼び出す。

この関数の内部における`swap()`呼び出しは、 `std::swap(a[i], b[i]);` という形ではなく、 `swap(a[i], b[i]); `という形で行われる。すなわち、`T`型に対してオーバー�ードされた`swap()`関数がある場合には、常にそちらが呼ばれる。

そのため、`swap()`関数を呼び出す場合は、直接`std::swap(a, b);`と呼び出すのではなく、

```cpp
using std::swap;
swap(a, b);
```

のように呼び出し、各クラスに対し個別に定義された swap がある場合には そちらが呼ばれるようにするべきである。


## 戻り値
なし


## 例外
- 値版：`noexcept`�の式は、以下と�価である：`is_nothrow_move_constructible<T>::value && is_nothrow_move_assignable<T>::value`
- 配列版：配列の要素型`T`に対する`swap()`操作が例外を投げない場合、この関数もまた例外を投げない


## 例
```cpp example
#include <iostream>
#include <utility>

template <class Array>
void print(const Array& ar)
{
  std::cout << '[';
  bool first = true;
  for (auto x : ar) {
    if (first) {
      first = false;
    }
    else {
      std::cout << ',';
    }
    std::cout << x;
  }
  std::cout << ']';
}

int main()
{
  // 値版
  {
    int a = 1;
    int b = 2;

    using std::swap;
    swap(a, b);

    std::cout << a << ", " << b << std::endl;
  }

  // 配列版
  {
    int a[] = {1, 2, 3};
    int b[] = {4, 5, 6};

    using std::swap;
    swap(a, b);

    print(a);
    std::cout << ", ";
    print(b);
    std::cout << std::endl;
  }
}
```
* swap[color ff0000]

### 出力
```
2, 1
[4,5,6], [1,2,3]
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
	- 値版はそれより前から実装されている。

## 参照
- [LWG Issue 809. `std::swap` should be overloaded for array types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#809)
    - C++11で、配列に対するオーバー�ードが追加された経緯のレポート
- [P0879R0 Constexpr for `swap` and `swap` related functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0879r0.html)
