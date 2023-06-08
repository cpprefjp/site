# has_denorm_loss
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]
* cpp23deprecated[meta cpp]

```cpp
static const bool has_denorm_loss;     // (1) C++03
static constexpr bool has_denorm_loss; // (1) C++11
```

この機能は、C++23で非推奨となった。

## 概要
浮動小数点数型において、精度の損失が非正規化数によるものかを判定する。


## 非推奨・削除の詳細
非正規化数が使用されたことによって精度が低下した場合にそれを検出する次の2つの方法がIEEE754標準で指定されていた：

- 非正規化損失（Denormalization loss）
- 不正確な結果（Inexact result）

実際には1つ目の実装は存在しなかったため、現在のIEE754からは削除されており、2つ目の実装だけが存在している。この機能はこの2つのどちらがその環境の浮動小数点数型で実装されているかを示すものだったが、このような理由によりもはや意味がない状況となった。

また、この値は実装によってなぜか異なっている（MSVCだけが浮動小数点数型に対して`true`を返す）。

これらの理由から、この機能は有用なものではなく、最悪勘違いして使用される危険性があるため、非推奨とする。


## 例
```cpp example
#include <iostream>
#include <limits>

int main()
{
  constexpr bool a = std::numeric_limits<int>::has_denorm_loss;
  constexpr bool b = std::numeric_limits<float>::has_denorm_loss;
  constexpr bool c = std::numeric_limits<double>::has_denorm_loss;

  std::cout << std::boolalpha;
  std::cout << "int : " << a << std::endl;
  std::cout << "float : " << b << std::endl;
  std::cout << "double : " << c << std::endl;
}
```
* has_denorm_loss[color ff0000]

### 出力例
```
int : false
float : false
double : false
```


## 参照
- [P2614R2 Deprecate `numeric_limits::has_denorm`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2614r2.pdf)
