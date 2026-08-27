# addressof
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  T* addressof(T& r) noexcept;                 // (1) C++11

  template <class T>
  constexpr T* addressof(T& r) noexcept;       // (1) C++17

  template <class T>
  const T* addressof(const T&& elem) = delete; // (2) C++17
}
```

## 概要
変数のアドレスを必ず取得する。

`operator&()` をオーバーロードしたクラスであっても、正しくそのオブジェクトのアドレスが欲しいという要求がある。

`addressof()`関数は、`operator&()` がオーバーロードされていても、変数のアドレスを取得できる。


## 戻り値
`r`が参照するオブジェクトまたは関数の実際のアドレスを返す。`operator&()`がオーバーロードされている場合でも、そのオーバーロードは使用されない。


## 例外
投げない


## 備考
- (2) : このオーバーロードは、`addressof<const int>(0)`のような明示的型指定によって一時オブジェクトのアドレス取得ができてしまう問題を回避するためのもの


## 例
```cpp example
#include <memory>
#include <iostream>

struct useless_type {};

// operator&がオーバーロードされたクラス
class nonaddressable {
public:
  useless_type operator&() const { return useless_type(); }
};

int main()
{
  {
    int x = 3;
    int* p1 = std::addressof(x); // OK : アドレス取得できる
    int* p2 = &x; // OK : アドレス取得できる
  }
  {
    nonaddressable x;
    nonaddressable* p1 = std::addressof(x); // OK : アドレス取得できる
//  nonaddressable* p2 = &x; // エラー！アドレス取得できない
  }
}
```
* std::addressof[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]
    - 2012はマニュアル（MSDNライブラリ）に記載がないものの、実装されている。

## 参照
- [`boost::addressof()` - Boost C++ Libraries](http://www.boost.org/doc/libs/release/libs/utility/utility.htm#addressof)
- [LWG Issue 970. `addressof` overload unneeded](https://cplusplus.github.io/LWG/issue970)
    - C++11で、右辺値参照を受け取るオーバーロードが削除された。一時オブジェクトのアドレスを取得する用途がないため
- [LWG Issue 999. Taking the address of a function](https://cplusplus.github.io/LWG/issue999)
    - C++11で、関数のアドレスも取得できることが明記された
- [LWG Issue 2296. `std::addressof` should be `constexpr`](https://wg21.cmeerw.net/lwg/issue2296)
- [LWG Issue 2598. `addressof` works on temporaries](https://wg21.cmeerw.net/lwg/issue2598)
