#back (C++11)
* string[meta header]
* std[meta namespace]

```cpp
const charT& back() const;
charT& back();
```

##概要
末尾要素への参照を取得する。


##要件
`!`[`empty()`](./empty.md)


##戻り値
[`operator[]`](./op_at.md)`(`[`size()`](./size.md)` - 1)` の結果を返す。


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello";
  
  char& c = s.back();
  std::cout << c << std::endl;
}
```

###出力
```
o
```

##参照

