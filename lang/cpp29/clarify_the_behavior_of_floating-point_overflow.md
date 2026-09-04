# 浮動小数点演算のオーバーフローと無限大・NaNの扱いを明確化 [P3899R3]
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26までの規格では、浮動小数点演算がオーバーフローした場合の動作が不明確だった。「式の評価において、結果が数学的に定義されないか、その型で表現可能な値の範囲にない場合、動作は未定義」という規定の解釈が定まらず、`FLT_MAX * 2`のようなオーバーフローや、`infinity() + 1`のような無限大の伝播が未定義動作かどうか、委員会内でも見解が一致していなかった。

C++29では、この動作が次のように明確化される。

- 実行時の動作:
    - 無限大やNaNを表現できる浮動小数点型（ISO/IEC 60559 (IEEE 754) に準拠する型）では、オーバーフローは未定義動作ではなく、無限大を生成する。無限大やNaNをオペランドとする演算（伝播）も定義された動作である
    - 0による除算は、引き続き未定義動作である
    - 無限大もNaNも表現できない型では、結果を表現できない演算は引き続き未定義動作である
- 定数式での扱い:
    - 有限のオペランドから有限でない結果が生じる演算（オーバーフロー）、シグナルNaNをオペランドとする演算、NaNでないオペランドからNaNが生じる演算（`無限大 * 0`など）は、定数式にならない
    - 無限大・静かなNaN (quiet NaN) の伝播、アンダーフロー、静かなNaNとの比較は、定数式として扱える


## 仕様
- 全てのオペランドが（変換された結果として）算術型である、単項の`+`／`-`、加算、減算、乗算・除算・剰余の式を、算術式と定義する
- 算術式の評価は、数学的な結果が「その型で表現可能な値の範囲」になく、かつその型の値である負の無限大・正の無限大・NaNのいずれでもない場合に限り、動作は未定義である
    - ISO/IEC 60559に準拠する型がオペランドであれば、算術式のうち未定義動作であるのは0による除算のみである
- 定数式の規定には、以下のいずれかにあたる算術式は定数式にならないという規則が追加される
    - 全てのオペランドが有限で、結果が有限ではない
    - いずれかのオペランドがシグナルNaNである
    - どのオペランドもNaNではなく、結果がNaNである
- あわせて、「表現可能な値の範囲」の注記に、無限大とNaNは範囲に含まれないことが補足され、浮動小数点数リテラルの丸めの規定も表現可能な値の範囲と整合する文言へ修正される

規格の例（`std::float32_t`がISO/IEC 60559のbinary32として動作する場合）:

```cpp
constexpr std::float32_t min = std::numeric_limits<std::float32_t>::min();          // OK
constexpr std::float32_t max = std::numeric_limits<std::float32_t>::max();          // OK
constexpr std::float32_t inf = std::numeric_limits<std::float32_t>::infinity();     // OK
constexpr std::float32_t nan = std::numeric_limits<std::float32_t>::quiet_NaN();    // OK

constexpr std::float32_t inf2 = inf * 2;    // OK: 無限大の伝播
constexpr std::float32_t zero = min / max;  // OK: 結果を表現できず、0へ丸められる（アンダーフロー）
constexpr std::float32_t oflo = max * 2;    // エラー: オペランドは有限だが結果が有限ではない
constexpr std::float32_t nan2 = nan * 2;    // OK: NaNの伝播
constexpr std::float32_t udef = inf * 0;    // エラー: どのオペランドもNaNではないのに結果がNaN
constexpr std::float32_t div0 = max / 0;    // エラー: 0による除算の動作は未定義
```
* std::float32_t[link /reference/stdfloat/float32_t.md]
* infinity()[link /reference/limits/numeric_limits/infinity.md]
* quiet_NaN()[link /reference/limits/numeric_limits/quiet_nan.md]
* min()[link /reference/limits/numeric_limits/min.md]
* max()[link /reference/limits/numeric_limits/max.md]


## 例
```cpp example
#include <iostream>
#include <limits>

int main()
{
  using L = std::numeric_limits<float>;

  // 無限大を表現できる型では、オーバーフローは未定義動作ではなく無限大を生成する
  float f = L::max();
  std::cout << f * 2 << std::endl;

  // 無限大・NaNの伝播は定数式として扱える
  constexpr float inf2 = L::infinity() * 2;
  constexpr float nan2 = L::quiet_NaN() * 2;
  std::cout << inf2 << std::endl;
  std::cout << nan2 << std::endl;

  // オーバーフローする演算は、動作は定義されているが定数式にはならない
  // constexpr float oflo = L::max() * 2; // コンパイルエラー！
}
```
* L::infinity()[link /reference/limits/numeric_limits/infinity.md]
* L::quiet_NaN()[link /reference/limits/numeric_limits/quiet_nan.md]
* L::max()[link /reference/limits/numeric_limits/max.md]

### 出力
```
inf
inf
nan
```


## この機能が必要になった背景・経緯
オーバーフローを未定義動作とする従来の規定は、「数学的に定義される」「表現可能な値の範囲」という用語の定義がないか曖昧であり、複数の解釈が成立してしまっていた。表現可能な値の範囲の定義を追加したCWG 2723の解決は、「無限大を生成する算術演算は定数式として許可しない」という2016年のSG6の指針（CWG 2168）とも矛盾しており、コンパイラ間でも定数式の扱いが分かれていた。

そこでC++29では、部分的な修正ではなく設計を定めたうえで規定が書き直された。採用された設計は、`constexpr`化された[`<cmath>`](/reference/cmath.md)の関数の扱い（範囲エラーを起こす呼び出しは定数式にならず、無限大やNaNの伝播は定数式になる）と一貫しており、実行時の動作は無限大・NaNをサポートする既存の処理系の動作と一致する。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [`std::numeric_limits::infinity()`](/reference/limits/numeric_limits/infinity.md)
- [`std::numeric_limits::quiet_NaN()`](/reference/limits/numeric_limits/quiet_nan.md)
- [`<cmath>`](/reference/cmath.md)


## 参照
- [P3899R3 Clarify the behavior of floating-point overflow](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3899r3.html)
- [CWG Issue 2168. Narrowing conversions and +/- infinity](https://cplusplus.github.io/CWG/issues/2168.html)
    - 無限大を生成する算術演算を定数式として許可しないというSG6の指針が記録されたIssue
- [CWG Issue 2723. Range of representable values for floating-point types](https://cplusplus.github.io/CWG/issues/2723.html)
    - C++26で「表現可能な値の範囲」の定義が追加されたが、上記の指針と矛盾していた
