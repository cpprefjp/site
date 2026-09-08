# wcsftime
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  size_t wcsftime(wchar_t* s, size_t maxsize, const wchar_t* format, const tm* timeptr);
}
```
* size_t[link /reference/cstddef/size_t.md]
* tm[link /reference/ctime/tm.md]

## 概要
日時を書式化して、ワイド文字列へ出力する。


## 戻り値
書き込んだ文字数（終端のヌル文字を含まない）を返す。結果が`maxsize`文字に収まらなかった場合は`0`を返し、`s`の内容は不定である。


## 備考
- 書式指定の規則は[`std::strftime()`](/reference/ctime/strftime.md)と同じである
- C++20以降では、型安全な[`std::format()`](/reference/format/format.md)と[`<chrono>`](/reference/chrono.md)の書式指定も使用できる


## 例
```cpp example
#include <cwchar>
#include <ctime>
#include <iostream>

int main()
{
  std::tm tm{};
  tm.tm_year = 126; // 2026年
  tm.tm_mon = 8;    // 9月
  tm.tm_mday = 8;

  wchar_t buffer[32];
  std::wcsftime(buffer, 32, L"%Y-%m-%d", &tm);

  std::wcout << buffer << std::endl;
}
```
* std::wcsftime[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
2026-09-08
```


## バージョン
### 言語
- C++98


## 関連項目
- [`std::strftime()`](/reference/ctime/strftime.md): マルチバイト文字列版
- [`std::format()`](/reference/format/format.md)
