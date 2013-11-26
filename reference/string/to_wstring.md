#to_wstring(C++11)
```cpp
namespace std {
  string to_wstring(int val);
  string to_wstring(unsigned int val);
  string to_wstring(long val);
  string to_wstring(unsigned long val);
  string to_wstring(long long val);
  string to_wstring(unsigned long long val);
  string to_wstring(float val);
  string to_wstring(double val);
  string to_wstring(long double val);
}
```

##概要
数値`val`を`wstring`型文字列に変換する。


##戻り値
各数値型に対して、`swprintf(buf, buffsize, fmt, val)`によって生成された文字列の`wstring`オブジェクトを返す。使用されるバッファサイズは未規定。

各型で使用されるフォーマットは以下のようになる：

| 型                   | フォーマット  |
|----------------------|---------------|
| `int`                | `L"%d"`       |
| `unsigned int`       | `L"%u"`       |
| `long`               | `L"%ld"`      |
| `unsigned long`      | `L"%lu"`      |
| `long long`          | `L"%lld"`     |
| `unsigned long long` | `L"%llu"`     |
| `float`              | `L"%f"`       |
| `double`             | `L"%f"`       |
| `long double`        | `L"%Lf"`      |


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::wstring s1 = std::to_wstring(123);
  std::wcout << s1 << std::endl;

  std::wstring s2 = std::to_wstring(3.14);
  std::wcout << s2 << std::endl;
}
```

###出力
```
123
3.140000
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation#clang.md): 3.0
- [GCC, C++11 mode](/implementation#gcc.md): 4.5.4
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?

##参照

| 名前                          | 参照                     |
|-------------------------------|--------------------------|
| [`to_string`](./to_string.md) | 数値を`string`に変換する |

