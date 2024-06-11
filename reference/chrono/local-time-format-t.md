# local-time-format-t
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class Duration>
  struct local-time-format-t {
    local_time<Duration> time;
    const string* abbrev;
    const seconds* offset_sec;
  };
}
```
* local_time[link local_time.md]
* string[link /reference/string/basic_string.md]

## 概要
`local-time-format-t`は、ローカル時間を文字列フォーマットするために必要な情報をまとめた説明用の型である。

ローカル時間をタイムゾーン付きで文字列フォーマットするには、時間点オブジェクトだけでなくタイムゾーンの情報が追加で必要になる。そのため、[`zoned_time`](zoned_time.md)クラスや、タイムゾーン情報をつけた[`local_time`](local_time.md)オブジェクトを文字列フォーマット対応するために、標準ライブラリの実装内部でこのようなクラスが用意される。

このクラスとメンバ変数は説明用のものであるため、実際にそのような具体的なクラス、具体的なメンバ変数が存在することを期待したプログラムを書くことはできない。


## 文字列フォーマット

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`formatter`](local-time-format-t/formatter.md) | [`std::formatter`](/reference/format/formatter.md)クラスの特殊化 | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;

int main()
{
  auto now = chrono::system_clock::now();
  chrono::sys_seconds now_sec = chrono::floor<chrono::seconds>(now); // 秒単位

  chrono::zoned_time zt{"Asia/Tokyo", now_sec};
  std::cout << std::format("{:%Y/%m/%d %H:%M:%S %Z}", zt) << std::endl;

  auto lt = zt.get_local_time();
  chrono::sys_info si = zt.get_info();
  {
    auto ltf = chrono::local_time_format(lt, &si.abbrev);
    std::cout << std::format("{:%Y/%m/%d %H:%M:%S %Z}", ltf) << std::endl;
  }
  {
    auto ltf = chrono::local_time_format(lt, "JST", &si.abbrev, &si.offset);
    std::cout << std::format("{:%Y/%m/%d %H:%M:%S %Z%z}", ltf) << std::endl;
  }
}
```
* chrono::system_clock[link system_clock.md]
* now()[link system_clock/now.md]
* chrono::floor[link /reference/chrono/time_point/floor.md]
* chrono::sys_seconds[link /reference/chrono/sys_time.md]
* std::format[link format.md]
* chrono::zoned_time[link zoned_time.md]
* zt.get_local_time()[link zoned_time/get_local_time.md]
* zt.get_info()[link zoned_time/get_info.md]
* chrono::sys_info[link sys_info.md]
* chrono::local_time_format[link local_time_format.md]

### 出力例
```
2019/12/20 19:05:05 JST
2019/12/20 19:05:05 JST
2019/12/20 19:05:05 JST+0900
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]

