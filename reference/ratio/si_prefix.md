# SI接�辞
* ratio[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using yocto = ratio<1, 1000000000000000000000000>;
  using zepto = ratio<1,    1000000000000000000000>;
  using atto  = ratio<1,       1000000000000000000>;
  using femto = ratio<1,          1000000000000000>;
  using pico  = ratio<1,             1000000000000>;
  using nano  = ratio<1,                1000000000>;
  using micro = ratio<1,                   1000000>;
  using milli = ratio<1,                      1000>;
  using centi = ratio<1,                       100>;
  using deci  = ratio<1,                        10>;
  using deca  = ratio<                       10, 1>;
  using hecto = ratio<                      100, 1>;
  using kilo  = ratio<                     1000, 1>;
  using mega  = ratio<                  1000000, 1>;
  using giga  = ratio<               1000000000, 1>;
  using tera  = ratio<            1000000000000, 1>;
  using peta  = ratio<         1000000000000000, 1>;
  using exa   = ratio<      1000000000000000000, 1>;
  using zetta = ratio<   1000000000000000000000, 1>;
  using yotta = ratio<1000000000000000000000000, 1>;
}
```
* ratio[link ratio.md]

## 概要
これらは、コンパイル時有理数である[`ratio`](ratio.md)を利用した、SI単位系(The International System of Units : 国際単位系)の接�辞を表す型である。

| 型      | 説明     |
|---------|----------|
| `yocto` | ヨクト   |
| `zepto` | ゼプト   |
| `atto`  | アト     |
| `femto` | フェムト |
| `pico`  | ピコ     |
| `nano`  | ナノ     |
| `micro` | マイク� |
| `milli` | ミリ     |
| `centi` | センチ   |
| `deci`  | デシ     |
| `deca`  | デカ     |
| `hecto` | ヘクト   |
| `kilo`  | ��     |
| `mega`  | メガ     |
| `giga`  | ギガ     |
| `tera`  | テラ     |
| `peta`  | ペタ     |
| `exa`   | エクサ   |
| `zetta` | ゼタ     |
| `yotta` | ヨタ     |


## 備考
`yocto`、`zepto`、`zetta`、`yotta`は、[`intmax_t`](/reference/cstdint/intmax_t.md)型で値を表現できる場合のみ定義され、表現できない場合は定義されない。


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
  milli_meter base(3000); // 3000mm -> 3cm
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
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.4.7
- [Visual C++](/implementation.md#visual_cpp): ??


