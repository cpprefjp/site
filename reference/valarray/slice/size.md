#size
```cpp
size_t size() const;
```

##概要
スライスを生成する要素数を取得する。

##戻り値
スライスを生成する要素数。


##例
```cpp
#include <valarray>
#include <iostream>

auto main()
  -> int
{
  constexpr auto start  = 3;
  constexpr auto length = 5;
  constexpr auto stride = 7;
  
  std::slice s( start, length, stride );
  
  std::cout << s.length();
}
```

###出力
```
5
```
