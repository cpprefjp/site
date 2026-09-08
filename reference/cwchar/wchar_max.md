# WCHAR_MAX
* cwchar[meta header]
* macro[meta id-type]

```cpp
#define WCHAR_MAX unspecified
```
* unspecified[italic]

## 概要
`wchar_t`型で表現できる最大値を表す定数。

値は処理系定義であり、`wchar_t`の符号やビット幅によって異なる。[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<wchar_t>::`[`max()`](/reference/limits/numeric_limits/max.md)と同じ値である。


## 例
```cpp example
#include <cwchar>
#include <limits>
#include <iostream>

int main()
{
  std::wcout << (WCHAR_MAX == std::numeric_limits<wchar_t>::max()) << std::endl;
}
```
* WCHAR_MAX[color ff0000]
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
