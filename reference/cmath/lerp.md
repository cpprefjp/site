# lerp
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  constexpr float lerp(float a, float b, float t);
  constexpr double lerp(double a, double b, double t);
  constexpr long double lerp(long double a, long double b, long double t);
}
```

## 概要
二点`a`と`b`の間を、時間`t`で線形補間する。

時間は 0.0 (0%) から 1.0 (100%) までの値を基本的には指定するが、1.0を超える指定も許可されている。

この関数を使用することによって、現在位置を少しずつ進めていくプログラミングスタイルから、現在位置と目標位置を最初に決めて現在の時間に対応する位置を求めるというプログラミングスタイルに考え方を変更できる。


## 戻り値
```cpp
return a + t * (b - a);
```

## 備考
- [`isfinite`](isfinite.md)`(a) &&` [`isfinite`](isfinite.md)`(b)`である場合、戻り値`r`は以下のようになる：
    - `t == 0`である場合、`r == a`
    - `t == 1`である場合、`r == b`
    - `t >= 0 && t <= 1`である場合、[`isfinite`](isfinite.md)`(r) != 0`
    - [`isfinite`](isfinite.md)`(t) && a == b`である場合、`r == a`
    - [`isfinite`](isfinite.md)`(t) || !`[`isnan`](isnan.md)`(t) && b - a != 0`である場合、`!`[`isnan`](isnan.md)`(r)`
- 比較関数`CMP(x, y)`を、`x > y`であれば1、`x < y`であれば-1、そうでなければ0を返すものであるとして、あらゆる時間値`t1`と`t2`について`CMP(lerp(a,b,t2), lerp(a,b,t1))`、`CMP(t2, t1)`、`CMP(b,a)`はいずれも非負となる


## 例
```cpp example
#include <iostream>
#include <cmath>

int main()
{
  // 開始点0.0から、目標点10.0まで、10% (時間0.1) ずつ値を進める
  float start = 0.0f;
  float target = 10.0f;

  float t = 0.0f;
  for (int i = 0; i <= 10; ++i) {
    float r = std::lerp(start, target, t);
    std::cout << r << std::endl;

    t += 0.1f;
  }
}
```
* std::lerp[color ff0000]

### 出力
```
0
1
2
3
4
5
6
7
8
9
10
```

## バージョン
### 言語
- C++20


### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::midpoint()`](/reference/numeric/midpoint.md.nolink)


## 参照
- [P0811R3 Well-behaved interpolation for numbers and pointers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0811r3.html)
