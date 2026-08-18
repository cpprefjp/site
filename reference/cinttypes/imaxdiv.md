# imaxdiv
* cinttypes[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  imaxdiv_t
    imaxdiv(intmax_t numer,
            intmax_t denom);  // (1) C++11
  constexpr imaxdiv_t
    imaxdiv(intmax_t numer,
            intmax_t denom);  // (1) C++23

  imaxdiv_t
    div(intmax_t numer,
        intmax_t denom);      // (2) C++11
  constexpr imaxdiv_t
    div(intmax_t numer,
        intmax_t denom);      // (2) C++23
}
```
* imaxdiv_t[link imaxdiv_t.md]
* intmax_t[link /reference/cstdint/intmax_t.md]

## 概要
最大幅の符号付き整数型 [`intmax_t`](/reference/cstdint/intmax_t.md) に対して、`numer / denom`と`numer % denom`の計算をひとつの操作で行う。imaxdiv は integer maximum division（最大幅整数の除算）の略。

- (1) : [`intmax_t`](/reference/cstdint/intmax_t.md)に対するオーバーロード。
- (2) : (1)と同じ機能を持つ、`div`という名前のオーバーロード。


## 戻り値
[`imaxdiv_t`](imaxdiv_t.md)型オブジェクトの`quot`に商、`rem`に剰余を代入して返す。

結果のどちらかが[`intmax_t`](/reference/cstdint/intmax_t.md)で表現できない場合、動作は未定義である。


## 備考
- (2) : このオーバーロードは、[`intmax_t`](/reference/cstdint/intmax_t.md)が拡張整数型である場合にのみ宣言される。（[`intmax_t`](/reference/cstdint/intmax_t.md)が`long`や`long long`のような標準の整数型である場合、[`<cstdlib>`](/reference/cstdlib.md)の`div`のオーバーロードと重複するため宣言されない。）


## 例
```cpp example
#include <iostream>
#include <cinttypes>

int main()
{
  std::imaxdiv_t x = std::imaxdiv(17, 5);
  std::cout << x.quot << std::endl;
  std::cout << x.rem << std::endl;
}
```
* std::imaxdiv[color ff0000]
* std::imaxdiv_t[link imaxdiv_t.md]

### 出力
```
3
2
```


## バージョン
### 言語
- C++11


## 関連項目
- [`imaxabs`](imaxabs.md)
- [`imaxdiv_t`](imaxdiv_t.md)
- [`div - <cstdlib>`](/reference/cstdlib/div.md)


## 参照
- [N1568 Proposed additions to TR-1 to improve compatibility with C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1568.htm)
- [LWG Issue 3834. Missing `constexpr` for `std::intmax_t` math functions in `<cinttypes>`](https://cplusplus.github.io/LWG/issue3834)
    - C++23で、P0533R9が`<cmath>`・`<cstdlib>`を`constexpr`化した際に漏れていた`imaxdiv`（および`div`のオーバーロード）が`constexpr`化された
