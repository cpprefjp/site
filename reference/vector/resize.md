#resize
```cpp
// C++03まで
void resize(size_type sz, T c = T());

// C++11から
void resize(size_type sz);
void resize(size_type sz, const T& c);
```

##要件
要素数を変更する


##要件
1引数の形式の場合、`T`は`*this`に対してCopyInsertableでなければならない。2引数の形式の場合、例外発生時に非CopyInsertableな`T`のムーブコンストラクターによる場合を除いて、副作用を持ってはいけない。


##効果
- 1引数の形式の場合：

もし、`sz < `[`size()`](./size.md) ならば、[`erase`](./erase.md)`(`[`begin()`](./begin.md)` + sz, `[`end()`](./end.md)`);` と同じである。もし、[`size()`](./size.md)` < sz` ならば、`sz - `[`size()`](./size.md) 個の初期化済みの要素がシーケンスに追加される。


- 2引数の形式の場合：

以下の擬似コードと同じ動作をする。
```cpp
if (sz > size())
  insert(end(), sz-size(), c);
else if (sz < size())
  erase(begin()+sz, end());
else
  ; // do nothing
```

##戻り値
なし


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  // 増加
  {
    std::vector<int> v = {3, 1, 4};
    v.resize(5);

    std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << std::endl; });
  }
  std::cout << std::endl;

  // 減少
  {
    std::vector<int> v = {3, 1, 4};
    v.resize(1);

    std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << std::endl; });
  }
}
```
* resize[color ff0000]

###出力
```
3
1
4
0
0

3
```

