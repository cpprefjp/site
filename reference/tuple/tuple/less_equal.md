#operator<=
```cpp
namespace std {
  template<class... TTypes, class... UTypes>
  bool operator<=(const tuple<TTypes...>&, const tuple<UTypes...>&);
}
```

##概要

<b>2つのtupleにおいて、左辺が右辺以下かの判定を行う。</b>


##要件

2つの`tuple`の要素数が同じであること。



##戻り値

`!(u < t)`

##例

```cpp
#include <iostream>
#include <tuple>
#include <string>

int main()
{
  std::tuple<int, char, std::string> t1(1, 'a', "hello");
  std::tuple<int, char, std::string> t2(2, 'b', "world");
  std::tuple<int, char, std::string> t3(2, 'b', "world");

  std::cout << std::boolalpha;
  {
    bool result = t1 <= t2;
    std::cout << result << std::endl;
  }
  {
    bool result = t2 <= t1;
    std::cout << result << std::endl;
  }
  {
    bool result = t2 <= t3;
    std::cout << result << std::endl;
  }
}
```
* <=[color ff0000]
* <=[color ff0000]
* <=[color ff0000]

###出力

```cpp
true
false
true
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```
- [operator<](/reference/tuple/tuple/less.md)

