#clear
* map[meta header]
* std[meta namespace]
* map[meta class]

```cpp
void clear() noexcept;
```

##概要
`map` コンテナ内の全ての要素を削除する。それぞれのデストラクタが呼ばれ、コンテナから削除される。[`size()`](/reference/map/map/size.md) は 0 になる。


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <map>

int main() 
{
  std::map<int, char> c;
  c[3] = 'C';
  c[4] = 'D';
  c[1] = 'A';
  c[2] = 'B';

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
| [`map::erase`](/reference/map/map/erase.md) | 要素を削除する |
| [`map::size`](/reference/map/map/size.md) | 要素数を取得する |
| [`map::empty`](/reference/map/map/empty.md) | コンテナが空であるかどうかを調べる |



