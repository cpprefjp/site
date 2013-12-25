#assign
```cpp
// C++03まで
static void assign(char_type& c1, const char_type& c2);

// C++11以降
static void assign(char_type& c1, const char_type& c2) noexcept;
```

##概要
左辺に右辺を代入する。


##効果
標準で定義される`char_traits`の特殊化では、`c1 = c2`により代入を行う。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  char c = 'a';
  std::char_traits<char>::assign(c, 'b');

  std::cout << c << std::endl;
}
```

###出力
```
b
```

##参照

