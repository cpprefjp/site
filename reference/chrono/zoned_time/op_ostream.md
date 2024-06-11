# operator<<
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits, class Duration, class TimeZonePtr>
  basic_ostream<charT, traits>&
    operator<<(basic_ostream<charT, traits>& os,
               const zoned_time<Duration, TimeZonePtr>& t); // (1) C++20
}
```

## 概要
`zoned_time`オブジェクトを出力ストリームに出力する。

この演算子は、`zoned_time`クラスのコンストラクタで設定されたシステム時間もしくはローカル時間を、タイムゾーンを考慮した時間に変換して日時を出力する。


## 効果
`t.`[`get_local_time()`](get_local_time.md)で得られた、タイムゾーンを考慮したローカル時間を、`"%F %T %Z"`フォーマットで`os`に出力する。

- `"%F"`は`"%Y-%m-%d"` (4桁ゼロ埋めの年-2桁ゼロ埋めの月-2桁ゼロ埋めの日) と等価
- `"%T"`は`"%H:%M:%S"` (2桁ゼロ埋めの時:2桁ゼロ埋めの分:2桁ゼロ埋めの秒と小数点以下の時間) と等価
- `"%Z"`はタイムゾーンの略称 (日本は`"JST"`、UTCは`"UTC"`)


## 戻り値
```cpp
return os;
```



## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  auto now = chrono::system_clock::now();

  // タイムゾーンなしで日時を出力する
  // (ローカルタイムゾーンへの変換はしてくれないので、デフォルトではUTCタイムゾーンで出力される)
  std::cout << now << std::endl;

  // タイムゾーン付きで日時を出力する
  std::cout << chrono::zoned_time{now} << std::endl;               // デフォルトタイムゾーン (UTC)
  std::cout << chrono::zoned_time{"Asia/Tokyo", now} << std::endl; // 日本 (UTC + 9時間)
  std::cout << chrono::zoned_time{"UTC", now} << std::endl;        // UTC
}
```
* chrono::system_clock[link ../system_clock.md]
* now()[link ../system_clock/now.md]

### 出力
```
2019-12-20 10:05:05
2019-12-20 10:05:05.330140 UTC
2019-12-20 19:05:05.330140 JST
2019-12-20 10:05:05.330140 UTC
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
