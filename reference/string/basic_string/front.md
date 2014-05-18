#front (C++11)
```cpp
const charT& front() const;
charT& front();
```

##概要
先頭要素への参照を返す。


##要件
`!`[`empty()`](./empty.md)


##戻り値
`operator[](0)` の結果を返す。


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello";
  
  char& c = s.front();
  std::cout << c << std::endl;
}
```

###出力
```
h
```

##参照
