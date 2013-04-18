#operator<
```cpp
namespace std {

  template <class T1, class T2>
  bool operator<(const pair<T1, T2>& x, const pair<T1, T2>& y);

}
```

##概要

<b>2つのpairについて、左辺が右辺より小さいかの判定を行う</b>


##戻り値

`x.first < y.first || (!(y.first < x.first) && x.second < y.second)`

##例

```cpp
#include <iostream>
#include <utility>
#include <string>

int main()
{
  std::pair<int, std::string> p1(1, "aaa");
  std::pair<int, std::string> p2(2, "bbb");

  std::cout << std::boolalpha;
  std::cout << (p1 < p2) << std::endl;
  std::cout << (p2 < p1) << std::endl;
}
```
* <[color ff0000]
* <[color ff0000]

###出力

```cpp
true
false
```

##バージョン


###言語


- 



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```