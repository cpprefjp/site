#clear
* map[meta header]

```cpp
void clear() noexcept;
```

##概要
`multimap` コンテナ内の全ての要素を削除する。それぞれのデストラクタが呼ばれ、コンテナから削除される。[`size()`](/reference/map/multimap/size.md) は 0 になる。


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <map>

int main()
{
  std::multimap<int, char> c;
  c.insert( std::make_pair(3,'C'));
  c.insert( std::make_pair(4,'D'));
  c.insert( std::make_pair(1,'A'));
  c.insert( std::make_pair(2,'B'));

  std::cout << c.size() << std::endl;

  c.clear();

  std::cout << c.size() << std::endl;

  return 0;
}
```

###出力
```
4
0
```

##バージョン
###言語
- C++03

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??, 11.0

##参照

| 名前 | 説明 |
|-------------------------------------------------------------------------------------|-----------------------------------------------------|
| [`multimap::erase`](/reference/map/multimap/erase.md) | 要素を削除する |
| [`multimap::size`](/reference/map/multimap/size.md) | 要素数を取得する |
| [`multimap::empty`](/reference/map/multimap/empty.md) | コンテナが空であるかどうかを調べる |



