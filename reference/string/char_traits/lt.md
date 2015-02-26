#lt
* string[meta header]
* std[meta namespace]

```cpp
// C++03まで
static bool lt(const char_type& c1, const char_type& c2);

// C++11以降
static constexpr bool lt(char_type c1, char_type c2) noexcept;
```

##概要
2つの文字を比較し、左辺が右辺より小さいかを判定する。


##戻り値
標準で定義される`char_traits`の特殊化では、`c1 < c2`の結果を返す。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  if (std::char_traits<char>::lt('a', 'b')) {
    std::cout << "less" << std::endl;
  }
  else {
    std::cout << "not less" << std::endl;
  }
}
```

###出力
```
less
```

##参照

