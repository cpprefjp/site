#rbegin
* string[meta header]

```cpp
reverse_iterator rbegin() noexcept;
const_reverse_iterator rbegin() const noexcept;
```

##概要
末尾を指す逆イテレータを取得する


##戻り値
`reverse_iterator(`[`end()`](./end.md)`)`


##例外
投げない


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello";

  // 末尾への逆イテレータを取得
  decltype(s)::reverse_iterator it = s.rbegin();

  // イテレータが指している要素を参照
  char& c = *it;
  std::cout << c << std::endl;
}
```

###出力
```
o
```

##参照
