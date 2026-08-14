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


## テンプレートパラメータ制約
- (2) :
    - C++20 : [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const Rep2&, rep> == true`であること
    - [`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<rep>::value == true`もしくは[`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<Rep2>::value == false`であること
- (3) :
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const Rep2&, rep> == true`であること
    - [`ratio_divide`](/reference/ratio/ratio_divide.md)`<typename Period2::type, period>`が有効な`ratio`の特殊化であること
    - 次のいずれかを満たすこと：
        - [`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<rep>::value == true`である
        - もしくは、[`ratio_divide`](/reference/ratio/ratio_divide.md)`<Period2, period>::den == 1`かつ[`treat_as_floating_point`](/reference/chrono/treat_as_floating_point.md)`<Rep2>::value == false`である
    - これらの要求は、整数ベースの`duration`型間での変換の際に、暗黙に切り捨て誤差が起きるのを防ぐ。浮動小数点数型ベースの場合には、精度が下がれば小数点以下の数値になるだけなので問題ない。


### 例
```cpp example
#include <iostream>
#include <chrono>

using std::chrono::duration;

int main()
{
  duration<int, std::milli> d1;        // デフォルト構築 d1.count()は未初期化の値
  duration<int, std::milli> d2 {};     // デフォルト構築 d2.count()の値は0

  duration<int, std::milli> d3(3);     // 値を指定して構築(ミリ秒)
  duration<int, std::micro> d4 = d3;   // ミリ秒からマイクロ秒に変換

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
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [`std::chrono::duration` construction - ISO C++ Standard - Discussion](https://groups.google.com/a/isocpp.org/forum/#!topic/std-discussion/OcGX7Yj3meI)
- [P2117R0 C++ Standard Library Issues Resolved Directly In Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html)
- [LWG Issue 2094. `duration` conversion overflow shouldn't participate in overload resolution](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2094)
- [LWG Issue 3090. What is §[time.duration.cons]p4's "no overflow is induced in the conversion" intended to mean?](https://cplusplus.github.io/LWG/issue3090)
    - (3)のテンプレートパラメータ制約から意味の不明確だった「変換でオーバーフローが生じないこと」という表現が削除され、代わりに`is_convertible_v<const Rep2&, rep>`が`true`であることと`ratio_divide<typename Period2::type, period>`が有効な`ratio`の特殊化であることが明示された。この整理はC++26で規定されたが、実装は元々この意図どおりに制約していたため挙動は変わらない
