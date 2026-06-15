# timegm
* ctime[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  time_t timegm(tm* timeptr);
}
```
* time_t[link time_t.md]
* tm[link tm.md.nolink]

## 概要
UTCで表現されたカレンダー時間 (`tm`構造体) を、経過秒 ([`time_t`](time_t.md)) に変換する。

[`mktime`](mktime.md.nolink)がローカル時間を解釈するのに対し、この関数は入力をUTCとして解釈する。

C23で`<time.h>`に追加された関数であり、C++26で`<ctime>`に取り込まれた。


## 効果
`timeptr`が指す構造体のカレンダー時間 (UTCとして表現される) を、`time`関数が返す値と同じエンコーディングの経過秒に変換する。

`tm_wday`と`tm_yday`の元の値は無視され、それ以外のメンバは規定の範囲に制限されない。変換に成功した場合、`tm_wday`と`tm_yday`は適切に設定され、その他のメンバは規定の範囲に正規化される。


## 戻り値
指定されたカレンダー時間を[`time_t`](time_t.md)型の値として返す。

カレンダー時間が[`time_t`](time_t.md)で表現できない場合、もしくは`tm_year`が`int`で表現できない場合、`(time_t)(-1)`を返す。


## 例
```cpp example
#include <ctime>
#include <print>

int main()
{
  std::tm t{};
  t.tm_year = 2026 - 1900; // 2026年
  t.tm_mon = 0;            // 1月
  t.tm_mday = 1;           // 1日

  std::time_t sec = std::timegm(&t);
  std::println("{}", sec);
}
```
* std::timegm[color ff0000]

### 出力
```
1767225600
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`mktime`](mktime.md.nolink): ローカル時間のカレンダー時間から経過秒を生成する
- [`gmtime`](gmtime.md.nolink): 経過秒からUTCのカレンダー時間を生成する


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、この関数が`<ctime>`に追加された
