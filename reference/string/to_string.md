#to_string(C++11)
```cpp
namespace std {
  string to_string(int val);
  string to_string(unsigned int val);
  string to_string(long val);
  string to_string(unsigned long val);
  string to_string(long long val);
  string to_string(unsigned long long val);
  string to_string(float val);
  string to_string(double val);
  string to_string(long double val);
}
```

##概要
数値`val`を`string`型文字列に変換する。


##戻り値
各数値型に対して、`sprintf(buf, fmt, val)`によって生成された文字列の`string`オブジェクトを返す。使用されるバッファサイズは未規定。

各型で使用されるフォーマットは以下のようになる：

| 型                   | フォーマット |
|----------------------|--------------|
| `int`                | `"%d"`       |
| `unsigned int`       | `"%u"`       |
| `long`               | `"%ld"`      |
| `unsigned long`      | `"%lu"`      |
| `long long`          | `"%lld"`     |
| `unsigned long long` | `"%llu"`     |
| `float`              | `"%f"`       |
| `double`             | `"%f"`       |
| `long double`        | `"%Lf"`      |


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string s1 = std::to_string(123);
  std::cout << s1 << std::endl;

  std::string s2 = std::to_string(3.14);
  std::cout << s2 << std::endl;
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

| 名前                            | 参照                      |
|---------------------------------|---------------------------|
| [`to_wstring`](./to_wstring.md) | 数値を`wstring`に変換する |

