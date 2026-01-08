# SI接頭辞
* ratio[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]
* quecto,ronto,yocto,zepto,atto,femto,pico,nano,micro,milli,centi,deci,deca,hecto,kilo,mega,giga,tera,peta,exa,zetta,yotta,ronna,quetta[meta alias]

```cpp
namespace std {
  using quecto = ratio<1, 1000000000000000000000000000000>; // C++26
  using ronto  = ratio<1,    1000000000000000000000000000>; // C++26
  using yocto  = ratio<1,       1000000000000000000000000>;
  using zepto  = ratio<1,          1000000000000000000000>;
  using atto   = ratio<1,             1000000000000000000>;
  using femto  = ratio<1,                1000000000000000>;
  using pico   = ratio<1,                   1000000000000>;
  using nano   = ratio<1,                      1000000000>;
  using micro  = ratio<1,                         1000000>;
  using milli  = ratio<1,                            1000>;
  using centi  = ratio<1,                             100>;
  using deci   = ratio<1,                              10>;
  using deca   = ratio<                             10, 1>;
  using hecto  = ratio<                            100, 1>;
  using kilo   = ratio<                           1000, 1>;
  using mega   = ratio<                        1000000, 1>;
  using giga   = ratio<                     1000000000, 1>;
  using tera   = ratio<                  1000000000000, 1>;
  using peta   = ratio<               1000000000000000, 1>;
  using exa    = ratio<            1000000000000000000, 1>;
  using zetta  = ratio<         1000000000000000000000, 1>;
  using yotta  = ratio<      1000000000000000000000000, 1>;
  using ronna  = ratio<   1000000000000000000000000000, 1>; // C++26
  using quetta = ratio<1000000000000000000000000000000, 1>; // C++26
}
```
* ratio[link ratio.md]

## 概要
これらは、コンパイル時有理数である[`ratio`](ratio.md)を利用した、SI単位系(The International System of Units : 国際単位系)の接頭辞を表す型である。

| 型      | 説明     | 10の冪 |
|---------|----------|------|
| `quecto` | クエクト | -30 |
| `ronto` | ロント   | -27 |
| `yocto` | ヨクト   | -24 |
| `zepto` | ゼプト   | -21 |
| `atto`  | アト     | -18 |
| `femto` | フェムト | -15 |
| `pico`  | ピコ     | -12 |
| `nano`  | ナノ     | - 9 |
| `micro` | マイクロ |  -6 |
| `milli` | ミリ     |  -3 |
| `centi` | センチ   |  -2 |
| `deci`  | デシ     |  -1 |
| `deca`  | デカ     |   1 |
| `hecto` | ヘクト   |   2 |
| `kilo`  | キロ     |   3 |
| `mega`  | メガ     |   6 |
| `giga`  | ギガ     |   9 |
| `tera`  | テラ     |  12 |
| `peta`  | ペタ     |  15 |
| `exa`   | エクサ   |  18 |
| `zetta` | ゼタ     |  21 |
| `yotta` | ヨタ     |  24 |
| `ronna` | ロナ     |  27 |
| `quetta` | クエタ  |  30 |


## 備考
`quecto`, `ronto`, `yocto`、`zepto`、`zetta`、`yotta`, `ronna`, `quetta`は、[`intmax_t`](/reference/cstdint/intmax_t.md)型で値を表現できる場合のみ定義され、表現できない場合は定義されない。


## 例
```cpp example
#include <iostream>
#include <ratio>
#include <chrono>

// ミリメートル、センチメートル、メートル
using milli_meter = std::chrono::duration<float, std::milli>;
using centi_meter = std::chrono::duration<float, std::centi>;
using meter       = std::chrono::duration<float, std::ratio<1>>;

// 三角形の面積
// base : 底辺
// height : 高さ
centi_meter triangle_area(centi_meter base, centi_meter height)
{
  return base * height.count() / centi_meter::rep(2.0);
}

int main()
{
  milli_meter base(3000); // 3000mm -> 300cm
  meter       height(1);  // 1m -> 100cm

  centi_meter area = triangle_area(base, height);

  std::cout << area.count() << std::endl;
}
```
* std::milli[color ff0000]
* std::centi[color ff0000]
* std::ratio[link ratio.md]
* area.count()[link /reference/chrono/duration/count.md]

### 出力
```
15000
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
`std::intmax_t`型が64bit幅の処理系では、SI接頭辞`quecto`～`zepto`、`zetta`～`quetta`を表現できないため、これらの型別名は定義されない。


## 参照
- [P2734R0 Adding the new SI prefixes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2734r0.pdf)
