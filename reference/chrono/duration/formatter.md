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

フォーマットフラグとしては、以下を使用できる：

| フォーマットフラグ | 説明 |
|--------------------|------|
| `%j` | [`days`](/reference/chrono/duration_aliases.md)の10進数値として0埋めなしで書式化される |
| `%q` | `duration`単位ごとのサフィックス。`duration`の`operator<<`で出力されるサフィックスと等価 |
| `%Q` | `duration`の数値。`.count()`で取得した値 |
| `%S` | 2桁0埋めの秒 |
| `%M` | 2桁0埋めの分 |
| `%H` | 24時間時計での2桁0埋めの時 |
| `%I` | 12時間時計での2桁0埋めの時 |
| `%p` | 12時間時計でのロケール依存の午前・午後の表現 |

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

  // 単位ごとのサフィックス
  std::cout << std::format("{:%q}", chrono::seconds{3}) << std::endl;

  // duration::count()で取得した値
  std::cout << std::format("{:%Q}", chrono::seconds{3}) << std::endl;

  // フォーマットフラグを使用した場合、サフィックスは出力されない
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
s
3
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
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [chronoの`std::format()`](/reference/chrono/format.md) (フォーマットの詳細)


## 参照
- [LWG Issue 3270. Parsing and formatting `%j` with `duration`s](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3270)
