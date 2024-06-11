# operator+
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month operator+(const year_month& ym, const months& dm) noexcept; // (1) C++20
  constexpr year_month operator+(const months& dm, const year_month& ym) noexcept; // (2) C++20

  constexpr year_month operator+(const year_month& ym, const years& dy) noexcept;  // (3) C++20
  constexpr year_month operator+(const years& dy, const year_month& ym) noexcept;  // (4) C++20
}
```

## 概要
`year_month`の加算を行う。

- (1) : `year_month`に月の時間間隔を加算する
- (2) : 月の時間間隔に`year_month`を加算する
- (3) : `year_month`に年の時間間隔を加算する
- (4) : 年の時間間隔に`year_month`を加算する


## テンプレートパラメータ制約
- (1), (2) : [`months`](/reference/chrono/duration_aliases.md)パラメータに指定した引数が[`years`](/reference/chrono/duration_aliases.md)に変換可能である場合、[`years`](/reference/chrono/duration_aliases.md)への暗黙変換は、[`months`](/reference/chrono/duration_aliases.md)への暗黙変換よりも劣る


## 戻り値
- (1) : 以下の式が`true`となる`year_month`オブジェクト`z`を返す
    ```cpp
    z.ok() && z - ym == dm;
    ```
    * z.ok()[link ok.md]


- (2) :
    ```cpp
    return ym + dm;
    ```

- (3) :
    ```cpp
    return (ym.year() + dy) / ym.month();
    ```
    * ym.year()[link year.md]
    * ym.month()[link month.md]

- (4) :
    ```cpp
    return ym + dy;
    ```


## 計算量
- (1) : `dm`の値に関してO(1)


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  assert(2020y/3 + chrono::months{1} == 2020y/4);
  assert(2020y/3 + chrono::years{1} == 2021y/3);
}
```
* 2020y[link /reference/chrono/year/op_y.md]
* 2021y[link /reference/chrono/year/op_y.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [LWG Issue 3221. Result of `year_month` arithmetic with `months` is ambiguous](https://wg21.cmeerw.net/lwg/issue3221)
- [LWG Issue 3260. `year_month*` arithmetic rejects durations convertible to `years`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3260)
