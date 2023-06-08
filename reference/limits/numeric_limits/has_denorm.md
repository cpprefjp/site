# has_denorm
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]
* cpp23deprecated[meta cpp]

```cpp
static const float_denorm_style has_denorm;     // (1) C++03
static constexpr float_denorm_style has_denorm; // (1) C++11
```
* float_denorm_style[link /reference/limits/float_denorm_style.md]

この機能は、C++23で非推奨となった。


## 概要
浮動小数点数型において、型`T`の非正規化数(Denormal Number)のサポート状況を判定する。

| 値                                                      | 非正規化数のサポート状況 |
|---------------------------------------------------------|--------------------------|
| [`std::denorm_indeterminate`](../float_denorm_style.md) | 許可するか判定できない   |
| [`std::denorm_absent`](../float_denorm_style.md)        | 許可しない               |
| [`std::denorm_present`](../float_denorm_style.md)       | 許可する                 |

対応するマクロを次の表に挙げる。

| 型            | 対応するマクロ |
|---------------|----------------|
| `float`       | [`FLT_HAS_SUBNORM`](/reference/cfloat/flt_has_subnorm.md)  |
| `double`      | [`DBL_HAS_SUBNORM`](/reference/cfloat/dbl_has_subnorm.md)  |
| `long double` | [`LDBL_HAS_SUBNORM`](/reference/cfloat/ldbl_has_subnorm.md) |


## 非推奨・削除の詳細
C言語側で対応するマクロ`*_HAS_SUBNORM`が廃止されたため、C++側でも非推奨とする。

この機能はコンパイル時定数として非正規化数のサポート状況を取得するものであった。しかし、これには以下のような問題があった：

- ハードウェアによっては非正規化数をサポートしていない場合があり、その場合はソフトウェアエミュレーションによってサポートされている場合がある。この場合、同じ系統のハードウェアであっても将来のバージョンでサポートされる可能性があり、このときにABI破壊を回避しようとすると[`std::denorm_indeterminate`](../float_denorm_style.md)を常に使用せざるを得なくなってしまう
- ハードウェアサポートがある場合でも、実行時のフラグ切り替えによって非正規化数をゼロにフラッシュするように設定することが可能であり、非正規化数のサポート状況は必ずしもコンパイル時に確定するプロパティではない場合がある

これらの理由から、この機能は有用なものではなく、最悪勘違いして使用される危険性があるため、非推奨とする。


## 例
```cpp example
#include <iostream>
#include <limits>
#include <stdexcept>
#include <string>

std::string denorm_string(std::float_denorm_style e)
{
  switch (e) {
    case std::denorm_indeterminate: return "indeterminate";
    case std::denorm_absent:        return "absent";
    case std::denorm_present:       return "present";
  }
  throw std::invalid_argument("not support value");
}

int main()
{
  constexpr std::float_denorm_style a = std::numeric_limits<int>::has_denorm;
  constexpr std::float_denorm_style b = std::numeric_limits<float>::has_denorm;
  constexpr std::float_denorm_style c = std::numeric_limits<double>::has_denorm;

  std::cout << std::boolalpha;
  std::cout << "int : " << denorm_string(a) << std::endl;
  std::cout << "float : " << denorm_string(b) << std::endl;
  std::cout << "double : " << denorm_string(c) << std::endl;
}
```
* has_denorm[color ff0000]
* std::float_denorm_style[link /reference/limits/float_denorm_style.md]
* std::invalid_argument[link /reference/stdexcept.md]

### 出力例
```
int : absent
float : present
double : present
```


## 参照
- [P2614R2 Deprecate `numeric_limits::has_denorm`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2614r2.pdf)
