# strftime
* ctime[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  size_t strftime(char* s, size_t maxsize,
                  const char* format, const tm* timeptr);
}
```
* size_t[link /reference/cstddef/size_t.md]
* tm[link tm.md]

## 概要
カレンダー時間 (`tm`構造体) を、指定したフォーマットに従って文字列化する。

書式は現在のロケール ([`<locale>`](/reference/locale.md)) に影響される。


## 効果
`timeptr`が指すカレンダー時間を、`format`で指定された変換指定に従って文字列に変換し、`s`が指す配列に格納する。終端のヌル文字を含めて、最大で`maxsize`バイトを書き込む。

`format`には、以下のような変換指定を含めることができる (一部を抜粋)：

| 変換指定 | 意味 |
|----------|------|
| `%Y` | 年 (西暦) |
| `%m` | 月 (`01`〜`12`) |
| `%d` | 日 (`01`〜`31`) |
| `%H` | 時 (24時間表記、`00`〜`23`) |
| `%M` | 分 (`00`〜`59`) |
| `%S` | 秒 (`00`〜`60`) |
| `%a` | 曜日の短縮名 (ロケール依存) |
| `%A` | 曜日の完全名 (ロケール依存) |
| `%%` | 文字`%` |


## 戻り値
終端のヌル文字を含まない、`s`に書き込んだ文字数を返す。

生成される文字列 (終端のヌル文字を含む) が`maxsize`バイトを超える場合、`0`を返し、`s`の内容は不定となる。


## 例
```cpp example
#include <ctime>
#include <iostream>

int main()
{
  // 2026年1月1日 12:00:00
  std::tm t{};
  t.tm_year = 2026 - 1900;
  t.tm_mon = 0;
  t.tm_mday = 1;
  t.tm_hour = 12;
  t.tm_min = 0;
  t.tm_sec = 0;

  char buf[64];
  std::strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", &t);
  std::cout << buf << std::endl;
}
```
* std::strftime[color ff0000]
* std::tm[link tm.md]

### 出力
```
2026-01-01 12:00:00
```


## バージョン
### 言語
- C++03


## 関連項目
- [`tm`](tm.md)
- [`asctime`](asctime.md): カレンダー時間を固定書式で文字列化する
- [`<chrono>`](/reference/chrono.md)
