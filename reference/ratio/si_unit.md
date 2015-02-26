#SI単位 (C++11)
* ratio[meta header]
* std[meta namespace]

```cpp
namespace std {
  typedef ratio<1, 1000000000000000000000000> yocto;
  typedef ratio<1,    1000000000000000000000> zepto;
  typedef ratio<1,       1000000000000000000> atto;
  typedef ratio<1,          1000000000000000> femto;
  typedef ratio<1,             1000000000000> pico;
  typedef ratio<1,                1000000000> nano;
  typedef ratio<1,                   1000000> micro;
  typedef ratio<1,                      1000> milli;
  typedef ratio<1,                       100> centi;
  typedef ratio<1,                        10> deci;
  typedef ratio<                       10, 1> deca;
  typedef ratio<                      100, 1> hecto;
  typedef ratio<                     1000, 1> kilo;
  typedef ratio<                  1000000, 1> mega;
  typedef ratio<               1000000000, 1> giga;
  typedef ratio<            1000000000000, 1> tera;
  typedef ratio<         1000000000000000, 1> peta;
  typedef ratio<      1000000000000000000, 1> exa;
  typedef ratio<   1000000000000000000000, 1> zetta;
  typedef ratio<1000000000000000000000000, 1> yotta;
}
```
* ratio[link ./ratio.md]

##概要
これらは、コンパイル時有理数である[`ratio`](./ratio.md)を利用した、SI単位(The International System of Units : 国際単位系)を表す型である。

| 型      | 説明     |
|---------|----------|
| `yocto` | ヨクト   |
| `zepto` | ゼプト   |
| `atto`  | アト     |
| `femto` | フェムト |
| `pico`  | ピコ     |
| `nano`  | ナノ     |
| `micro` | マイクロ |
| `milli` | ミリ     |
| `centi` | センチ   |
| `deci`  | デシ     |
| `deca`  | デカ     |
| `hecto` | ヘクト   |
| `kilo`  | キロ     |
| `mega`  | メガ     |
| `giga`  | ギガ     |
| `tera`  | テラ     |
| `peta`  | ペタ     |
| `exa`   | エクサ   |
| `zetta` | ゼタ     |
| `yotta` | ヨタ     |


##備考
`yocto`、`zepto`、`zetta`、`yotta`は、[`intmax_t`](/reference/cstdint/intmax_t.md)型で値を表現できる場合のみ定義され、表現できない場合は定義されない。


##例
```cpp
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

###出力
```
15000
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.7
- [Visual C++](/implementation.md#visual_cpp): ??


