# div
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  div_t
    div(int numer,
        int denom);         // (1) C++03
  constexpr div_t
    div(int numer,
        int denom);         // (1) C++23

  ldiv_t
    div(long numer,
        long denom);        // (2) C++03
  constexpr ldiv_t
    div(long numer,
        long denom);        // (2) C++23

  lldiv_t
    div(long long numer,
        long long denom);   // (3) C++03
  constexpr lldiv_t
    div(long long numer,
        long long denom);   // (3) C++23

  ldiv_t
    ldiv(long numer,
         long denom);       // (4) C++03
  constexpr ldiv_t
    ldiv(long numer,
         long denom);       // (4) C++23

  lldiv_t
    lldiv(long long numer,
          long long denom); // (5) C++11
  constexpr lldiv_t
    lldiv(long long numer,
          long long denom); // (5) C++23
}
```
* div_t[link div_t.md]
* ldiv_t[link ldiv_t.md]
* lldiv_t[link lldiv_t.md]

## 概要
`numer / denom`と`numer % denom`の計算をひとつの操作で行う。

- (1) : `int`型のオーバーロード
- (2) : `long`型のオーバーロード
- (3) : `long long`型のオーバーロード
- (4) : `long`型規定
- (5) : `long long`型規定


## 戻り値
戻り値型となるクラスの`quot`に商、`rem`に剰余を代入して返す。

結果のどちらかが表現できない場合は未定義動作を引き起こす。


## 例
```cpp example
#include <iostream>
#include <cstdlib>

int main()
{
  std::div_t x = std::div(5, 2);
  std::cout << x.quot << std::endl;
  std::cout << x.rem << std::endl;
}
```
* std::div[color ff0000]
* std::div_t[link div_t.md]

### 出力
```
2
1
```


### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上


## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
