# lerp
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  constexpr float lerp(float a, float b, float t) noexcept;
  constexpr double lerp(double a, double b, double t) noexcept;
  constexpr long double lerp(long double a, long double b, long double t) noexcept;
}
```

## 概要
二点`a`と`b`の間を、時間`t`で線形補間 (**l**inear int**erp**olate) する。

時間は 0.0 (0%) から 1.0 (100%) までの値を基本的には指定するが、1.0を超える指定も許可されている。

この関数を使用することによって、現在位置を少しずつ進めていくプログラミングスタイルから、現在位置と目標位置を最初に決めて現在の時間に対応する位置を求めるというプログラミングスタイルに考え方を変更できる。


## 戻り値
```cpp
return a + t * (b - a);
```


## 例外
投げない


## 備考
- [`isfinite`](isfinite.md)`(a) &&` [`isfinite`](isfinite.md)`(b)`である場合、戻り値`r`は以下のようになる：
    - `t == 0`である場合、`r == a`
    - `t == 1`である場合、`r == b`
    - `t >= 0 && t <= 1`である場合、[`isfinite`](isfinite.md)`(r) != 0`
    - [`isfinite`](isfinite.md)`(t) && a == b`である場合、`r == a`
    - [`isfinite`](isfinite.md)`(t) || !`[`isnan`](isnan.md)`(t) && b - a != 0`である場合、`!`[`isnan`](isnan.md)`(r)`
- 比較関数`CMP(x, y)`を、`x > y`であれば1、`x < y`であれば-1、そうでなければ0を返すものであるとして、あらゆる時間値`t1`と`t2`について`CMP(lerp(a,b,t2), lerp(a,b,t1))`、`CMP(t2, t1)`、`CMP(b,a)`はいずれも非負となる


## 例
### 基本的な使い方
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

#### 出力
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

### 2次元上の二点間で線形補間する
```cpp example
#include <iostream>
#include <cmath>

// 2次元上の点を表す型
struct Point {
  float x, y;
};

// Point型用に線形補間の機能を定義する
Point lerp(const Point& a, const Point& b, float t)
{
  return Point{
    std::lerp(a.x, b.x, t),
    std::lerp(a.y, b.y, t)
  };
}

int main()
{
  const Point a{1.0f, 2.0f};
  const Point b{5.0f, 3.0f};

  // 点aから点bに向かって、10%ずつ位置を進める
  float t = 0.1f;
  for (int i = 0; i <= 10; ++i) {
    const Point p = lerp(a, b, t);
    std::cout << t << " : (" << p.x << ", " << p.y << ')' << std::endl;

    t += 0.1f;
  }
}
```
* std::lerp[color ff0000]

#### 出力
```
0.1 : (1.4, 2.1)
0.2 : (1.8, 2.2)
0.3 : (2.2, 2.3)
0.4 : (2.6, 2.4)
0.5 : (3, 2.5)
0.6 : (3.4, 2.6)
0.7 : (3.8, 2.7)
0.8 : (4.2, 2.8)
0.9 : (4.6, 2.9)
1 : (5, 3)
1.1 : (5.4, 3.1)
```

## バージョン
### 言語
- C++20


### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::midpoint()`](/reference/numeric/midpoint.md)


## 参照
- [P0811R3 Well-behaved interpolation for numbers and pointers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0811r3.html)
- [LWG Issue 3201. `lerp` should be marked as `noexcept`](https://cplusplus.github.io/LWG/lwg-active.html#3201)
