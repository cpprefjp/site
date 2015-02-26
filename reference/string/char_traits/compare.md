#compare
* string[meta header]

```cpp
static int compare(const char_type* s1, const char_type* s2, size_t n);
```

##概要
2つの文字列を比較する。


##戻り値
- 範囲`[0, n)`の各値`i`全てに対して[`eq`](./eq.md)`(s1[i], s2[i]) == true`ならば`0`を返す。
- 範囲`[0, n)`のいずれかの`i`に対して[`lt`](./lt.md)`(s1[i], s2[i]) == true`ならば負の値を返す。
- それ以外の場合は、正の値を返す。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::cout << std::char_traits<char>::compare("abc", "abc", 3) << std::endl;
  std::cout << std::char_traits<char>::compare("aac", "abc", 3) << std::endl;
  std::cout << std::char_traits<char>::compare("abc", "aac", 3) << std::endl;
}
```

###出力例
```
0
-1
1
```

##参照

