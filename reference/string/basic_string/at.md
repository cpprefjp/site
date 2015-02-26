#at
* string[meta header]
* std[meta namespace]
* basic_string[meta class]

```cpp
const_reference at(size_type pos) const;
reference at(size_type pos);
```

##概要
`pos` 番目の要素への参照を取得する。


##戻り値
[`operator[]`](./op_at.md)`(pos)` の結果。


##例外
`pos >= `[`size()`](./size.md) の時、[`out_of_range`](/reference/stdexcept.md) 例外を投げる。


##例
```cpp
#include <iostream>
#include <string>
#include <stdexcept>

int main()
{
  std::string s = "hello";

  char& c = s.at(1);
  std::cout << c << std::endl;

  try {
    s.at(5);
  }
  catch (std::out_of_range&) {
    std::cout << "access error" << std::endl;
  }
}
```

###出力
```
e
access error
```

##参照
- [LWG Issue 2207. `basic_string::at` should not have a Requires clause](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2207)
    - C++11まで、この関数を呼び出す要件として「`pos < size()`」があったが、例外節があるため要件節は不要。C++14で要件節が削除された。

