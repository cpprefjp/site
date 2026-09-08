# WCHAR_MIN
* cwchar[meta header]
* macro[meta id-type]

```cpp
#define WCHAR_MIN unspecified
```
* unspecified[italic]

## 概要
`wchar_t`型で表現できる最小値を表す定数。

値は処理系定義である。`wchar_t`が符号なし型である処理系では`0`となる。[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<wchar_t>::`[`min()`](/reference/limits/numeric_limits/min.md)と同じ値である。


## 例
```cpp example
#include <cwchar>
#include <limits>
#include <iostream>

int main()
{
  std::wcout << (WCHAR_MIN == std::numeric_limits<wchar_t>::min()) << std::endl;
}
```
* WCHAR_MIN[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wint_t`](wint_t.md)
- [`fgetwc`](fgetwc.md)
