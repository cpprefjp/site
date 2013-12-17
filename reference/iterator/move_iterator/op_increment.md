#operator++(C++11)
```cpp
move_iterator& operator++();
move_iterator operator++(int);
```

##概要
イテレータをインクリメントする。


##効果
- 前置インクリメント `operator++()`：

```cpp
++base();
return *this;
```
* base[link ./base.md]

- 後置インクリメント `operator++(int)`：

```cpp
move_iterator tmp = *this;
++base();
return tmp;
```
* base[link ./base.md]


##例
```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <iterator>

int main()
{
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; ++i)
    v.emplace_back(new int(i));

  auto it = std::make_move_iterator(v.begin());
  ++it; // ひとつ進める
  std::unique_ptr<int> p = *it;

  std::cout << *p << std::endl;
}
```

###出力
```
1
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


