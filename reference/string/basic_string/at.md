#at
```cpp
const_reference at(size_type pos) const;
reference at(size_type pos);
```

##概要
`pos` 番目の文字への参照を取得する。


##要件
`pos < `[`size()`](./size.md)


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

