#コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* duration[meta class]
* function[meta id-type]

```cpp
constexpr duration() = default;                       // (1)

template <class Rep2>
constexpr explicit duration(const Rep2& r);           // (2)

template <class Rep2, class Period2>
constexpr duration(const duration<Rep2, Period2>& d); // (3)

duration(const duration&) = default;                  // (4)
```

##概要
- (1) : デフォルトコンストラクタ。
- (2) : `rep`型に変換可能な型の値から`duration`を構築する。
- (3) : 他のテンプレートパラメータを持つ`duration`から`duration`を構築する。
- (4) : コピーコンストラクタ


##備考
- (2) : [`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<rep>::value == true`もしくは[`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<Rep2>::value == false`の場合にオーバーロード解決される。
- (3) : この関数は、以下の条件を満たす場合にオーバーロード解決される。
    - C++11 : [`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<rep>::value == true`
    - C++14 : 単位変換の結果としてオーバーフローせず、[`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<rep>::value == true`
    - もしくは、[`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<rep>::value == false`かつ[`ratio_divide`](/reference/ratio/ratio_divide.md)`<Period2, period>::type::den == 1`
    - これらの要求は、整数ベースの`duration`型間での変換の際に、暗黙に切り捨て誤差が起きるのを防ぐ。浮動小数点数型ベースの場合には、精度が下がれば小数点以下の数値になるだけなので問題ない。


###例
```cpp
#include <iostream>
#include <chrono>

using std::chrono::duration;
using std::milli; using std::micro;

int main()
{
  duration<int, milli> d1;        // デフォルトコンストラクト

  duration<int, milli> d2(3);     // 値を指定して構築(ミリ秒)
  duration<int, micro> d3 = d2;   // ミリ秒からマイクロ秒に変換

  duration<int, micro> d4 = d3;   // コピー

  std::cout << d2.count() << std::endl;
  std::cout << d3.count() << std::endl;
  std::cout << d4.count() << std::endl;
}
```

###出力
```
3
3000
3000
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.7
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0

##参照
- [LWG Issue 2094. `duration` conversion overflow shouldn't participate in overload resolution](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2094)

