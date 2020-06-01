# formatter
* chrono[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Rep, class Period, class charT>
  struct formatter<chrono::duration<Rep, Period>, charT>;
}
```

## 概要
`duration`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。


## 備考
- `Rep`が浮動小数点数である場合のみ、フォーマットとして浮動小数点数の精度を指定でき、そうでない場合に指定すると[`std::format_error`](/reference/format/format_error.md)例外が送出される
- `duration`に対するフォーマットは深夜0時からの経過時間として扱われ、一日内の時間として出力される (例として`"%H"`, `"%I"`, `"%p"`など)


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;

int main()
{
  // デフォルトフォーマットは、operator<<で出力されるものと同じ
  std::cout << std::format("{}", chrono::seconds{3}) << std::endl;

  // フォーマット指定子を使用した場合、サフィックスは出力されない
  std::cout << std::format("seconds : {:%S}", chrono::seconds{3}) << std::endl;
  std::cout << std::format("minutes : {:%M}", chrono::minutes{3}) << std::endl;
  std::cout << std::format("24-hours : {:%H}", chrono::hours{15}) << std::endl;
  std::cout << std::format("12-hours : {:%I}", chrono::hours{15}) << std::endl;
  std::cout << std::format("AM/PM : {:%p %I:00}", chrono::hours{15}) << std::endl;
}
```
- std::format[link /reference/chrono/format.md]

### 出力
```
3s
seconds : 03
minutes : 03
24-hours : 15
12-hours : 03
AM/PM : PM 03:00
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)


## 関連項目
- [chronoの`std::format()`](/reference/chrono/format.md) (フォーマットの詳細)
