# localtime_r
* ctime[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  tm* localtime_r(const time_t* timer, tm* buf);
}
```
* time_t[link time_t.md]
* tm[link tm.md.nolink]

## 概要
経過秒 ([`time_t`](time_t.md)) を、ローカル時間で表現されたカレンダー時間 (`tm`構造体) に変換する。

[`localtime`](localtime.md.nolink)と異なり、結果を利用者が用意したバッファ`buf`に格納するため、スレッドセーフである。

C23で`<time.h>`に追加された関数であり、C++26で`<ctime>`に取り込まれた。


## 効果
`timer`が指すカレンダー時間を、ローカル時間で表現された要素別の時間に変換し、`buf`が指す構造体に格納する。


## 戻り値
変換した要素別の時間 (`buf`) を指すポインタを返す。

指定された時間をローカル時間に変換できない場合、ヌルポインタを返す。


## 例
```cpp example
#include <ctime>
#include <print>

int main()
{
  std::time_t t = std::time(nullptr);

  std::tm result;
  if (std::localtime_r(&t, &result) != nullptr) {
    std::println("{}", result.tm_year + 1900);
  }
}
```
* std::localtime_r[color ff0000]

### 出力例
```
2026
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`localtime`](localtime.md.nolink): 経過秒からローカル時間のカレンダー時間を生成する
- [`gmtime_r`](gmtime_r.md): 経過秒からUTCのカレンダー時間を生成する (バッファ指定)


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.html)
    - C++26がC23を参照するようになり、この関数が`<ctime>`に追加された
