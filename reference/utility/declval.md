# declval
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  typename add_rvalue_reference<T>::type
    declval() noexcept;
}
```
* add_rvalue_reference[link /reference/type_traits/add_rvalue_reference.md]

## 概要
指定された型の値を得る。

この関数は、`decltype(expr)`や`noexcept(expr)` といった、実際には評価されない式の内部において、特定の型を持った式を作るためのヘルパ関数である。


## 戻り値
この関数は呼び出されないので、値としては何も返さない。

実際には評価されない文脈(`decltype`, `sizeof`, `noexcept`)で使用することで、指定された型に対する特定の演算が可能かどうかを調べるためだけの「型の値」が返る。


## 例外
投げない


## 備考
テンプレートパラメータ`T`は、不完全型であってもよい。

この関数が実際に評価されうる場合、プログラムは不適格となる。


## 例
```cpp
#include <iostream>
#include <utility>

// この関数は、型Fromから型Toへの明示的な型変換が定義されている場合のみ
// オーバーロード解決の候補となる
template <class To, class From>
decltype(static_cast<To>(std::declval<From>())) convert(From&& x)
{
  return static_cast<To>(std::forward<From>(x));
}

// std::declval()は実際に評価してはいけない
/*
template <class T>
T f() { return std::declval<T>(); }

void g()
{
  int x = f<int>(); // エラー！
}
*/

int main()
{
  int x = 3;
  double d = convert<double>(x);

  std::cout << d << std::endl;
}
```
* std::declval[color ff0000]
* std::forward[link forward.md]

### 出力
```
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0


## 参照
- [LWG Issue 1255. `declval` should be added to the library](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#1255)
- [N3276 US22/DE9 Revisited: Decltype and Call Expressions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2011/n3276.pdf)

