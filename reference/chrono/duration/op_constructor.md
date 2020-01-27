# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* duration[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
constexpr duration() = default;                       // (1)

template <class Rep2>
constexpr explicit duration(const Rep2& r);           // (2)

template <class Rep2, class Period2>
constexpr duration(const duration<Rep2, Period2>& d); // (3)

duration(const duration&) = default;                  // (4)
```

## 概要
- (1) : デフォルトコンストラクタ。
- (2) : `rep`型に変換可能な型の値から`duration`を構築する。
- (3) : 他のテンプレートパラメータを持つ`duration`から`duration`を構築する。
- (4) : コピーコンストラクタ


## 備考
- (2) : [`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<rep>::value == true`もしくは[`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<Rep2>::value == false`の場合にオーバー�ード解決される。
- (3) : この関数は、以下の条件を満たす場合にオーバー�ード解決される。
    - C++11 : [`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<rep>::value == true`
    - C++14 : 単位変換の結果としてオーバーフ�ーせず、[`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<rep>::value == true`
    - もしくは、[`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<rep>::value == false`かつ[`ratio_divide`](/reference/ratio/ratio_divide.md)`<Period2, period>::type::den == 1`
    - これらの要求は、整数ベースの`duration`型間での変換の際に、暗黙に切り捨て誤差が起きるのを防ぐ。浮動小数点数型ベースの場合には、精度が下がれば小数点以下の数値になるだけなので問題ない。


### 例
```cpp example
#include <iostream>
#include <chrono>

using std::chrono::duration;

int main()
{
  duration<int, std::milli> d1;        // デフォルト構築 d1.count()は未初期化の値
  duration<int, std::milli> d2 {};     // デフォルト構築 d1.count()の値は0

  duration<int, std::milli> d3(3);     // 値を指定して構築(ミリ秒)
  duration<int, std::micro> d4 = d3;   // ミリ秒からマイク�秒に変換

  duration<int, std::micro> d5 = d4;   // コピー

  std::cout << "d2 : " << d2.count() << std::endl;
  std::cout << "d3 : " << d3.count() << std::endl;
  std::cout << "d4 : " << d4.count() << std::endl;
  std::cout << "d5 : " << d5.count() << std::endl;
}
```
* std::milli[link /reference/ratio/si_prefix.md]
* std::micro[link /reference/ratio/si_prefix.md]
* count()[link count.md]

### 出力
```
d2 : 0
d3 : 3
d4 : 3000
d5 : 3000
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.4.7
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 参照
- [LWG Issue 2094. `duration` conversion overflow shouldn't participate in overload resolution](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2094)
- [`std::chrono::duration` construction - ISO C++ Standard - Discussion](https://groups.google.com/a/isocpp.org/forum/#!topic/std-discussion/OcGX7Yj3meI)

