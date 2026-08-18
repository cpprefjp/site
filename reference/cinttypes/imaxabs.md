# imaxabs
* cinttypes[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  intmax_t imaxabs(intmax_t j);           // (1) C++11
  constexpr intmax_t imaxabs(intmax_t j); // (1) C++23

  intmax_t abs(intmax_t j);               // (2) C++11
  constexpr intmax_t abs(intmax_t j);     // (2) C++23
}
```
* intmax_t[link /reference/cstdint/intmax_t.md]

## 概要
最大幅の符号付き整数型 [`intmax_t`](/reference/cstdint/intmax_t.md) の絶対値を求める。imaxabs は integer maximum absolute value（最大幅整数の絶対値）の略。

- (1) : [`intmax_t`](/reference/cstdint/intmax_t.md)に対するオーバーロード。
- (2) : (1)と同じ機能を持つ、`abs`という名前のオーバーロード。


## 戻り値
引数 `j` の絶対値を返す。


## 備考
- (2) : このオーバーロードは、[`intmax_t`](/reference/cstdint/intmax_t.md)が拡張整数型である場合にのみ宣言される。（[`intmax_t`](/reference/cstdint/intmax_t.md)が`long`や`long long`のような標準の整数型である場合、[`<cstdlib>`](/reference/cstdlib.md)の`abs`のオーバーロードと重複するため宣言されない。）
- `j`の絶対値が[`intmax_t`](/reference/cstdint/intmax_t.md)で表現できない場合、動作は未定義である。
- 一般的な2の補数表現のシステムにおいて、[`intmax_t`](/reference/cstdint/intmax_t.md)の最小値の絶対値は、表現できる最大値よりも1大きくなってしまうため、この未定義動作に該当する。


## 例
```cpp example
#include <iostream>
#include <cinttypes>

int main()
{
  std::intmax_t x = std::imaxabs(-1234);
  std::cout << x << std::endl;
}
```
* std::imaxabs[color ff0000]

### 出力
```
1234
```


## バージョン
### 言語
- C++11


## 関連項目
- [`imaxdiv`](imaxdiv.md)
- [`abs - <cstdlib>`](/reference/cstdlib/abs.md)


## 参照
- [N1568 Proposed additions to TR-1 to improve compatibility with C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1568.htm)
- [LWG Issue 3834. Missing `constexpr` for `std::intmax_t` math functions in `<cinttypes>`](https://cplusplus.github.io/LWG/issue3834)
    - C++23で、P0533R9が`<cmath>`・`<cstdlib>`を`constexpr`化した際に漏れていた`imaxabs`（および`abs`のオーバーロード）が`constexpr`化された
