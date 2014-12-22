#rend
```cpp
reverse_iterator rend() noexcept;
const_reverse_iterator rend() const noexcept;
```

##概要
先頭の前を指す逆イテレータを取得する。


##戻り値
`reverse_iterator(`[`begin()`](./begin.md)`)`


##例外
投げない


##例
```cpp
#include <iostream>
#include <string>
#include <algorithm>

int main()
{
  std::string s = "hello";

  // 文字列オブジェクトsに含まれる、全ての要素を逆順に出力
  std::for_each(s.rbegin(), s.rend(), [](char c) {
    std::cout << c << std::endl;
  });
}
```

###出力
```
o
l
l
e
h
```

##参照
