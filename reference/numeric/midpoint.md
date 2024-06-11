# midpoint
* numeric[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr T midpoint(T a, T b) noexcept; // (1)

  template <class T>
  constexpr T* midpoint(T* a, T* b);       // (2)
}
```

## 概要
二点間の中点を求める。

- (1) : 数値型の中点を求める
- (2) : ポインタ型の中点を求める

この関数は、単純に計算する場合は`(a + b) / 2`となるが、オーバーフローが起こりにくいよう計算式に工夫が入る。例として、整数の場合は`a + (b - a) / 2`、浮動小数点数の場合は`a/2 + b/2`のように計算できる (実際は負数や非正規化数などをさらに考慮することになる)。


## テンプレートパラメータ制約
- (1) : 型`T` が `bool` 以外の[算術型](/reference/type_traits/is_arithmetic.md)であること
- (2) : 型`T`はオブジェクト型であること


## 適格要件
- (2) : 型`T`は完全型であること


## 事前条件
- (2) : 期待することとして、`a`と`b`はそれぞれ、同じ配列`x`の`x[i]`と`x[j]`要素を指していること
    - 配列要素でないオブジェクトが与えられた場合は、単一要素をもつ配列に属するものとみなす


## 戻り値
- (1) : `a`と`b`を合計した値の1/2の数値を返す
    - 型`T`が整数型で合計値が奇数の場合、`a`側に丸められる
    - 型`T`が浮動小数点数型の場合、最大一回の[不正確 (inexact) 操作](/reference/cfenv/fe_inexact.md)が発生し、オーバーフローは起こらない
- (2) : `a`と`b`が同じ配列`x`の`x[i]`と`x[j]`を指しているとして、`x[i + (j - i) / 2]`を指すポインタを返す。除算の結果はゼロ方向に丸められる


## 例外
- (1) : 投げない


## 備考
- 浮動小数点数の文脈では、この関数の動作は平均値 (mean value) という名称を使用するが、それ以外の文脈では中点が使用される。汎用的な用途とするため、この関数の名前として中点 (midpoint) を採用している


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <numeric>

int main()
{
  // (1) 整数
  {
    int r1 = std::midpoint(1, 5);
    std::cout << "a : " << r1 << std::endl;

    // 奇数になるケース
    int r2 = std::midpoint(2, 7);
    std::cout << "b : " << r2 << std::endl;

    int r3 = std::midpoint(7, 2);
    std::cout << "c : " << r3 << std::endl;
  }

  // (2) 浮動小数点数
  {
    float r1 = std::midpoint(1.5f, 2.5f);
    std::cout << "d : " << r1 << std::endl;

    float r2 = std::midpoint(1.5f, 3.0f);
    std::cout << "e : " << r2 << std::endl;
  }

  // (3) ポインタ
  {
    int ar[] = {1, 2, 3};
    int* p1 = std::midpoint(ar, ar + 2); // &ar[1]が返る
    std::cout << "f : " << *p1 << std::endl;

    // 配列ではないオブジェクトへのポインタは、単一要素の配列として指定する
    int x = 4;
    int* p2 = std::midpoint(&x, &x + 1);
    std::cout << "g : " << *p2 << std::endl;
  }
}
```
* std::midpoint[color ff0000]

#### 出力
```
a : 3
b : 4
c : 5
d : 2
e : 2.25
f : 2
g : 4
```

### 2次元の二点間の中点を求める
```cpp example
#include <iostream>
#include <numeric>

// 2次元上の点を表す型
struct Point {
  float x, y;
};

// Point型用に中点を求める関数を定義する
Point midpoint(const Point& a, const Point& b) noexcept
{
  return Point{
    std::midpoint(a.x, b.x),
    std::midpoint(a.y, b.y)
  };
}

int main()
{
  const Point a{1.0f, 2.0f};
  const Point b{5.0f, 3.0f};

  // 点aと点bの中点を求める
  const Point p = midpoint(a, b);
  std::cout << '(' << p.x << ", " << p.y << ')' << std::endl;
}
```
* std::midpoint[color ff0000]

#### 出力
```
(3, 2.5)
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::lerp()`](/reference/cmath/lerp.md)


## 参照
- [P0811R3 Well-behaved interpolation for numbers and pointers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0811r3.html)
- [LWG Issue 3200. `midpoint` should not constrain `T` is complete](https://cplusplus.github.io/LWG/lwg-active.html#3200)
