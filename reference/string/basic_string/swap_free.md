#swap (非メンバ関数)
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits, class Allocator>
  void swap(basic_string<CharT, Traits, Allocator>& x,
            basic_string<CharT, Traits, Allocator>& y);
}
```

##概要
2つの`basic_string`オブジェクトを入れ替える


##効果
`x.`[`swap`](./swap.md)`(y)`


##戻り値
なし


##例
```cpp
#include <iostream>
#include <string>

int main()
{
  std::string a = "hello";
  std::string b = "world";

  std::swap(a, b);

  std::cout << a << std::endl;
  std::cout << b << std::endl;
}
```
* swap[color ff0000]

###出力
```
world
hello
```

##参照


