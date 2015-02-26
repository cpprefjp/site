#length
* string[meta header]
* std[meta namespace]

```cpp
static size_t length(const char_type* s);
```
* size_t[link /reference/cstddef/size_t.md]

##概要
文字列の長さを取得する。


##戻り値
範囲`[0, ?)`の各`i`に対し、[`eq`](./eq.md)`(s[i], charT())`が最初に`true`を返した`i`を返す。


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::size_t n = std::char_traits<char>::length("abc");
  std::cout << n << std::endl;
}
```

###出力
```
3
```

##参照

