#length
* string[meta header]

```cpp
size_type length() const noexcept;
```

##概要
文字列の長さを取得する。


##戻り値
現在格納されている文字列の要素数。

※文字数ではないことに注意


##例外
投げない


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string s = "hello";

  std::size_t n = s.length();
  std::cout << n << std::endl;
}
```

###出力
```
5
```

##参照
