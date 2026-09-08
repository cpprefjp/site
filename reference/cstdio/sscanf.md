# sscanf
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int sscanf(const char* buffer, const char* format, ...);
}
```

## 概要
書式を指定して文字列領域から入力する。

`buffer`が指すヌル終端文字列を入力元として、[`fscanf()`](fscanf.md)と同じ規則で解析を行う。


## 戻り値
代入に成功した項目の数を返す。最初の変換が行われる前に入力が終端に達した場合は[`EOF`](eof.md)を返す。


## 備考
- `%s`や`%[`による文字列の読み込みでは、書き込み先の大きさが考慮されない。書式指定に最大フィールド幅（`%31s`など）を指定しない場合、バッファオーバーランを起こしうる
- 数値の解析には、[`std::from_chars()`](/reference/charconv/from_chars.md)（C++17）や[`std::stoi()`](/reference/string/stoi.md)（C++11）などの、より安全な代替手段がある


## 例
```cpp example
#include <cstdio>

int main()
{
  const char* input = "2026-09-08";

  int year = 0;
  int month = 0;
  int day = 0;
  int count = std::sscanf(input, "%d-%d-%d", &year, &month, &day);

  std::printf("%d: %d/%d/%d\n", count, year, month, day);
}
```
* std::sscanf[color ff0000]
* std::printf[link printf.md]

### 出力
```
3: 2026/9/8
```


## 関連項目
- [`scanf`](scanf.md)
- [`fscanf`](fscanf.md)
- [`vsscanf`](vsscanf.md)
- [`std::from_chars()`](/reference/charconv/from_chars.md)
