# decay-copy
* [meta exposition-only]
* exposition-only[meta header]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template<class T>
constexpr decay_t<T> decay-copy(T&& v)
  noexcept(is_nothrow_convertible_v<T, decay_t<T>>);            // (1) C++20
template<class T>
  requires convertible_to<T, decay_t<T>>
constexpr decay_t<T> decay-copy(T&& v)
  noexcept(is_nothrow_convertible_v<T, decay_t<T>>);            // (1) C++23
```
* decay-copy[italic]
* convertible_to[link /reference/concepts/convertible_to.md]
* is_nothrow_convertible_v[link /reference/type_traits/is_nothrow_convertible.md]

## 概要

以下の型変換をしながら、値をコピーまたはムーブする。

* 左辺値から右辺値への変換
* 配列からポインタへの変換
* 関数の左辺値から関数ポインタへの変換

この関数は、参照ではなくコピーまたはムーブした値であることを明示するために使われる。

例えば、以下のような関数`f`があるとき、式`f()`の効果を「`g`と等しい」と説明した場合、型は`int&`になってしまう。そこで、`f()`の効果を正確に述べるために「`decay-copy(g)`と等しい」という表現を用いる。

```cpp
int g = 0;
int f(){ return g; }
```

## 効果
以下と等価である：

```cpp
return std::forward<T>(v);
```
* forward[link /reference/utility/forward.md]


## 戻り値
式`decay-copy(v)`の値は次のようになる。

1. `v`が配列型の場合は、先頭要素へのポインタ
2. `v`が関数型の場合は、関数へのポインタ
3. `v`が`rvalue`の場合は、ムーブした`v`
4. それ以外の場合、コピーした`v`

## バージョン
### 言語
- C++20

## 参照
- [N4861 16.4.2.1 Exposition-only functions](https://timsong-cpp.github.io/cppwp/n4861/expos.only.func)
- [N3255 C++ Decay Copy](http://www.open-std.org/JTC1/SC22/WG21/docs/papers/2011/n3255.html) 実際の関数として提案しているが、採用には至っていない。
- [LWG Issue 3724. decay-copy should be constrained](https://cplusplus.github.io/LWG/issue3724)
    - C++23で、`decay-copy`に`convertible_to<T, decay_t<T>>`制約が追加され、変換できない型に対してSFINAEフレンドリー（ill-formed）になった
